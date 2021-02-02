import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: String;
}
interface SuccessResponseType {
  date: String;
  teacher_name: String;
  teacher_id: String;
  student_name: String;
  student_id: String;
  course: String;
  location: String;
  appointment_link: String;
}
export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (!session) {
      res.status(400).json({ error: 'Please login first' });
      return;
    }

    const {
      date,
      teacher_name,
      teacher_id,
      student_name,
      student_id,
      course,
      location,
      appointment_link,
    }: {
      date: String;
      teacher_name: String;
      teacher_id: String;
      student_name: String;
      student_id: String;
      course: String;
      location: String;
      appointment_link: String;
    } = req.body;

    if (
      !date ||
      !teacher_name ||
      !teacher_id ||
      !student_name ||
      !student_id ||
      !course ||
      !location
    ) {
      res.status(400).json({ error: 'Missing on request body' });
      return;
    }

    const { db } = await connect();

    const teacherExists = await db
      .collection('users')
      .findOne({ _id: new ObjectId(teacher_id) });
    if (!teacherExists) {
      res.status(400).json({
        error: `teacher ${teacher_name} with ID ${teacher_id} does not exist`,
      });
      return;
    }

    const studentExists = await db
      .collection('users')
      .findOne({ _id: new ObjectId(student_id) });

    if (!studentExists) {
      res.status(400).json({
        error: `student ${student_name} with ID ${student_id} does not exist`,
      });
      return;
    }

    const appointment = {
      date,
      teacher_name,
      teacher_id,
      student_name,
      student_id,
      course,
      location,
      appointment_link: appointment_link || '',
    };

    await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(teacher_id) },
        { $push: { appointments: appointment } }
      );

    await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(student_id) },
        { $push: { appointments: appointment } }
      );

    res.status(200).json(appointment);
  } else {
    res.status(400).json({ error: 'Wrong request method' });
    return;
  }
};
