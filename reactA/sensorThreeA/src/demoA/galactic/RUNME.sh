#!/bin/bash
REDBOLD=$(tput setaf 1; tput bold)
GREENBOLD=$(tput setaf 2; tput bold)
YELLOWBOLD=$(tput setaf 3; tput bold)
# npx tsc runner.ts
npx tsc # uses tsconfig.json for where to put *.js compiled files, and what *.ts file to compile.
# above command put compiled javascript into the typescriptCompiled folder, as specified in tsconfig.json
node typescriptCompiled/runner.js
echo to run without compile do: $YELLOWBOLD node typescriptCompiled/runner.js $(tput sgr0)