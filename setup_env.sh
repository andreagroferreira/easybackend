#!/bin/bash
echo DATABASE_TYPE=mysql >> .env.production
echo DATABASE_HOST=$DATABASE_HOST >> .env.production
echo DATABASE_PORT=$DATABASE_PORT >> .env.production
echo DATABASE_USERNAME=$DATABASE_USERNAME >> .env.production
echo DATABASE_PASSWORD=$DATABASE_PASSWORD >> .env.production
echo DATABASE_NAME=$DATABASE_NAME >> .env.production
echo JWT_SECRET=$JWT_SECRET >> .env.production
echo JWT_SECRET_KEY=$JWT_SECRET_KEY >> .env.production
echo JWT_EXPIRATION_TIME=$JWT_EXPIRATION_TIME >> .env.production
echo API_PORT=$API_PORT >> .env.production
echo AUTH0_DOMAIN=$AUTH0_DOMAIN >> .env.production
echo AUTH0_AUDIENCE=$AUTH0_AUDIENCE >> .env.production
echo EMAIL_PASS=$EMAIL_PASS >> .env.production
echo NEW_RELIC_APP_NAME=$NEW_RELIC_APP_NAME >> .env.production
echo NEW_RELIC_LICENSE_KEY=$NEW_RELIC_LICENSE_KEY >> .env.production
echo NEW_RELIC_LOG=stdout >> .env.production
echo BUGSNAG_KEY=$BUGSNAG_KEY >> .env.production
echo BUGSNAG_STAGE=$BUGSNAG_STAGE_STAGING >> .env.production
echo SWAGGER_API_NAME=$SWAGGER_API_NAME >> .env.production
echo SWAGGER_API_DESCRIPTION=$SWAGGER_API_DESCRIPTION >> .env.production

version=$(git describe --abbrev=0 --tags)
echo SWAGGER_API_CURRENT_VERSION="$version" >> .env.production
echo SWAGGER_API_ROOT=$SWAGGER_API_ROOT >> .env.production
