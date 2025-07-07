import React from 'react'
import LogoMaps from '../components/LogoMaps'
import LogoWc from '../components/LogoWc'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'

const Register = () => {
   return (
      <div className='min-h-screen px-6 pb-5 font-poppins bg-gradient-to-br from-[#f0f4f8] via-[#e5eaf1] to-[#f7f9fc]'>
         <div className="pt-5">
            <LogoMaps />
         </div>
         <div className="flex items-baseline gap-1 justify-center mt-4">
            <h1 className='text-2xl font-semibold'>Welcome</h1>
            <LogoWc className="text-2xl" />
         </div>

         <form className='mt-20'>
            <Input
               type="text"
               name="username"
               id="text"
               label="User Name"
               placeholder="Masukan User Name"
               // value={formData.email}
               // onChange={handleChange}
               // error={errors.email}
               className="mb-7"
            />
            <Input
               type="email"
               name="email"
               id="email"
               label="Email"
               placeholder="Masukan email"
               // value={formData.email}
               // onChange={handleChange}
               // error={errors.email}
               className="mb-7"
            />
            <Input
               type="password"
               name="email"
               id="email"
               label="Password"
               placeholder="Masukan Password"
               // value={formData.email}
               // onChange={handleChange}
               // error={errors.email}
               className="mb-7"
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