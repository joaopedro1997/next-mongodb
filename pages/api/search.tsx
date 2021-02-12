import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: String;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | Object[]>
): Promise<void> => {
  if (req.method === 'GET') {
    const { courses } = req.body;

    if (!courses) {
      res.status(400).json({ error: 'Missing course name on request body' });
      return;
    }

    const { db } = await connect();

    const response = await db.find({ courses }).toArray();
    if (response.length == 0) {
      res.status(400).json({ error: 'course not found' });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Wrong request method' });
    return;
  }
};
