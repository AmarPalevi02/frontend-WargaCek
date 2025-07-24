import React from 'react'
import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/Navbar'
import ProfileUser from './ProfileUser'

const Profile = () => {

   return (
      <PageLayout>
         <Navbar />
         <div className="pt-7">
            <ProfileUser />
         </div>

         <div className="mt-5"> 
            <h3>Ringkasan unggahan</h3>
         </div>
      </PageLayout>
   )
}

export default Profile