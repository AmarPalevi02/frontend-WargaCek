import React, { useEffect } from 'react'
import SkeletonCard from '../../components/SkeletonCard'

import { FaClock, FaMapMarkerAlt, FaRegThumbsDown, FaThumbsUp, FaUser, FaUsers } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLaporanVote, resetFetchLaporanVote } from '../../redux/getlaporanbyvote/action'
import { voteLaporan } from '../../redux/vote/action'
import { configs } from '../../configs/config'

const CardPantau = () => {
   const dispatch = useDispatch();
   const { data, loading } = useSelector((state) => state.laporanbyVote);
   const { voting } = useSelector((state) => state.voteLaporan)

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(fetchLaporanVote({ userLat: latitude, userLng: longitude, radius: 5 }));
         },
         () => {
            dispatch(fetchLaporanVote());
         }
      );

      return () => {
         dispatch(resetFetchLaporanVote());
      };
   }, [dispatch]);


   if (loading) {
      return Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
   }

   return (
      <>
         {data?.map((laporan, i) => (
            <div key={i} className="bg-[#fff] rounded-xl overflow-hidden shadow-md mb-4 max-w-md mx-auto">
               <div className="h-40 w-full overflow-hidden p-2">
                  {laporan.foto_url && (
                     <img
                        src={`${configs.base_url_dev}${laporan.foto_url}`}
                        alt="Foto kerusakan"
                        className="w-full h-full object-cover rounded-lg"
                     />
                  )}
               </div>

               <div className="p-4">
                  <h2 className="text-lg font-semibold text-black mb-1">
                     {laporan.tipe_kerusakan}
                  </h2>

                  <p className="text-sm text-gray-800 mb-4 line-clamp-3 text-justify">
                     {laporan.deskripsi}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm text-black mb-4">
                     <div className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        <span className="line-clamp-3">{laporan.location}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <FaUsers />
                        <span>{laporan.likeCount || 0} orang setuju</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <FaClock />
                        <span>{new Date(laporan.waktu_laporan).toLocaleString()}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <FaUser />
                        <span>Oleh @{laporan.User?.username || laporan.username || "Anonim"}</span>
                     </div>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex gap-3 flex-wrap justify-evenly ">
                     <button
                        className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-sm"
                        disabled={voting || laporan.userVote === "LIKE"} 
                        onClick={() => dispatch(voteLaporan(laporan.id, "LIKE"))}
                     >
                        <FaThumbsUp className="text-base sm:text-lg md:text-xl hidden sm:inline" />
                        Saya melihat ini
                     </button>

                     <button
                        className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-sm"
                        disabled={voting || laporan.userVote === "DISLIKE"} 
                        onClick={() => dispatch(voteLaporan(laporan.id, "DISLIKE"))}
                     >
                        <FaRegThumbsDown className="text-base sm:text-lg md:text-xl hidden sm:inline" />
                        tidak melihat ini
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </>
   )
}

export default CardPantau