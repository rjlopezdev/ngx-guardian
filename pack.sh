#!/bin/bash

echo "Building library..."

ng build ngx-guardian

echo "Building Schematics..."

cd projects/ngx-guardian

tsc -p tsconfig.schematics.json

cp schematics/collection.json ../../dist/ngx-guardian/schematics

cp -r schematics/ng-add/files ../../dist/ngx-guardian/schematics/ng-add

cd ../../dist/ngx-guardian

echo "Packaged successfully"
