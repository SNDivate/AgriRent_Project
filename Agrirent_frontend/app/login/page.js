'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib/api'
import { toast, Toaster } from 'sonner' // Import Toaster
import { Button, Input } from '@nextui-org/react'
import React from "react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
import { isAuthenticated } from '@/lib/api'
import { useEffect } from 'react'

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

  
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard')
    }
  }, [router])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await loginUser(formData)
      
      
      toast.success('Login successful!')

      // Clear form after submission
      setFormData({
        email: '',
        password: '',
      })

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      toast.error(error.message || 'Login failed. Please try again.')
    }
  }
    return (
      <div className="login-container flex items-center justify-center bg-green-100  relative min-h-screen"suppressHydrationWarning>
        <div className="login-form-wrapper flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"suppressHydrationWarning>
          <div className="login-image w-1/2 hidden md:block">
            <img src="/login.png" alt="Login" className="object-cover h-full w-full" />
          </div>
          <div className="login-form-container w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="login-title text-black-500 text-2xl font-bold mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form__group field mb-6">
                <Input
                  label="Email"
                  variant="bordered"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                />
              </div>
              <div className="form__group field mb-6">
                <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="w-full"
                  name="password"
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                />
              </div>
              <div className="flex justify-center space-x-2 mb-4">
                <Button type="submit" className="login-submit-button bg-green-500 text-white hover:bg-green-600 transition-colors">Login</Button>
                <Button type="button" className="login-cancel-button" onClick={() => router.push('/some-other-page')}>Cancel</Button>
              </div>
              <p className="text-center">
              Already haven&apos;t an account?{' '}
              <span className="text-blue-500 cursor-pointer" onClick={() => router.push('/register')}>Register</span>
            </p>
            </form>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    );
  }




// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { loginUser, useAuth } from '@/lib/api'; // Update the import path as needed

// export default function LoginPage() {
//   const router = useRouter();
//   const { isAuthenticated, isLoading } = useAuth();
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Only redirect if we're authenticated and not in a loading state
//     if (isAuthenticated && !isLoading) {
//       router.push('/dashboard');
//     }
//   }, [isAuthenticated, isLoading, router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await loginUser(credentials);
//       router.push('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Show loading state while checking authentication
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Only show login form if not authenticated
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="text-red-500 text-center">
//               {error}
//             </div>
//           )}
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email" className="sr-only">Email address</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={credentials.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={credentials.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }