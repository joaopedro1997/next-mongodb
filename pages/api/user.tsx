import { countReset } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface SuccessResponseType {
  _id: String;
  name: String;
  email: String;
  cellphone: String;
  teacher: Boolean;
}
interface ErrorResponseType {
  error: String;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      name,
      email,
      cellphone,
      teacher,
      courses,
      available_hours,
      available_locations,
    } = req.body;

    if (!teacher) {
      if (!name || !email || !cellphone) {
        res.status(400).json({ error: 'Missing body parameter asasd' + name });
        return;
      }
    } else if (teacher) {
      if (
        !name ||
        !email ||
        !cellphone ||
        !teacher ||
        !courses ||
        !available_hours ||
        !available_locations
      ) {
        res.status(400).json({ error: 'Missing body parameter' });
        return;
      }
    }

    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      name,
      email,
      cellphone,
      teacher,
      coins: 1,
      courses: courses || [],
      available_hours: available_hours || {},
      available_locations: available_locations || [],
      reviews: [],
      appointments: [],
    });
    res.status(200).json(response.ops[0]);
  } else if (req.method === 'GET') {
    const { email, _id } = req.body;

    if (!email && !_id) {
      res.status(400).json({ error: 'Missing e-mail or id on request body' });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('users').findOne({ email });

    if (!response) {
      res.status(400).json({ error: 'Email not found' });
      return;
    }

    res.status(200).json(response);
    return;
  } else {
    res.status(400).json({ error: 'Wrong request method' });
    return;
  }
};
