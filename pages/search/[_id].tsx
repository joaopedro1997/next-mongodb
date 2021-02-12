import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios';

interface Teacher {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
  coins: number;
  courser: string[];
  available_hours: Record<string, unknown[]>;
  available_locations: string[];
  reviews: Record<string, unknown[]>;
  appointments: Record<string, unknown[]>;
}

export default function teacherProfilePage({
  name,
  email,
  _id,
}: Teacher): JSX.Element {
  console.log(name);
  return (
    <>
      <h1 className="text-3xl">Página do Professor {name} </h1>
      <h1 className="text-3xl">E-mail {email} </h1>
      <h1 className="text-2xl">Id {_id} </h1>
    </>
  );
}

export const gerServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const _id = context.query._id as string; // defindo que essa variavel é somente string

  const response = await axios.get<Teacher>(
    `http://localhost:3000/api/teacher/${_id}`
  );
  const teacher = response.data;
  return {
    props: teacher,
  };
};
