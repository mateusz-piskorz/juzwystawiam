#!/bin/sh
set -e

cd /var/www/html

if [ ! -f .env ]; then
    touch .env
fi

if ! grep -q "APP_KEY=" .env; then
    echo "APP_KEY=" >> .env
fi

if ! grep -q "APP_KEY=base64" .env; then
    php artisan key:generate --force
fi

php artisan migrate --force

chown -R www-data:www-data storage bootstrap/cache || true

exec "$@"