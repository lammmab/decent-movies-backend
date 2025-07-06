import express from 'express';

// routes
import searchRoute from './routes/search.js';
import titleInfoRoute from './routes/getTitleInfo.js';
import episodeRoute from './routes/getEpisode.js';
import settingsRoute from './routes/getSettings.js';

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

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${global.config.port}`);
});