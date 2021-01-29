import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';

const Home: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!session && (
        <div className="text-3xl">
          Not signed in <br />
          <button onClick={(): Promise<void> => signIn('auth0')}>
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div className="text-3xl">
          Signed in as {session.user.email} <br />
          <button onClick={(): Promise<void> => signOut()}>Sign out</button>
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

export default Home;
