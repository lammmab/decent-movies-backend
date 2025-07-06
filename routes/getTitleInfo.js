import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { plugin, title } = req.body;
  // TODO: Plugin logic
  res.json({ title, plugin, info: {} });
});

export default router;