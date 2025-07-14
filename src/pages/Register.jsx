import React, { useState } from 'react'
import LogoMaps from '../components/LogoMaps'
import LogoWc from '../components/LogoWc'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import Spinner from '../components/ui/Spinner'

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { postData } from '../utils/fetchDatas'
import { useDispatch } from 'react-redux'
import { showAlert } from '../redux/alert/action'
import PageLayout from '../components/layout/PageLayout'


const Register = () => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm()

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isLoading, setIsloading] = useState(false)

   const handleRegister = async (data) => {
      setIsloading(true)
      try {
         const response = await postData(data, false, 'register')
         if (response.data.status === '201') {
            navigate('/login')
         }
         setIsloading(false)
      } catch (error) {
         const message = error.response?.data?.message || "Gagal registrasi";
         dispatch(showAlert(`${message}`, 'error'))
         setIsloading(false)
      }
   }

   return (
      <PageLayout>
         <Alert />
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
               name="password"
               id="password"
               label="Password"
               placeholder="Masukan Password"
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
               {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                     <Spinner />
                     Loading...
                  </div>
               ) : (
                  "Register"
               )}
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
      </PageLayout>
   )
}

export default Register