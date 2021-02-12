import { NextPage } from 'next';
import Link from 'next/link';

const Nav: NextPage = () => {
  return (
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Next com mongodb
            </a>
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          <li>
            <Link href="/profile">
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Profile
              </a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Search
              </a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Nav;
