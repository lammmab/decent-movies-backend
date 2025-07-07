import express from 'express';
import { isValidToken } from '../utils/authFunctions.js';
import { combinedSearch } from '../utils/pluginFunctions.js';
const router = express.Router();

// loop through plugins returning their queried titles with their plugin name for later reference in the frontend
router.post('/', async (req, res) => {
  const { token, query } = req.body;
  if (!isValidToken(token)) {
    res.status(500).json({ error: 'You don\'t have proper authentication!' });
    return;
  }

  try {
  const results = await combinedSearch(query);
  res.json({ results });
  } catch (err) {
    console.error("Search failed: ", err);
    res.status(500).json({error: 'Search failed', details: err.message});
  }
});

export default router;