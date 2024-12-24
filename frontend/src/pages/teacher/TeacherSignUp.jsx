import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function TeacherSignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = (data) => {
    console.log('Teacher Sign Up:', data);
    // Handle sign up logic
    navigate('/teacher/login');
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-white">
      {/* Faded Grid Background */}
      <div className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Form Container */}
      <div
        className={`bg-white p-8 text-center rounded-lg shadow-lg w-96 transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className="text-2xl mb-4">Teacher Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 relative">
            <label className="block text-left">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          <div className="mb-4 relative">
            <label className="block text-left">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div className="mb-4 relative">
            <label className="block text-left">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignUp;
