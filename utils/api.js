import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import path from 'path';

/**
 * 
 * The plugin API
 * written by lammmab
 * these classes are what you must format your data to,
 * i provide some helpers like puppeteer and cheerio and httpgethtml.
 * 
 * the four important async commands for your plugin are:
 * - async onStart(API) -> save the API for use, and set/load config info.
 * - async search(query) -> get your titles, return back an array of titles.
 * - async getEpisode(title,season,episodeNumber) -> return back a specific Episode with stream links as a Servers of Server
 * - async getTitleInfo(title) -> compile title into either movies (leave of TitleDetails seasons as an empty array) or tv shows (provide Seasons with an array of VisualEpisode)
 * 
 * TBI:
 * - async getSubtitles(title)
 * 
 */

class Title {
  constructor({name,imageUrl,metadata}) {
    this.name = name
    this.imageUrl = imageUrl
    this.metadata = metadata
  }
}

class Season {
  constructor({number, episodeCount, episodes}) {
    this.number = number
    this.episodeCount = episodeCount
    this.episodes = episodes
  }
}

class VisualEpisode {
  constructor({ 
    number,
    name
  }) {
    this.number = number
    this.name = name
  }
}

class Episode {
  constructor({servers, name, episodeNum, seasonNum}) {
    this.servers = servers
    this.name = name
    this.episodeNum = episodeNum
    this.seasonNum = seasonNum
  }
}

class Server {
  constructor({ url, name, quality, language }) {
    this.url = url;
    this.name = name || "Server";
    this.quality = quality || "Unknown";
    this.language = language || "Unknown";
  }
}

class Servers {
  constructor(servers) {
    this.servers = servers;
  }
}

class TitleDetails {
  constructor({name, image, seasons, metadata, isMovie}) {
    this.isMovie = isMovie
    this.image = image
    this.seasons = seasons
    this.metadata = metadata
  }
}

async function httpGet(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  return await res.json();
}

async function httpGetHtml(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  return await res.text();
}

function cheerio_load(html) {
  return cheerio.load(html);
}

export async function disable() {
  const stack = new Error().stack;
  const lines = stack.split("\n");

  const callerLine = lines[2];

  const match = callerLine.match(/\((.*):\d+:\d+\)/) || callerLine.match(/at (.*):\d+:\d+/);
  if (!match) {
    console.error("Could not determine caller file in disable()");
    return;
  }

  const callerPath = match[1];
  const plugin = global.plugins.find(p => callerPath.startsWith(path.join(os.tmpdir(), 'decent-movies-plugins', p.name)));

  if (!plugin) {
    console.error(`No matching plugin found for disable() caller ${callerPath}`);
    return;
  }

  plugin.disabled = true;
}

export { Title,Episode,Season,TitleDetails,Servers,Server,VisualEpisode,httpGet,httpGetHtml,cheerio_load,puppeteer }