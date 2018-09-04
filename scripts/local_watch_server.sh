#!/bin/bash
OPTIONS=$(<redoc_options.sh)
command_string="redoc-cli serve $OPTIONS -w ./../public/documentation.json"
eval $command_string