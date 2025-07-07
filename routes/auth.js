
import express from 'express';
import { createMasterToken, createUserToken, isCorrectPassword, isMasterPassword } from '../utils/authFunctions.js'
const router = express.Router();

// check password, respond with token if correct (defined in CONFIG.json)
router.post('/', (req, res) => {
  const { password } = req.body;
  if (!isCorrectPassword(password)) {
    res.status(500).json({ error: 'Incorrect password' });
    return;
  }

  let token;
  if (isMasterPassword(password)) {
    token = createMasterToken();
    if (!Array.isArray(global.master_tokens)) {
      global.master_tokens = []
    }
    global.master_tokens.push(token);
  } else {
    token = createUserToken();
    if (!Array.isArray(global.user_tokens)) {
      global.user_tokens = []
    }
    global.user_tokens.push(token);
  }
  res.json({ token });
});

export default router;