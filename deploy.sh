#!/bin/bash

echo "Linting..."

npm run lint > /dev/null
if [[ ! $? -eq 0 ]]; then
  echo "\nLinting failed, please clean up your code..."
  exit
fi

echo "Testing..."
npm test
if [[ ! $? -eq 0 ]]; then
  echo "\nOne or more tests have failed. Deploy aborted..."
  exit
fi

echo "Building project..."
npm run build > /dev/null
if [[ ! $? -eq 0 ]]; then
  echo "\nEncountered a build error. Deploy aborted..."
  exit
fi

echo "Deploying project..."
aws s3 sync ./studymandar.in/dist s3://studymandar.in

echo "Invalidating the cloudfront instance..."
aws cloudfront create-invalidation \
    --distribution-id ECZDTVNGO7GS \
    --paths "/*" > /dev/null

echo "Project successfully deployed!"
