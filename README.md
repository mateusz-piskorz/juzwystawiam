https://www.juzwystawiam.pl/

# Usage

```shell
cp .env.example .env
php artisan key:generate
```

add MAIL_USERNAME, MAIL_PASSWORD

```shell
docker compose up -d
```

app is at http://localhost:8000/

# Tests

```shell
docker compose exec app php artisan test
```

# Api

api documentation is available at http://localhost:8000/docs/api#/

# stripe events locally

stripe listen --forward-to http://127.0.0.1:8000/stripe/webhook

# utils

```shell
php artisan ide-helper:generate
php artisan ide-helper:models --nowrite
```
