#!/bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
$SCRIPTPATH/bundle_standalone.sh
aws s3 sync "$SCRIPTPATH/../public" s3://api-docs-wip.crowdshout.tech \
    --delete --profile $1