import fs from 'fs/promises';
import path from 'path';

const StreamZip = require('node-stream-zip');

class Plugin {
  constructor({ name, description, entry_point, version, logo_path, dependencies }) {
    this.name = name || "Default Plugin";
    this.description = description || "Unspecified";
    this.entry_point = entry_point || "main.lua";
    this.version = version || "1.0.0";
    this.logo_path = logo_path || ""; 
    this.dependencies = dependencies;
  }
}

async function startPlugin(plugin) {
  
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

    for (const plugin in plugins) {
      await loadPluginFromFilepath(plugin)
    }
  } catch (err) {
    console.error(`Failed to load plugins from ${pluginsDir}: ${err.message}`)
  }
}

export { loadPlugins }