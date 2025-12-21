# PHP / Composer builder (prepares PHP app)
FROM php:8.4-cli AS php-builder

WORKDIR /app

# Install system packages required at buildtime
RUN apt-get update && apt-get install -y unzip git libicu-dev \
    && docker-php-ext-install bcmath


COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install PHP deps (no dev)
COPY composer.json composer.lock /app/
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Copy the app (so artisan commands can run)
COPY . /app

RUN composer dump-autoload --optimize \
 && php artisan package:discover --ansi || true \
 && if [ ! -f .env ]; then \
      if [ -f .env.example ]; then cp .env.example .env; fi; \
    fi \
 && php artisan key:generate --force || true

# Node builder (builds Vite assets)
FROM node:24.8.0-slim AS node-builder

WORKDIR /app

# Copy only package files first for better cache
COPY package.json package-lock.json* ./ 

# Install dependencies (we need devDependencies for the build)
RUN npm ci --silent

COPY --from=php-builder /app /app

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    php-cli php-xml php-mbstring php-intl php-curl unzip git \
 && rm -rf /var/lib/apt/lists/*

# Ensure production env for Vite build if you want optimizations; do not prevent dev deps install above
ENV NODE_ENV=production

# Run the frontend build (expects a build script that runs vite build)
RUN npm run build

# Final runtime image
FROM dunglas/frankenphp:1-php8.4

WORKDIR /var/www/html

RUN cp $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/php.ini

RUN echo "upload_max_filesize=110M" > $PHP_INI_DIR/conf.d/custom.ini && \
    echo "post_max_size=110M" >> $PHP_INI_DIR/conf.d/custom.ini

# Install system packages required at runtime
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libssl-dev \
    curl \
    libpq-dev \
  && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install bcmath sockets pcntl pdo pdo_pgsql || true

# Composer binary and app files from php-builder
COPY --from=php-builder /usr/bin/composer /usr/bin/composer
COPY --from=php-builder /app /var/www/html

# Copy built frontend assets from node-builder into public/build
# This ensures manifest.json and built assets exist in final image
COPY --from=node-builder /app/public/build /var/www/html/public/build

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public/build || true

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["php", "artisan", "octane:start", "--server=frankenphp", "--host=0.0.0.0", "--port=8000"]