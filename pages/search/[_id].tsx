import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import api from '../../utils/api';
interface Teacher {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
  coins: number;
  courses: string[];
  available_hours: Record<string, unknown[]>;
  available_locations: string[];
  reviews: Record<string, unknown[]>;
  appointments: Record<string, unknown[]>;
}

export default function teacherProfilePage({
  name, //sintaxe de desestruturacação
  email,
  _id,
  courses,
}: Teacher): JSX.Element {
  return (
    <>
      <h1 className="text-3xl">Página: do Professor {name} </h1>
      <h1 className="text-3xl">E-mail: {email} </h1>
      <h1 className="text-2xl">Id: {_id} </h1>
      <h1 className="text-2xl">Cursos:</h1>
      {courses.map((cursos) => {
        return (
          <p key={cursos} className="text-2xl">
            {cursos},
          </p>
        );
      })}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const _id = context.query._id as string; // defindo que essa variavel é somente string

  const response = await axios.get(`http://localhost:3000/api/teacher/${_id}`);

  const teacher = response.data;
  return {
    props: teacher,
  };
};
