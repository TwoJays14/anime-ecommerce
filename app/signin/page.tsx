'use client';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const SignInPage = () => {
  const router = useRouter();

  const [providers, setProviders] = useState<Object | null>(null);
  console.log('Providers', providers);

  const handleSignIn = async (providerId: string) => {
    const res = await signIn(providerId, {
      callbackUrl: '/',
    });

    if (res?.url) {
      router.push(res.url);
    }
  };

  useEffect(() => {
    const setProvidersList = async () => {
      const response = await getProviders();

      console.log(response);
      setProviders(response);
    };

    setProvidersList();
  }, []);
  return (
    <div className="card md:card-side  mx-auto bg-base-100 shadow-xl flex justify-center items-center">
      <figure className="w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
          alt="Album"
          className="object-cover"
        />
      </figure>
      <div className="card-body glass w-full flex justify-center rounded-r-2xl">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => handleSignIn(provider.id)}
              className="text-center"
            >
              Sign In with {provider.name}
            </button>
          ))}
      </div>
    </div>
  );
};
export default SignInPage;
