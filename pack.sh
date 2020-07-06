#!/bin/bash

# "Build library..."

ng build ngx-guardian --prod

echo "Building Schematics..."

cd projects/ngx-guardian

tsc -p tsconfig.schematics.json

cp schematics/collection.json ../../dist/ngx-guardian/schematics

cp -r schematics/ng-add/files ../../dist/ngx-guardian/schematics/ng-add

cp ../../ngx-guardian-logo.svg ../../dist/ngx-guardian

cp ../../README.md ../../dist/ngx-guardian

cd ../../dist/ngx-guardian

echo "Packaged successfully"
