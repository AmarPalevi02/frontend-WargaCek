import React, { useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from 'react-leaflet'

const LocationMarker = ({ onLocationChange }) => {
   const [position, setPosition] = useState(null)
   const markerRef = useRef(null)

   useMapEvents({
      click(map) {
         map.locate()
      },
      locationfound(e) {
         setPosition(e.latlng)
         const { lat, lng } = e.latlng
         onLocationChange?.({ lat, lng })
      },
   })

   const handleDragEnd = () => {
      const marker = markerRef.current
      if (marker != null) {
         const newPos = marker.getLatLng()
         setPosition(newPos)
         onLocationChange?.({ lat: newPos.lat, lng: newPos.lng })
      }
   }

   return position ? (
      <Marker
         position={position}
         draggable={true}
         eventHandlers={{ dragend: handleDragEnd }}
         ref={markerRef}
      >
         <Popup>Detail informasi</Popup>
      </Marker>
   ) : null
}

const LocationMarkerUser = ({
   initialCenter = { lat: -7.3170944, lng: 112.7317504 },
   zoom = 13,
   className = 'w-full h-96',
   onLocationChange,
}) => {
   return (
      <MapContainer
         center={initialCenter}
         zoom={zoom}
         scrollWheelZoom={false}
         className={className}
      >
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <LocationMarker onLocationChange={onLocationChange} />
      </MapContainer>
   )
}

export default LocationMarkerUser