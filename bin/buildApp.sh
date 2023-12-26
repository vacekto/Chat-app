#!/bin/bash

if [ "$NODE_ENV" = "production" ]
then
    npm run build --workspaces --if-present --verbose
fi