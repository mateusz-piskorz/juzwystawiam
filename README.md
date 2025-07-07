# running docker build on localhost

1. change .env variables:

- DB_HOST=db
- REDIS_HOST=redis

2. make sure ports are not commented-out in docker-compose.yml

- ports: - 9000:9000
- ports: - 80:80 - 443:443
- ports: - 5432:5432
- ports: - 6379:6379

3. build docker-compose.yml

- docker-compose --file docker-compose.yml up-d

4. go to localhost without any port

- http://localhost/
