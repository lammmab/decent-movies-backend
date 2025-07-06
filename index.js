import express from 'express';
// routes
import searchRoute from './routes/search.js';
import titleInfoRoute from './routes/getTitleInfo.js';
import episodeRoute from './routes/getEpisode.js';
import settingsRoute from './routes/getSettings.js';
import { loadPlugins } from './utils/pluginloader.js';

// utils
import Config from './utils/config.js';

global.config = new Config();

const app = express();
const PORT = global.config.port;

app.use(express.json());

app.use('/api/search', searchRoute);
app.use('/api/getTitleInfo', titleInfoRoute);
app.use('/api/getEpisode', episodeRoute);
app.use('/api/getSettings', settingsRoute);


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
