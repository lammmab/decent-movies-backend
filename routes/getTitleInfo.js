import express from 'express';
import { getPluginByName, getTitleDetailsByPlugin } from '../utils/pluginFunctions.js';
import { isValidToken } from '../utils/authFunctions.js';
const router = express.Router();

// get info for any title from specific plugin
router.post('/', async (req, res) => {
  const { token, plugin, title } = req.body;
  console.log(token);
  if (!isValidToken(token)) {
    res.status(500).json({ error: 'You don\'t have proper authentication!' });
    return;
  }

  try {
    const targetPlugin = getPluginByName(plugin);
    if (!targetPlugin) {
      console.log("Plugin not found");
      return res.status(404).json({ error: `Plugin '${plugin}' not found.` });
    }

    const details = await getTitleDetailsByPlugin(title, targetPlugin);
    console.log(details);
    res.json({ details });
  } catch (err) {
    console.log(`Failed to get title details: ${err}`)
    res.status(500).json({ error: 'Get title details failed', details: err.message });
  }
});

export default router;