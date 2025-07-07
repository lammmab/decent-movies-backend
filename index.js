import express from 'express';

import searchRoute from './routes/search.js';
import titleInfoRoute from './routes/getTitleInfo.js';
import episodeRoute from './routes/getEpisode.js';
import authRoute from './routes/auth.js';

import settingsRoute from './routes/getSettings.js';
import { loadPlugins } from './utils/pluginloader.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// fix not in commonES scope error
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Config from './utils/config.js';

global.config = new Config();

const app = express();
const PORT = global.config.port;

// allow anything to connect bc different clients
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, 
}));


app.use(express.json());

// head to /routes/
app.use('/api/search', searchRoute);
app.use('/api/getTitleInfo', titleInfoRoute);
app.use('/api/getEpisode', episodeRoute);
app.use('/api/getSettings', settingsRoute);
app.use('/', authRoute);

(async () => {
  await loadPlugins();
  app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use, please free it or choose another port.`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
})();
