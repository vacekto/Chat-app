#!/bin/bash

if [ "$NODE_ENV" = "production" ]
then
    echo building
    npm run build --workspaces --if-present --verbose
fi