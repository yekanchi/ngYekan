### How to Load Monaco Editor

### using with angular build tools:

- add this to your `angular.json` file `assets` option:

```json'
    {
        "glob": "**/*",
        "input": "node_modules/monaco-editor/min",
        "output": "./assets/monaco/min"
    }
 ```