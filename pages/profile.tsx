import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from '../utils/api';

import Nav from '../components/nav';

const AppPage: NextPage = () => {
  const [session, loading] = useSession();

  const { data, error } = useSWR(`/api/user/${session?.user.email}`, api);

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {!session && (
          <div className="text-3xl">
            Favor fazer login para acessar essa página <br />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex mt-5 mb-5 m-auto"
              onClick={(): Promise<void> => signIn('auth0')}
            >
              Sign in
            </button>
          </div>
        )}
        {session && data && (
          <p>
            <div className="text-3xl">
              <h1>Bem vindo a página Profile </h1>
              Logado como {session.user.email} <br />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex mt-5 mb-5 m-auto"
                onClick={(): Promise<void> => signOut()}
              >
                Sair
              </button>
            </div>
            <p>{data.data.name}</p>
            <p>{data.data.coins} moedas</p>
          </p>
        )}
        {error && <h1>O usuário não existe</h1>}

        {loading && (
          <div className="text-5xl">
            <h1>CARREGANDO...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppPage;
