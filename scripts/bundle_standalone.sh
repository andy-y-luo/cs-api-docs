#!/bin/bash
OPTIONS=$(<redoc_options.sh)
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
command_string="redoc-cli bundle $OPTIONS $SCRIPTPATH/../public/documentation.json -o $SCRIPTPATH/../public/index.html --title 'CrowdShout Api Documentation'"
eval $command_string