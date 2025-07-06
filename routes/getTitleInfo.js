import express from 'express';
import { getPluginByName, getTitleDetailsByPlugin } from './pluginFunctions';

const router = express.Router();

router.post('/', async (req, res) => {
  const { plugin, title } = req.body;

  try {
    const targetPlugin = getPluginByName(plugin);
    if (!targetPlugin) {
      return res.status(404).json({ error: `Plugin '${plugin}' not found.` });
    }

    const details = await getTitleDetailsByPlugin(title, targetPlugin);
    res.json({ details });
  } catch (err) {
    res.status(500).json({ error: 'Get title details failed', details: err.message });
  }
});
