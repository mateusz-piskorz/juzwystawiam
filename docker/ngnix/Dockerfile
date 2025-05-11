FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./storage /usr/share/nginx/html/storage
# COPY ./public /usr/share/nginx/html/public


EXPOSE 80