

This has utilities and is also a standalone typescript app.
Script RUNME.sh compiles typescript *.ts files into *.js files and runs them.
It uses the "tsc" typescript compiler to produce javascript. By default tsc looks at
tsconfig.json for what files to compile and where to put the javascript.
See RUNME.sh for comments.  


DEBUG IN VISUAL STUDIO: 
Requires 2 steps: start **Astro Transpile in watch mode**  
 then run   
 **ASTRO run transpiled javascript**   
 to see edit results.  
sample launch.json snippet to get visual studio code to debug this:
**NOTE: launch.json not in github repo, due to security concerns!**
```
  {
        // starts up tsc typescript compiler in watch mode to auto compile.
        // resulting javascript files to in folder specified by tsconfig.json
        // which also decides what *.ts files to compile into *.js
        "name": "Astro Transpile in watch mode",
        "type": "node",
        "request": "launch",
        "runtimeExecutable": "tsc",
        "cwd": "${workspaceFolder}\\src\\mwmFiles\\galactic", // run from this folder otherwise wont find ts file
        "args": ["--watch"] // '--verbose' may only be used with '--build'
      },
      {
        // this runs the compiled .js file created from tsc transpiler above
        "name": "ASTRO run transpiled javascript",
        "type": "node",
        "request": "launch",
        "skipFiles": [
          "<node_internals>/**"
        ],
        "cwd": "${workspaceFolder}\\src\\mwmFiles\\galactic", // run from this folder; all paths now relative to here
        // without cwd ->  "program": "${workspaceFolder}\\src\\mwmFiles\\galactic\\typescriptCompiled/runner.js",
        // folder "typescriptCompiled" was specified by tsconfig.json (above)
        "program": "typescriptCompiled/runner.js",
        },
    ```