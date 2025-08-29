import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaporan, resetFetchLaporan } from '../../redux/getLaporanMap/action';
import { configs } from '../../configs/config';
import { redIcon, markerDestination } from '../../assets/leaflet-icon';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import Navbar from '../../components/Navbar';
import { IoLocateSharp } from 'react-icons/io5';
import { IoIosArrowUp } from "react-icons/io";

// Marker lokasi pengguna
function LocationMarker({ position }) {
   return position === null ? null : (
      <Marker position={[position.lat, position.lng]}>
         <Popup>Lokasi Anda</Popup>
      </Marker>
   );
}

// Ambil reference map
function SetMapRef({ mapRef }) {
   const map = useMap();
   mapRef.current = map;
   return null;
}

const MapLaporan = () => {
   const dispatch = useDispatch();
   const { data, loading, error } = useSelector((state) => state.getLaporan);

   const [position, setPosition] = useState(null);
   const [destination, setDestination] = useState(null);
   const [routeControl, setRouteControl] = useState(null);
   const mapRef = useRef(null);
   const [showForm, setShowForm] = useState(false);

   // Ambil lokasi awal user
   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         (pos) => {
            const { latitude, longitude } = pos.coords;
            setPosition({ lat: latitude, lng: longitude });
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

   // Tombol locate
   const handleLocateClick = () => {
      const map = mapRef.current;
      if (!map) return;

      map.locate();
      map.on('locationfound', function (e) {
         setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
         map.flyTo(e.latlng, map.getZoom());
      });
   };

   // Submit tujuan (koordinat / alamat)
   const handleDestinationSubmit = async (e) => {
      e.preventDefault();
      const input = e.target.destination.value.trim();

      if (!input) {
         alert('Input tidak boleh kosong!');
         return;
      }

      // Kalau koordinat
      const coordMatch = input.match(/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/);
      if (coordMatch) {
         const [lat, lng] = input.split(',').map(Number);
         setDestination({ lat, lng });
         calculateRoute({ lat, lng });
         return;
      }

      // Kalau alamat → geocoding via Nominatim
      try {
         const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=1`
         );
         const data = await res.json();

         if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            setDestination({ lat, lng });
            calculateRoute({ lat, lng });
         } else {
            alert('Alamat tidak ditemukan. Coba lebih spesifik.');
         }
      } catch (err) {
         console.error('Geocoding error:', err);
         alert('Gagal mencari alamat.');
      }
   };

   // Hitung rute
   const calculateRoute = (dest) => {
      const map = mapRef.current;
      if (!map || !position || !dest) return;

      if (routeControl) {
         map.removeControl(routeControl);
      }

      const newRouteControl = L.Routing.control({
         waypoints: [
            L.latLng(position.lat, position.lng),
            L.latLng(dest.lat, dest.lng),
         ],
         router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
         }),
         lineOptions: {
            styles: [{ color: 'blue', opacity: 0.8, weight: 6 }],
         },
         routingOptions: {
            alternatives: true,
         },
         routeWhileDragging: true,
         showAlternatives: true,
         altLineOptions: {
            styles: [
               { color: 'black', opacity: 0.15, weight: 9 },
               { color: 'white', opacity: 0.8, weight: 6 },
               { color: 'green', opacity: 0.7, weight: 4 },
            ],
         },
         createMarker: () => null,
      }).addTo(map);

      // Saat rute ditemukan
      newRouteControl.on('routesfound', (e) => {
         console.log('Routes found:', e.routes);

         const mainRoute = e.routes[0];
         const coords = mainRoute.coordinates;

         // cek setiap laporan kerusakan
         let melewatiKerusakan = false;
         data.forEach(laporan => {
            const kerusakanLatLng = L.latLng(laporan.latitude, laporan.longitude);

            coords.forEach(coord => {
               const point = L.latLng(coord.lat, coord.lng);
               if (point.distanceTo(kerusakanLatLng) < 50) { 
                  melewatiKerusakan = true;
               }
            });
         });

         if (melewatiKerusakan) {
            alert("Rute utama melewati titik kerusakan. Silakan gunakan rute alternatif (garis hijau).");
         }
      });

      newRouteControl.on('routingerror', (err) => {
         console.error('Routing error:', err);
         alert('Gagal menghitung rute.');
      });

      setRouteControl(newRouteControl);
   };


   if (loading) return <div className="flex items-center justify-center h-screen">Loading data laporan...</div>;
   if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

   return (
      <div className="w-full h-screen">
         <Navbar />

         <div className="relative w-full max-w-lg mx-auto h-full">
            {/* tombol locate */}
            <button
               type="button"
               onClick={handleLocateClick}
               className="absolute z-[1000] bottom-56 right-6 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
               <IoLocateSharp className="text-2xl text-black" />
            </button>

            {/* form tujuan */}
            <button
               onClick={() => setShowForm(!showForm)}
               className={`absolute z-20 bottom-40 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition ${showForm ? "rotate-180 bottom-64" : ""}`}
            >
               <IoIosArrowUp
                  className={`text-2xl transition-transform `}
               />
            </button>

            <div
               className={`
    absolute z-[1000] left-6 right-6 bg-white p-4 rounded-md shadow-lg 
    transition-all duration-500 ease-in-out
    ${showForm ? "bottom-32 opacity-100 translate-y-0" : "-bottom-60 opacity-0 translate-y-10"}
  `}
            >
               <form onSubmit={handleDestinationSubmit}>
                  <input
                     name="destination"
                     placeholder="Masukkan tujuan (lat,lng / alamat)"
                     className="w-full border p-2 rounded-md"
                  />
                  <button
                     type="submit"
                     className="mt-2 w-full bg-blue-600 text-white p-2 rounded-md"
                  >
                     Hitung Rute
                  </button>
               </form>
            </div>


            <MapContainer
               className="w-full z-0 h-screen"
               center={{ lat: -7.2575, lng: 112.7521 }}
               zoom={13}
               scrollWheelZoom={false}
            >
               <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               />

               {/* marker laporan */}
               {data?.map((laporan) => (
                  <Marker
                     key={laporan.id}
                     position={[laporan.latitude, laporan.longitude]}
                     icon={redIcon}
                  >
                     <Popup>
                        <div>
                           <h3 className="font-bold">
                              {laporan.tipe_kerusakan || laporan.jenisKerusakan?.jenis_kerusakan}
                           </h3>
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

               {/* marker posisi user */}
               <SetMapRef mapRef={mapRef} />
               <LocationMarker position={position} />

               {/* marker tujuan */}
               {destination && (
                  <Marker
                     position={[destination.lat, destination.lng]}
                     icon={markerDestination}
                  >
                     <Popup>Tujuan Anda</Popup>
                  </Marker>
               )}
            </MapContainer>
         </div>
      </div>
   );
};

export default MapLaporan;
