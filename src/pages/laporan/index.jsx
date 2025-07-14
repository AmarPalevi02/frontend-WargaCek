import React from 'react'
import PageLayout from '../../components/layout/PageLayout'
import Navbar from '../../components/Navbar'

const Laporan = () => {
   return (
      <PageLayout>
         <Navbar />
         <div className="pt-5">
            <div className="">
               <h1 className='text-xl font-semibold'>Laporkan Kondisi Sekitarmu</h1>
               <p className='text-justify mt-5 leading-7'>Bantu sesama warga dengan mengunggah laporan tentang kerusakan jalan, banjir, atau gangguan lainnya. Satu laporanmu bisa berdampak besar.</p>
            </div>

            
         </div>
      </PageLayout>
   )
}

export default Laporan