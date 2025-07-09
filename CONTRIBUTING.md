# CONTRIBUTERS

## Create a plugin
* Step 1 - Create a folder somewhere
* Step 2 - Create these files:
- manifest.json, filled with:
```json
{
  "name": "Plugin 1", // plugin name
  "description": "A cool plugin", // plugin description
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
* Step 3 - Write your plugin! Refer to the api [here](https://github.com/lammmab/decent-movies-backend/blob/main/utils/api.js)

## TODO:
* Hot reloading plugins
* Get subtitles hooked up for plugin development
* Hook all backend errors up to frontend if they should be
* Get plugins sending their configs (also add saving/loading configs easily for plugins to use)
* toProxyUrl(url)
* - Proxy raw .m3u8 URLs that are protected by CORS, tokens, headers, etc.
* - Returns a proxied URL from your server that clients can consume directly.
* toM3U8(url)
* - Converts raw video files (MP4, MKV, etc.) to .m3u8 (HLS) streamed from your server.
* - Returns the HLS playlist URL you host.
* extract(url)
* - For embed URLs, extract direct video URLs (.m3u8, MP4, etc.).
* - Pass extracted URLs to either toProxyUrl or toM3U8 depending on the format.
* -  qReturns a playable link (proxied or converted).

