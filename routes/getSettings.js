import express from 'express';
import { isValidToken,isMasterToken } from '../utils/authFunctions.js';
const router = express.Router();

router.post('/', (req, res) => {
  if (!isValidToken(token)) {
    res.status(500).json({ error: 'You don\'t have proper authentication!' });
    return;
  }
  if (!isMasterToken(token)) {
    res.status(500).json({ error: 'You must under the master user!' });
    return;
  }
  // TODO: Load settings from plugins or config
  res.json({ settings: [] });
});

export default router;