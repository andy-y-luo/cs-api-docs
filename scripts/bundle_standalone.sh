#!/bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# Gather the options
OPTIONS=$(<$SCRIPTPATH/redoc_options.sh)

# Resolve the json refs
json-refs resolve \
    --filter relative \
    --force \
    $SCRIPTPATH/../src/index.yaml > $SCRIPTPATH/../public/documentation.yaml

# Build the command string for bundling the static file
command_string="redoc-cli bundle $OPTIONS \
    -t $SCRIPTPATH/../template.hbs \
    -o $SCRIPTPATH/../public/index.html \
    $SCRIPTPATH/../public/documentation.yaml \
    --title 'CrowdShout API Docs'"

eval $command_string