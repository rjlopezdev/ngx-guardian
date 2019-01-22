#!/bin/bash

echo "Building library..."

ng build ngx-guardian

echo "Building Schematics..."

cd projects/ngx-guardian

tsc -p tsconfig.schematics.json

cp collection.json ../../dist/ngx-guardian

cp -r schematics/ng-add/files ../../dist/ngx-guardian/schematics/ng-add

echo "Packaged successfully"
