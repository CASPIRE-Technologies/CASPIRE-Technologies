#!/bin/sh
set -e

echo "Starting app"
exec node --experimental-specifier-resolution=node dist/main.js
