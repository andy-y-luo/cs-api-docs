#!/bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
OPTIONS=$(<$SCRIPTPATH/redoc_options.sh)
command_string="redoc-cli serve $OPTIONS \
    -t $SCRIPTPATH/../template.hbs \
    -w $SCRIPTPATH/../public/documentation.yaml \
    --title 'CrowdShout API Docs'"
eval $command_string