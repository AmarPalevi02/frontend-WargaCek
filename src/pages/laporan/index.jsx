import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PageLayout from '../../components/layout/PageLayout';
import Navbar from '../../components/Navbar';
import DamageTypeDropdown from './DamageTypeDropdown';
import LocationMarkerUser from './LocationMarkerUser';
import Button from '../../components/ui/Button';
import { fetchingJenisKejadian } from '../../redux/getJenisKerusakan/action';
import { postLaporan, resetPostLaporan } from '../../redux/postLaporan/action';

const Laporan = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { data } = useSelector((state) => state.jenisKerusakan);
   const { loading, error, success } = useSelector((state) => state.laporan);
   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState(null);
   const [position, setPosition] = useState(null);
   const { id: userId } = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : {};

   useEffect(() => {
      dispatch(fetchingJenisKejadian());
   }, [dispatch]);

   useEffect(() => {
      if (position) {
         setValue('latitude', position.lat, { shouldValidate: true });
         setValue('longitude', position.lng, { shouldValidate: true });
      }
   }, [position, setValue]);

   useEffect(() => {
      if (success) {
         navigate('/maps');
         dispatch(resetPostLaporan());
      }
      if (error) {
         alert(`Error: ${error}`);
         dispatch(resetPostLaporan());
      }
   }, [success, error, navigate, dispatch]);

   const onSubmit = (data) => {
      if (!selected) {
         setValue('jenis_kerusakan', '', { shouldValidate: true });
         return;
      }

      dispatch(postLaporan({
         tipe_kerusakan: selected.jenis_kerusakan,
         deskripsi: data.description,
         longitude: data.longitude,
         latitude: data.latitude,
         image: data.image[0],
         userId,
      }));
   };

   return (
      <PageLayout>
         <Navbar />
         <div className="pt-5">
            <div>
               <h1 className="text-xl font-semibold">Laporkan Kondisi Sekitarmu</h1>
               <p className="text-justify mt-5 leading-7">
                  Bantu sesama warga dengan mengunggah laporan tentang kerusakan jalan, banjir, atau gangguan lainnya. Satu laporanmu bisa berdampak besar.
               </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
               <input
                  type="hidden"
                  {...register('jenis_kerusakan', { required: 'Jenis kerusakan wajib dipilih' })}
               />
               <DamageTypeDropdown
                  data={data?.data || []}
                  selected={selected}
                  setSelected={(item) => {
                     setSelected(item);
                     setValue('jenis_kerusakan', item?.jenis_kerusakan || '', { shouldValidate: true });
                  }}
                  open={open}
                  setOpen={setOpen}
               />
               {errors.jenis_kerusakan && (
                  <p className="text-red-500 text-sm mt-1">{errors.jenis_kerusakan.message}</p>
               )}

               <div className="mt-5">
                  <label htmlFor="description" className="block font-medium mb-2">
                     Deskripsi Kerusakan
                  </label>
                  <textarea
                     id="description"
                     {...register('description', { required: 'Deskripsi wajib diisi' })}
                     className="w-full border border-gray-300 p-3 rounded-md"
                     rows={5}
                     placeholder="Tuliskan deskripsi kerusakan yang Anda temui..."
                  />
                  {errors.description && (
                     <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
               </div>

               <div className="mt-5">
                  <label htmlFor="image" className="block font-medium mb-2">
                     Foto Kerusakan
                  </label>
                  <input
                     type="file"
                     id="image"
                     accept="image/*"
                     capture="environment"
                     {...register('image', { required: 'Foto wajib diunggah' })}
                     className="block w-full text-sm text-gray-700"
                  />
                  {errors.image && (
                     <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                  )}
               </div>

               <input
                  type="hidden"
                  {...register('latitude', { required: 'Lokasi wajib ditentukan' })}
               />
               <input
                  type="hidden"
                  {...register('longitude', { required: 'Lokasi wajib ditentukan' })}
               />
               <LocationMarkerUser position={position} setPosition={setPosition} />
               {errors.latitude && (
                  <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
               )}

               <div className="pt-4">
                  <Button
                     type="submit"
                     variant="success"
                     className="w-full"
                     disabled={loading}
                  >
                     {loading ? 'Mengirim...' : 'Kirim Laporan'}
                  </Button>
               </div>
            </form>
         </div>
      </PageLayout>
   );
};

export default Laporan;