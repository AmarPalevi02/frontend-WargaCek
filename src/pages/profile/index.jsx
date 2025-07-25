import React from 'react'
import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/Navbar'
import ProfileUser from './ProfileUser'

import CardRiwayat from './CardRiwayat'

const Profile = () => {

   return (
      <PageLayout>
         <Navbar />
         <div className="pt-7">
            <ProfileUser />
         </div>

         <div className="mt-7">
            <h3 className='font-semibold tetx-md mb-4'>Ringkasan unggahan</h3>
            <CardRiwayat />
         </div>
      </PageLayout>
   )
}

export default Profile