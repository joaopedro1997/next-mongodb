import { countReset } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/database';

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
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ error: 'Missing e-mail or id on request body' });
      return;
    }

    const { db } = await connect();

    const response = await db.findOne({ email });

    if (!response) {
      res.status(400).json({ error: `User with e-mail ${email} not found` });
      return;
    }

    res.status(200).json(response);
    return;
  } else {
    res.status(400).json({ error: 'Wrong request method' });
    return;
  }
};
