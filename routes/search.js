import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { query } = req.body;
  // TODO: Handle plugin logic
  res.json({ results: [`Hi we will probably replace you with test plugin logic soon`] });
});

export default router;