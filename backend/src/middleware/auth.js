// backend/src/middleware/auth.js
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    req.user = await admin.auth().verifyIdToken(token); // req.user.uid is now trustworthy
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = requireAuth;