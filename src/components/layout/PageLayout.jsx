import React from 'react'

const PageLayout = ({ children }) => {
   return (
      <div className='min-h-screen px-6 pb-5 font-poppins bg-gradient-to-br from-[#f0f4f8] via-[#e5eaf1] to-[#f7f9fc]'>
         {children}
      </div>
   )
}

export default PageLayout