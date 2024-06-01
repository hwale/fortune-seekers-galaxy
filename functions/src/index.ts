import * as functions from 'firebase-functions';
import * as crypto from 'crypto';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { grantSessionToken } from './hyplay';
import {
  GrantSessionTokenRequest,
  GrantSessionTokenResponse,
} from './hyplay/types';

// const HYPLAY_OAUTH_URL = 'https://hyplay.com/oauth/token';
// const CLIENT_ID = "YOUR_APP_ID_HERE";
// const CLIENT_SECRET = "YOUR_CLIENT_SECRET_HERE";
// const REDIRECT_URI = "YOUR_REDIRECT_URI_HERE";
const ENCRYPTION_KEY = functions.config().encryption.key; // Must be 32 bytes for AES-256

const app = express();
app.use(cookieParser());
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://fortune-seekers-galaxy.web.app',
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        // Reject requests with no origin
        return callback(
          new Error(
            'The CORS policy for this site does not allow access from the specified origin.',
          ),
          false,
        );
      }
      if (allowedOrigins.indexOf(origin) === -1) {
        // Reject requests from disallowed origins
        return callback(
          new Error(
            'The CORS policy for this site does not allow access from the specified origin.',
          ),
          false,
        );
      }
      // Allow requests from allowed origins
      return callback(null, true);
    },
  }),
);

const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// const decrypt = (text: string): string => {
//   const textParts = text.split(':');
//   const iv = Buffer.from(textParts.shift() as string, 'hex');
//   const encryptedText = Buffer.from(textParts.join(':'), 'hex');
//   const decipher = crypto.createDecipheriv(
//     'aes-256-cbc',
//     Buffer.from(ENCRYPTION_KEY, 'hex'),
//     iv,
//   );
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// };

app.post('/login', async (req, res) => {
  const exchangeCode = req.body.exchangeCode as string;
  if (!exchangeCode) {
    return res.status(400).send('Exchange code not provided');
  }

  try {
    const data: GrantSessionTokenRequest = { exchangeCode };
    const response = await grantSessionToken(data);
    const { accessToken, expiresAt } =
      response.data as GrantSessionTokenResponse;
    const encryptedToken = encrypt(accessToken);

    res.cookie('access_token', encryptedToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(expiresAt),
      sameSite: 'none',
    });

    return res.status(200).send('Successfully logged in');
  } catch (error) {
    return res.status(500).send({ message: 'Token exchange failed', error });
  }
});

exports.api = functions.https.onRequest(app);
