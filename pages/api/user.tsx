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
    const { name, email, cellphone, teacher } = req.body; //

    if (!name || !email || !cellphone || teacher == null) {
      res.status(400).json({ error: 'Missing body parameter' });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      name,
      email,
      cellphone,
      teacher,
    });
    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
