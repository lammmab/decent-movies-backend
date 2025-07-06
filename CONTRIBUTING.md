# CONTRIBUTERS

## Create a plugin
Step 1 - Create a folder somewhere
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

  async search(query) {
    return [
      new api.Title({
        name: `The Amazing World of Gumball`,
        imageUrl: `https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTrT7oXKTplqRxYMZqclB1V4N0xJVSEU7zqBRdiU_tfu1BRhUrmUrnTnuWf66YQ8t_eEnaM-g`,
        metadata: { 
          "Year": "2023",
          "Type": "TV Show",
          "Rating": "PG-13",
        }
      })
    ];
  },

}
```