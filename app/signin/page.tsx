'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();

  const [providers, setProviders] = useState<Object | null>(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSignIn = async (providerId: string) => {
    const res = await signIn(providerId, {
      callbackUrl: '/',
    });

    if (res?.url) {
      router.push(res.url);
    } else {
      console.log('Failed to sign in with provider');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        redirect: false,
        username: credentials.username,
        password: credentials.password,
        callbackUrl: '/',
      });

      if (res?.error) {
        // Handle the error, e.g., show an error message
        console.log('Failed to sign in:', res.error);
      } else if (res?.url) {
        router.push('/');
      }
    } catch (error) {
      // Handle any other errors
      console.error('SignIn error:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target?.name]: e.target?.value,
    });
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
          Object.values(providers)
            .slice(0, 3)
            .map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => handleSignIn(provider.id)}
                className="text-center btn btn-wide mx-auto"
              >
                Sign In with {provider.name}
              </button>
            ))}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-6"
        >
          <label className="mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={credentials.username}
            onChange={handleChange}
            className="input input-bordered max-w-xs"
          />
          <label className="mt-4 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Enter Password"
            onChange={handleChange}
            className="input input-bordered max-w-xs"
          />
          <button
            type="submit"
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-6"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignInPage;
