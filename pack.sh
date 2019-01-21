#!/bin/bash

ng build ngx-guardian

echo "Building Schematics..."

cd projects/ngx-guardian

tsc -p tsconfig.schematics.json

cp collection.json ../../dist/ngx-guardian

echo "Packaged successfully"
