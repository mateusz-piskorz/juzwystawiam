#!/bin/sh
set -e

cd /var/www/html

php artisan migrate --force

chown -R www-data:www-data storage bootstrap/cache || true

exec "$@"