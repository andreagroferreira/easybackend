#!/bin/bash

# Gets Name of Heroku App from user input
echo "Enter Heroku App STAGING Name: "
read -r heroku_app_staging

# Creates tmp file to hold the contents of the replace result
touch tmp.txt
awk -v a="$heroku_app_staging" '{gsub(/<HEROKU_APP_STAGING>/,a)}1' .gitlab-ci.yml > tmp.txt
mv tmp.txt .gitlab-ci.yml

echo "Enter Heroku App PROD Name: "
read -r heroku_app_prod

# Creates tmp file to hold the contents of the replace result
touch tmp.txt
awk -v a="$heroku_app_prod" '{gsub(/<HEROKU_APP_PROD>/,a)}1' .gitlab-ci.yml > tmp.txt
mv tmp.txt .gitlab-ci.yml

# Commits the changes automatically
git_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
git add .
git commit -m "Feat: Updated gitlab-ci file on initial setup"
git push origin "$git_branch"