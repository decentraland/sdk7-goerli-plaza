import { Request, Response } from 'express';
import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as express from 'express';
import * as cors from 'cors';

require('dotenv').config()

const SERVER_PORT = process.env.PORT || 3012;
const SERVER_BASE_URL = process.env.BASE_URL || '';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

(async () => {
  const db = await dbPromise;
  await db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, wearable INTEGER, timeStamp INTEGER, visits INTEGER)');
})();

app.get('/hello-world', (req: Request, res: Response) => {
  return res.status(200).send('Hello World!');
});

app.post('/add-user', async (req: Request, res: Response) => {
  const newUser = req.body;
  const timestamp = Date.now();
  const db = await dbPromise;

  try {
    const existingUser = await db.get('SELECT * FROM users WHERE id = ?', [newUser.id]);
    if (existingUser) {
      const updatedVisits = existingUser.visits + 1;
      await db.run('UPDATE users SET visits = ? WHERE id = ?', [updatedVisits, newUser.id]);
      existingUser.visits = updatedVisits;
      return res.status(200).json(existingUser);
    } else {
      await db.run('INSERT INTO users (id, wearable, timeStamp, visits) VALUES (?, ?, ?, ?)', [newUser.id, 0, timestamp, 1]);
      return res.status(200).send('User Registered!');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

app.post('/update-wearable', async (req: Request, res: Response) => {
  const userId = req.body.id;
  const db = await dbPromise;

  try {
    const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).send('User not found');
    }

    let currentWearable = user.wearable;
    let timestamp = user.timeStamp;
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24 && currentWearable !== 0) {
      return res.status(400).json('Less than 24 hours have passed');
    }

    timestamp = currentTime;
    if (currentWearable === 0) {
      currentWearable = 1;
      console.log('Wearable 1 was sent');
    } else if (currentWearable === 1) {
      currentWearable = 2;
      console.log('Wearable 2 was sent');
    } else if (currentWearable === 2) {
      currentWearable = 3;
      console.log('Wearable 3 was sent');
    } else {
      return res.status(400).json('The user already has the maximum wearable');
    }

    await db.run('UPDATE users SET wearable = ?, timeStamp = ? WHERE id = ?', [currentWearable, timestamp, userId]);
    return res.status(200).json('Wearable updated successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

app.post('/getUserData', async (req: Request, res: Response) => {
  const userId = req.body.id;
  const db = await dbPromise;

  try {
    const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
    console.log({ user })
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT} - base URL: "${SERVER_BASE_URL}"`);
});
