import express from 'express';
import { getEpisode,getPluginByName } from '../utils/pluginFunctions.js';
import { isValidToken } from '../utils/authFunctions.js';
const router = express.Router();

// takes in plugin name, title, season and episode (if a tv show) and returns the servers etc. provided from plugins
router.post('/', async (req, res) => {
  const { token, plugin, title, s, e } = req.body;
  if (!isValidToken(token)) {
    res.status(500).json({ error: 'You don\'t have proper authentication!' });
    return;
  }

  let plug;
  try {
    plug = getPluginByName(plugin);
  } catch (err) {
    res.status(500).json({ error: 'Plugin not found: ', details: err.message });
    return;
  }

  try {
    let episode = await getEpisode(title,s,e,plug);
    res.json({ episode });
  } catch (err) {
    res.status(404).json({ error: 'Failed to get episode: ', details: err.message });
  }
  
});

export default router;