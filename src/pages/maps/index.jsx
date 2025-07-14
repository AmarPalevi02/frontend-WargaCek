import React from 'react'
import Navbar from '../../components/Navbar'
import PageLayout from '../../components/layout/PageLayout'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Maps = () => {
   return (
      <>
         <Navbar />
         <MapContainer
            className="w-full h-screen z-0"
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
               <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
               </Popup>
            </Marker>
         </MapContainer>
      </>
   )
}

export default Maps