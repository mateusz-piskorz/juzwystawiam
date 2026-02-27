FROM dunglas/frankenphp:1-php8.4

COPY --from=node:24.8.0-slim /usr/local /usr/local

RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    gnupg \
    && install-php-extensions pcntl pdo_pgsql gd intl zip bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

EXPOSE 8000
EXPOSE 5173