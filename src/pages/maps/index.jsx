import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { IoLocateSharp } from "react-icons/io5";
import 'leaflet/dist/leaflet.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLaporan, resetFetchLaporan } from '../../redux/getLaporanMap/action';
import { configs } from '../../configs/config';
import { redIcon } from '../../assets/leaflet-icon';


// Komponen untuk marker lokasi pengguna
function LocationMarker({ position }) {
   return position === null ? null : (
      <Marker position={position}>
         <Popup>Lokasi Anda</Popup>
      </Marker>
   );
}

// Komponen untuk mengambil dan menyimpan referensi peta
function SetMapRef({ mapRef }) {
   const map = useMap();
   mapRef.current = map;
   return null;
}

const MapLaporan = () => {
   const dispatch = useDispatch();
   const { data, loading, error } = useSelector((state) => state.getLaporan);


   const [position, setPosition] = useState(null)
   const mapRef = useRef(null)

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(fetchLaporan({ userLat: latitude, userLng: longitude, radius: 5 }));
         },
         () => {
            dispatch(fetchLaporan());
         }
      );

      return () => {
         dispatch(resetFetchLaporan());
      };
   }, [dispatch]);

   const handleLocateClick = () => {
      const map = mapRef.current;
      if (!map) return;

      map.locate();
      map.on("locationfound", function (e) {
         setPosition(e.latlng);
         map.flyTo(e.latlng, map.getZoom());
      });
   };

   return (
      <div className='w-full h-screen '>
         <Navbar />

         {loading ? (
            <div className="flex items-center justify-center h-screen">
               Loading data laporan...
            </div>
         ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
         ) : (
            <div className="relative w-full max-w-lg mx-auto h-full">
               <button
                  onClick={handleLocateClick}
                  className='absolute z-[1000] bottom-56 right-6 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition'
               >
                  <IoLocateSharp className='text-2xl text-black' />
               </button>

               <MapContainer
                  className=" w-full z-0 h-screen"
                  center={{ lat: -7.2575, lng: 112.7521 }}
                  zoom={13}
                  scrollWheelZoom={false}
               >
                  <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {data?.map((laporan) => (
                     <Marker
                        key={laporan.id}
                        position={[laporan.latitude, laporan.longitude]}
                        icon={redIcon}
                     >
                        <Popup>
                           <div>
                              <h3 className="font-bold">{laporan.tipe_kerusakan || laporan.jenisKerusakan?.jenis_kerusakan}</h3>
                              <p>{laporan.deskripsi}</p>
                              {laporan.foto_url && (
                                 <img
                                    src={`${configs.base_url_dev}${laporan.foto_url}`}
                                    alt="Foto kerusakan"
                                    style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                                 />
                              )}
                              <p><strong>Pelapor:</strong> {laporan.username || 'Unknown'}</p>
                              <p><strong>Waktu:</strong> {new Date(laporan.waktu_laporan).toLocaleString()}</p>
                              {laporan.jarak && (
                                 <p><strong>Jarak:</strong> {laporan.jarak.toFixed(2)} km</p>
                              )}
                           </div>
                        </Popup>
                     </Marker>
                  ))}
                  <SetMapRef mapRef={mapRef} />
                  <LocationMarker position={position} />
               </MapContainer>
            </div>
         )}

      </div>
   );
};

export default MapLaporan;