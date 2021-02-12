import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/database';
import { ObjectID } from 'mongodb';

interface SuccessResponseType {
  _id: String;
  name: String;
  email: String;
  cellphone: String;
  teacher: true;
  coins: 1;
  courses: String[];
  available_hours: Object;
  available_locations: String[];
  reviews: Object[];
  appointments: Object[];
}
interface ErrorResponseType {
  error: String;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'GET') {
    const id = req.query._id as string;
    if (!id) {
      res.status(400).json({ error: 'Missing teacher ID on request body' });
      return;
    }

    let _id: ObjectID;
    try {
      _id = new ObjectID(id);
    } catch {
      res.status(400).json({ error: 'Wrong objectId' });
      return;
    }

    const { db } = await connect();

    const response = await db.findOne({ _id });
    if (!response) {
      res.status(400).json({ error: `Teacher with ID ${id} not found` });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Wrong request method' });
    return;
  }
};
