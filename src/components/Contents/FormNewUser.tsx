import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

interface IFormInput {
  name: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
    name: yup.string().min(3).max(255).required('Name is required'),
    nickname: yup.string().min(3).max(255).required('Nickname is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

const FormNewUser: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema),
      });
    
      const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    
      const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
          const response = await axios.post('http://localhost:8080/api/users', data);
          console.log(response)
          setFeedback({ type: 'success', message: 'User created successfully!' });
          reset();
        } catch (error) {
          setFeedback({ type: 'error', message: 'Error creating user. Please try again.' });
        }
      };

    return (
        <div className="m-4 flex flex-col items-center justify-center bg-gray dark:bg-gray-900">
          <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-lg">
          {feedback && (
            <div className={`mb-4 p-3 text-center rounded ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {feedback.message}
            </div>
            )}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">New User</h2>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">Create a new user by filling out the form below.</p>
              <div className="mt-4 flex justify-center">
                <nav className="text-sm text-gray-500 dark:text-gray-400">
                  <a href="/admin/users" className="hover:underline">List Users</a> &gt; <span className="font-medium text-gray-700 dark:text-gray-300">New User</span>
                </nav>
              </div>
            </div>
            <form 
             onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                     {...register('name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Nickname</label>
                  <input
                    type="text"
                    placeholder="Enter your nickname"
                    {...register('nickname')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.nickname && <span className="text-red-500">{errors.nickname.message}</span>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    {...register('password')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Re-type Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    {...register('confirmPassword')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded bg-primary py-3 font-medium text-gray-100 hover:bg-opacity-90"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      );
};

export default FormNewUser;
