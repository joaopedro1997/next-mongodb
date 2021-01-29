import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';

const AppPage: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Bem vindo a página APP</h1>
      {!session && (
        <div className="text-3xl">
          Não logado <br />
          <button onClick={(): Promise<void> => signIn('auth0')}>
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div className="text-3xl">
          Logado como {session.user.email} <br />
          <button onClick={(): Promise<void> => signOut()}>Sair</button>
        </div>
      )}
      {loading && (
        <div className="text-5xl">
          <h1>CARREGANDO...</h1>
        </div>
      )}
    </div>
  );
};

export default AppPage;
