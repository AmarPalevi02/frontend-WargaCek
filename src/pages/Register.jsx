import React from 'react'
import LogoMaps from '../components/LogoMaps'
import LogoWc from '../components/LogoWc'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Register = () => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm()

   const handleRegister = (data) => {
      console.log(`username: ${data.username}`)
      console.log(`email: ${data.email}`)
      console.log(`password: ${data.password}`)
   }

   return (
      <div className='min-h-screen px-6 pb-5 font-poppins bg-gradient-to-br from-[#f0f4f8] via-[#e5eaf1] to-[#f7f9fc]'>
         <div className="pt-5">
            <LogoMaps />
         </div>
         <div className="flex items-baseline gap-1 justify-center mt-4">
            <h1 className='text-2xl font-semibold'>Welcome</h1>
            <LogoWc className="text-2xl" />
         </div>

         <form
            className='mt-20'
            onSubmit={handleSubmit(handleRegister)}
         >
            <Input
               className="mb-7"
               type="text"
               name="username"
               id="username"
               label="User Name"
               placeholder="Masukan User Name"
               // value={formData.email}
               // onChange={handleChange}
               register={register}
               error={errors.username}
               {...register('username', {
                  required: 'username is required',
                  minLength: {
                     value: 3,
                     message: "User Name must be at 3 characters"
                  }
               })}
            />
            <Input
               className="mb-7"
               type="email"
               name="email"
               id="email"
               label="Email"
               placeholder="Masukan email"
               // value={formData.email}
               // onChange={handleChange}
               // error={errors.email}
               register={register}
               error={errors.email}
               {...register('email', {
                  required: 'Email is required',
                  pattern: {
                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                     message: 'Invalid email address',
                  },
               })}
            />
            <Input
               className="mb-7"
               type="password"
               name="email"
               id="email"
               label="Password"
               placeholder="Masukan Password"
               // value={formData.email}
               // onChange={handleChange}
               // error={errors.email}
               error={errors.password}
               register={register}
               {...register('password', {
                  required: 'Password is required',
                  minLength: {
                     value: 6,
                     message: 'Password must be at least 6 characters',
                  },
               })}
            />
            <Button
               type="submit"
               className='w-full'>
               Register
            </Button>
         </form>

         <div className="flex gap-1 justify-center text-sm font-light items-center text-center mt-4">
            <p className='text-gray-600'>Sudah punya akun? </p>
            <Link
               to={'/login'}
               className='text-indigo-700 text-sm'
            >
               Login
            </Link>
         </div>
      </div>
   )
}

export default Register