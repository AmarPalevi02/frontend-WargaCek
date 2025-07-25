import React, { useEffect, useState } from 'react'
import images from '../../assets'
import SkeletonCard from '../../components/SkeletonCard'

import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'

const history = [
   {
      thumbnail: images.jalanrusak,
      title: "Kerusakan infrastruktur jalan",
      description: "Lubang sedalam 20 cm menyebabkan beberapa motor tergelincir. Sudah 5 hari belum diperbaiki.",
      location: "Jl. Merdeka No. 10",
      upload: "1"
   },
   {
      thumbnail: images.jalanbanjir,
      title: "Jalan banjir",
      description: "Jalan tergenang air setinggi 30-50 cm akibat hujan deras sejak pagi. Arus lalu lintas diperlambat, kendaraan roda dua disarankan mencari alternatif. Genangan diperkirakan surut dalam 4-5 jam jika hujan reda. Petugas sedang memantau dan membersihkan saluran air tersumbat",
      location: "Jl. Ahmad Yani, depan Pasar Induk",
      upload: "1"
   },
   {
      thumbnail: images.penutupanjalan,
      title: "Kerusakan penutupan jalan",
      description: "Jalan ditutup sementara akibat lubang besar sedalam 20 cm yang belum diperbaiki selama 5 hari. Tercatat 3 motor tergelincir dan 1 mobil mengalami kerusakan ban. Pengalihan arus dipasang melalui jalur kiri dengan rambu darurat. Perbaikan diperkirakan dimulai besok pagi.",
      location: "Jl. Merdeka, dekat pertokoan Serba 2000",
      upload: "2"
   },

]

const CardRiwayat = () => {
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const timeout = setTimeout(() => {
         setIsLoading(false)
      }, 1500)
      return () => clearTimeout(timeout)
   }, [])

   return (
      <>
         {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : history.map((item, i) => (
               <div key={i} className=" rounded-xl overflow-hidden shadow-md bg-[#fff] mb-4 p-3">
                  <div className=" h-40 overflow-hidden">
                     <img
                        src={item.thumbnail}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                     />
                  </div>

                  {/* Konten */}
                  <div className="p-4">
                     <h2 className="text-lg font-semibold text-black mb-1">
                        {item.title}
                     </h2>
                     <p className="text-sm text-gray-800 mb-4 line-clamp-3 text-justify">
                        {item.description}
                     </p>

                     {/* Lokasi dan Waktu */}
                     <div className="flex items-center text-sm text-black gap-2 mb-1">
                        <FaMapMarkerAlt className="text-base" />
                        <span>
                           {item.location}
                        </span>
                     </div>
                     <div className="flex items-center text-sm text-black gap-2">
                        <FaClock className="text-base" />
                        <span>{item.upload} jam yang lalu</span>
                     </div>
                  </div>
               </div>
            ))}
      </>
   )
}

export default CardRiwayat