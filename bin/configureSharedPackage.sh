#!/bin/bash

FILE_PATH="$(pwd)/shared/package.json"

if [ "$NODE_ENV" = "production" ]; then
sed -i 's/.*"main":.*/  "main": "dist\/index.js",/' ${FILE_PATH}
else
sed -i 's/.*"main":.*/  "main": "index.ts",/' ${FILE_PATH}
fi