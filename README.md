live: [www.juzwystawiam.pl](https://www.juzwystawiam.pl/)

## Prerequisites

- Container runtime (Docker Desktop, Orbstack, Colima, etc.)
- Full Disk Access granted to your container runtime

## Getting Started

```shell
cp .env.example .env
```

(optional) update **MAIL_USERNAME** and **MAIL_PASSWORD** variables in your .env file

```shell
docker compose up -d
```

The application will be available at http://localhost:8000/

Api documentation is available at http://localhost:8000/docs/api#/

## Utilities

```shell
docker compose exec app php artisan test
```

```shell
docker compose exec app php artisan ide-helper:generate
docker compose exec app php artisan ide-helper:models --nowrite
docker compose exec app npm run zod:generate
docker compose exec app npm run ziggy
```

```shell
stripe listen --forward-to http://127.0.0.1:8000/stripe/webhook
```
