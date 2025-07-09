import fs from 'fs/promises';
import path from 'path';
import StreamZip from 'node-stream-zip';
import os from 'os';
import * as API from './api.js';

import { pathToFileURL } from 'url';

class Plugin {
  constructor({ name, path, description, entry_point, version, logo_path, dependencies }) {
    this.path = path;
    this.disabled = false;
    this.name = name || "Default Plugin";
    this.description = description || "Unspecified";
    this.entry_point = entry_point || "main.js";
    this.version = version || "1.0.0";
    this.logo_path = logo_path || ""; 
    this.dependencies = dependencies;
    this.search = null;
    this.getSubtitles = null;
    this.getTitleInfo = null;
    this.getPluginSettings = null;
    this.getEpisode = null;
  }
}

const TEMP_PLUGIN_DIR = path.join(os.tmpdir(), 'decent-movies-plugins');
await fs.mkdir(TEMP_PLUGIN_DIR, { recursive: true });

async function startPlugin(plugin) {
  const zip = new StreamZip.async({ file: plugin.path });
  
  const pluginTempPath = path.join(TEMP_PLUGIN_DIR, plugin.name);
  await fs.mkdir(pluginTempPath, { recursive: true });

  await zip.extract(null, pluginTempPath);
  await zip.close();

  const entryFullPath = path.join(pluginTempPath, plugin.entry_point);

  let pluginModule;
  try {
    pluginModule = await import(pathToFileURL(entryFullPath).href);
  } catch (err) {
    console.error(`Failed to load plugin ${plugin.name}: ${err.message}`);
    return;
  }

  const exported = pluginModule.default || pluginModule;

  if (typeof exported.search === 'function') plugin.search = exported.search;
  if (typeof exported.getSubtitles === 'function') plugin.getSubtitles = exported.getSubtitles;
  if (typeof exported.getTitleInfo === 'function') plugin.getTitleInfo = exported.getTitleInfo;
  if (typeof exported.getPluginSettings === 'function') plugin.getPluginSettings = exported.getPluginSettings;
  if (typeof exported.getEpisode === 'function') plugin.getEpisode = exported.getEpisode;
  if (typeof exported.onStart === 'function') {
    try {
      await exported.onStart(API);
    } catch (err) {
      console.error(`Plugin ${plugin.name} had an error on start:`, err);
      console.error(`Disabling plugin ${plugin.name} due to error`);
      return;
    }
  }

  global.plugins = global.plugins || [];
  global.plugins.push(plugin);
  console.log(`Loaded plugin ${plugin.name}`);
}

async function loadPluginFromFilepath(filepath) {
  const zip = new StreamZip.async({ file: filepath });
  const entries = await zip.entries();

  if (!entries['manifest.json']) {
    throw new Error(`Plugin ${filepath} missing manifest.json! Can't load!`);
  }

  const manifestBuffer = await zip.entryData('manifest.json');
  const manifestString = manifestBuffer.toString('utf-8');
  let manifest;

  try {
    manifest = JSON.parse(manifestString);
  } catch (err) {
    await zip.close();
    throw new Error(`Failed to parse manifest.json in ${filepath}: ${err.message}`);
  }

  await zip.close();

  const plugin = new Plugin({
    path: filepath,
    name: manifest.name,
    description: manifest.description,
    entry_point: manifest.entry,
    version: manifest.version,
    logo_path: manifest.logo,
    dependencies: manifest.dependencies
    });
  
  
  startPlugin(plugin);
}

async function loadPlugins() {
  const pluginsDir = path.resolve(process.cwd(), global.config.plugins_folder);
  try {
    const entries = await fs.readdir(pluginsDir, { withFileTypes: true });
    const plugins = entries
      .filter(entry => entry.isFile() && entry.name.endsWith('.zip'))
      .map(entry => path.join(pluginsDir,entry.name))
    for (const plugin of plugins) {
      await loadPluginFromFilepath(plugin)
    }
  } catch (err) {
    console.error(`Failed to load plugins from ${pluginsDir}: ${err.message}`)
  }
}

export { loadPlugins,loadPluginFromFilepath }