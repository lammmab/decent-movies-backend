# CONTRIBUTERS

## Create a plugin
Step 1 - Create a folder somewhere\n
Step 2 - Create these files:
- manifest.json, filled with:
```json
{
  "name": "Plugin test 1", // plugin name
  "description": "A cool test plugin", // plugin description
  "version": "1.0.0", // version of plugin
  "entry": "main.js", // entry point of plugin
  "logo": "hi.png" // path to image
}
```
- main.js, filled with:
```js
let api = null;
export default {
  async onStart(API) {
    api = API;
  },
}
```
Step 3 - Write your plugin! Refer to