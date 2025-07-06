import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  // TODO: Load settings from plugins or config
  res.json({ settings: [] });
});

export default router;