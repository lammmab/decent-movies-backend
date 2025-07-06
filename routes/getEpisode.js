import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { plugin, s, e } = req.body;
  // TODO: Plugin episode stream handling
  res.json({ plugin, s, e, sources: [] });
});

export default router;