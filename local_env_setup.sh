#!/bin/bash

touch .env.development
echo DATABASE_TYPE=mysql >> .env.development
echo DATABASE_HOST="<ASK PO or DEV>" >> .env.development
echo DATABASE_PORT="<ASK PO or DEV>" >> .env.development
echo DATABASE_USERNAME="<YOUR DB USER>" >> .env.development
echo DATABASE_PASSWORD="<YOUR DB PASSWORD>" >> .env.development
echo DATABASE_NAME="<ASK PO or DEV>" >> .env.development
echo JWT_SECRET=dadasdadsadad >> .env.development
echo JWT_SECRET_KEY=dasdad123po1i32o1j2 >> .env.development
echo JWT_EXPIRATION_TIME=1000000 >> .env.development
echo API_PORT=3000 >> .env.development
echo AUTH0_DOMAIN="<ASK PO or DEV>" >> .env.development
echo AUTH0_AUDIENCE="<ASK PO or DEV>" >> .env.development
echo EMAIL_PASS="<ASK PO or DEV>" >> .env.development
echo BUGSNAG_KEY="<ASK PO or DEV>" >> .env.development
echo BUGSNAG_STAGE=development >> .env.development
echo SWAGGER_API_NAME="<ASK PO or DEV>" >> .env.development
echo SWAGGER_API_DESCRIPTION="<ASK PO or DEV>" >> .env.development
echo SWAGGER_API_CURRENT_VERSION=v1.0 >> .env.development
echo SWAGGER_API_ROOT=api/docs >> .env.development