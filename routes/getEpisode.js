import express from 'express';
import { getEpisode,getPluginByName } from './pluginFunctions';
const router = express.Router();

router.post('/', (req, res) => {
  const { plugin, title, s, e } = req.body;
  let plug;
  try {
    plug = getPluginByName(plugin);
  } catch (err) {
    res.status(500).json({ error: 'Plugin not found: ', details: err.message });
    return;
  }

  try {
    let episode = getEpisode(title,s,e,plug);
    res.json({ episode });
  } catch (err) {
    res.status(404).json({ error: 'Failed to get episode: ', details: err.message });
  }
  
});

export default router;