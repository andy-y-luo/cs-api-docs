#!/bin/bash

bundle exec middleman build --clean
aws s3 sync "./build" s3://api-docs.crowdshout.tech --delete --profile crowdshout
