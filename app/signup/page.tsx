'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const SignupPage = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target?.name]: e.target?.value,
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (res.status === 200) {
        console.log('Success');

        setCredentials({
          username: '',
          password: '',
        });

        router.push('/signin');
      } else {
        console.log('Failed');
      }
    } catch (error) {
      console.error('SignIn error:', error);
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-6"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={credentials.username}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Enter Password"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
          <button
            type="submit"
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-6"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;
