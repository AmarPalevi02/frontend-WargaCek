import React, { useState } from 'react'
import LogoMaps from '../components/LogoMaps'
import LogoWc from '../components/LogoWc'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Cookies from 'js-cookie'
import Alert from '../components/ui/Alert'
import Spinner from '../components/ui/Spinner'

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { postData } from '../utils/fetchDatas'
import { useDispatch } from 'react-redux'
import { userLogin } from '../redux/auth/action'
import { showAlert } from '../redux/alert/action'
import PageLayout from '../components/layout/PageLayout'


const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm()

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isLoading, setIsloading] = useState(false)

   const handleLogin = async (data) => {
      setIsloading(true)
      try {
         const response = await postData(data, false, 'login')
         const { token, user } = response.data;

         const authPayload = {
            token,
            username: user.username,
            email: user.email,
            role: user.role
         };
         Cookies.set('auth', JSON.stringify(authPayload));

         dispatch(userLogin(token, user.username, user.email, user.role));

         navigate('/');

         setIsloading(false)
      } catch (error) {
         dispatch(showAlert('Login gagal. Prikasa kemabali email dan password', 'error'))
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
            onSubmit={handleSubmit(handleLogin)}
         >
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
                  required: 'Email wajib di isi',
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
                  required: 'Password wajib di isi',
                  minLength: {
                     value: 6,
                     message: 'Password must be at least 6 characters',
                  },
               })}
            />

            <Button
               type="submit"
               className='w-full'
               disabled={isLoading}
            >
               {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                     <Spinner />
                     Loading...
                  </div>
               ) : (
                  "Login"
               )}
            </Button>
         </form>

         <div className="flex gap-1 justify-center text-sm font-light items-center text-center mt-4">
            <p className='text-gray-600'>Belum punya akun? </p>
            <Link
               to={'/register'}
               className='text-indigo-700 text-sm'
            >
               Daftar
            </Link>
         </div>
      </PageLayout >
   )
}

export default Login