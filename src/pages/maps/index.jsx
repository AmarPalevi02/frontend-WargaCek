import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

function LocationMarker() {
   const [position, setPosition] = useState(null)
   const map = useMapEvents({
      click() {
         map.locate()
      },
      locationfound(e) {
         setPosition(e.latlng)
         map.flyTo(e.latlng, map.getZoom())
      },
   })

   return position === null ? null : (
      <Marker position={position}>
         <Popup>You are here</Popup>
      </Marker>
   )
}


const Maps = () => {
   return (
      <div className='w-full  h-screen flex justify-center '>
         <Navbar />
         <MapContainer
            className="max-w-lg w-full z-0"
            center={{ lat: 51.505, lng: -0.09 }}
            zoom={13}
            scrollWheelZoom={false}>

            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
         </MapContainer>
      </div>
   )
}

export default Maps