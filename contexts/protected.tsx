import { useAuth } from './auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <div></div>;
  }

  if (!isLoading && !isAuthenticated && router.asPath !== '/login') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="md:w-1/3 w-full mx-4 flex flex-col bg-gray-100 rounded p-4">
          <img className="w-32 ml-auto" src="/images/branding/nextify.svg" />
          <div className="py-10 flex items-center justify-center">
            <Link href="/login">
              <button className="bg-dh-orange p-2 py-1 rounded text-white font-semibold">Login</button>
            </Link>
          </div>

          <hr />
          <div className="flex flex-row justify-between">
            <span className="text-xs pt-2 text-gray-700 mr-5">&copy; Next Media</span>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
