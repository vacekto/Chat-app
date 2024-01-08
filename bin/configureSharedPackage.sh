#!/bin/bash

FILE_PATH="$(pwd)/shared/package.json"

case "$NODE_ENV" in

  production )
    sed -i 's/.*"main":.*/  "main": "dist\/index.js",/' ${FILE_PATH}
    # sed -i 's/.*"exports":.*/  "exports": ".\/dist\/index.js",/' ${FILE_PATH}
    ;;

  development )
    sed -i 's/.*"main":.*/  "main": "index.ts",/' ${FILE_PATH}
    # sed -i 's/.*"exports":.*/  "exports": ".\/index.ts",/' ${FILE_PATH}
    ;;

  * )
    echo NODE_ENV value is incorrect
    # exit 1
    ;;
esac