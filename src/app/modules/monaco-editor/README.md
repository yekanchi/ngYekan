### How to Load Monaco Editor

### using it with angular build tools:

- first install monaco-editor `npm install --save-dev  monaco-editor@0.47.0`
- then add this to your `angular.json` file `assets` option:

``` json
    {
        "glob": "**/*",
        "input": "node_modules/monaco-editor/min",
        "output": "./assets/monaco/min"
    }
```

### using it with angular build tools:

- use: `baseUrl: 'http://www.unpkg.com/monaco-editor@0.47.0'` for `NgxMonacoEditorConfig` at module