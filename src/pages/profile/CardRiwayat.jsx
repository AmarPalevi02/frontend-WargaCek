import React, { useEffect } from 'react'
import SkeletonCard from '../../components/SkeletonCard'

import { FaClock, FaMapMarkerAlt, FaTrash } from 'react-icons/fa'
import useAuthToken from '../../hooks/useAuthToken'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingHistoryUser } from '../../redux/historyUser/action'
import { deleteLaporanUser } from '../../redux/deletedhistoryuser/action'
import { configs } from '../../configs/config'
import { showAlert } from '../../redux/alert/action'

const CardRiwayat = () => {
   const { id: userId } = useAuthToken()
   const dispatch = useDispatch()

   const { loading, data: history } = useSelector((state) => state.historyUser)
   const { success: deleteSuccess } = useSelector((state) => state.deletedLaporan)


   useEffect(() => {
      if (userId) {
         dispatch(fetchingHistoryUser(userId))
      }
   }, [dispatch, userId])

   useEffect(() => {
      if (deleteSuccess && userId) {
         dispatch(fetchingHistoryUser(userId))
      }
   }, [deleteSuccess, userId, dispatch])

   const handleDelete = (laporanId) => {
      dispatch(showAlert(
         "Apakah yakin ingin menghapus laporan ini?",
         "warning",
         () => dispatch(deleteLaporanUser(laporanId))
      ));
   };

   if (loading) {
      return (
         <>
            {Array.from({ length: 3 }).map((_, i) => (
               <SkeletonCard key={i} />
            ))}
         </>
      )
   }



   return (
      <>
         {history.length === 0 ? (
            <p className="text-gray-600">Belum ada riwayat laporan.</p>
         ) : (
            history.map((item, i) => (
               <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-md bg-[#fff] mb-4 relative"
               >
                  {/* Tombol Hapus */}
                  <button
                     onClick={() => handleDelete(item.id)}
                     className="absolute top-4 right-4 bg-gray-200 text-black p-2 rounded-full shadow  transition"
                  >
                     <FaTrash size={14} />
                  </button>

                  {/* Foto */}
                  <div className="h-40 overflow-hidden p-2">
                     <img
                        src={`${configs.base_url_dev}${item.foto_url}`}
                        alt="foto laporan"
                        className="w-full h-full object-cover rounded-lg"
                     />
                  </div>

                  {/* Konten */}
                  <div className="p-4">
                     <h2 className="text-lg font-semibold text-black mb-1">
                        {item.jenisKerusakan?.jenis_kerusakan ||
                           item.tipe_kerusakan}
                     </h2>
                     <p className="text-sm text-gray-800 mb-4 line-clamp-3 text-justify">
                        {item.deskripsi}
                     </p>

                     {/* Lokasi dan Waktu */}
                     <div className="flex items-center text-sm text-black gap-2 mb-1">
                        <FaMapMarkerAlt className="text-base" />
                        <span>{item.location || '-'}</span>
                     </div>
                     <div className="flex items-center text-sm text-black gap-2">
                        <FaClock className="text-base" />
                        <span>
                           {new Date(item.waktu_laporan).toLocaleString('id-ID')}
                        </span>
                     </div>
                  </div>
               </div>
            ))
         )}
      </>
   )  
}

export default CardRiwayat