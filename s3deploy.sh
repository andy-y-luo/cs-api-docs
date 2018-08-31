#!/bin/bash

bundle exec middleman build --clean
staticrypt "./build/index.html" $CS_API_DOCS_PASSPHRASE -o "./build/index.html" -t "CrowdShout API Documentation" -i "Please enter the password" -f "./password_template.html"
aws s3 sync "./build" s3://api-docs.crowdshout.tech --delete --profile andy-admin-crowdshout
