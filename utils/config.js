import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Config {
  constructor() {
    const configPath = path.resolve(__dirname, '../CONFIG.json');

    let configData;
    try {
      const rawData = fs.readFileSync(configPath, 'utf-8');
      configData = JSON.parse(rawData);
    } catch (err) {
      throw new Error(`Failed to load config file at ${configPath}: ${err.message}`)
    }

    const requiredFields = ['plugins_folder', 'port', 'master_password'];
    for (const field of requiredFields) {
      if (!configData[field]) {
        throw new Error(`Missing required config field: ${field}`);
      }
    }

    this.plugins_folder = configData.plugins_folder;
    this.port = configData.port;
    this.master_password = configData.master_password;
  }
}

export default Config;