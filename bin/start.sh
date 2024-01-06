#!/bin/bash

case "$NODE_ENV" in

  production )
    npm run prod
    ;;

  development )
    npm run dev
    ;;

  * )
    echo NODE_ENV value is incorrect
    exit 1
    ;;
esac
