import express from 'express';
import { combinedSearch } from './pluginFunctions.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { query } = req.body;
  try {
  const results = await combinedSearch(query);
  res.json({ results });
  } catch (err) {
    console.error("Search failed: ", err);
    res.status(500).json({error: 'Search failed', details: err.message});
  }
});

export default router;