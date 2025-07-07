import crypto from 'crypto';

function isCorrectPassword(password) {
  const master_password = global.config.master_password;
  const user_passwords = global.config.user_passwords || [];
  return password === master_password || user_passwords.includes(password);
}

function isMasterPassword(password) {
  return password === global.config.master_password;
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function createMasterToken() {
  const token = generateToken();
  return token;
}

function createUserToken() {
  const token = generateToken();
  return token;
}

function isValidToken(token) {
  return global.master_tokens.includes(token) || global.user_tokens.includes(token);
}

function isMasterToken(token) {
  return global.master_tokens.includes(token);
}


export { 
  isCorrectPassword,
  isMasterPassword,
  createMasterToken,
  createUserToken,
  isValidToken,
  isMasterToken,
};
