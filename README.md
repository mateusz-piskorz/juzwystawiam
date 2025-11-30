https://juzwystawiam.pl/

# running docker build on localhost

1. change .env variables:

- DB_HOST=db
- ASSET_URL=http://localhost
- APP_URL=http://localhost

2. make sure ports are not commented-out in docker-compose.yml

- ports: - 9000:9000
- ports: - 80:80 - 443:443
- ports: - 5432:5432
- ports: - 6379:6379

3. build docker-compose.yml

- docker-compose --file docker-compose.yml up -d

4. go to localhost without any port

- http://localhost/

# stripe events locally

stripe listen --forward-to http://127.0.0.1:8000/stripe/webhook

# remove volumne on coolify

coolify doesn't remove volumnes after removing presistant storage, so you need to remove it yourself if needed.

- Go to terminal
- select correct container to run command on
- rm -rf {path to volumne e.g./bitnami/postgresql}
