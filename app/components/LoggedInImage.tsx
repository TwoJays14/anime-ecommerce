import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export const LoggedInImage = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            {session.user?.image && (
              <Image
                width={50}
                height={50}
                src={session.user?.image as string}
                alt={session.user?.name as string}
                className="object-cover rounded-full"
              />
            )}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 glass bg-opacity-20"
          >
            <li>
              <h3>Profile: {session.user?.name}</h3>
            </li>
            <li>
              <h3>Settings & Privacy</h3>
            </li>
            <li>
              <h3>Help & Support</h3>
            </li>
            <li>
              <button onClick={() => signOut()}>Sign Out</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
