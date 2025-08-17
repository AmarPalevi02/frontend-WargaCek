import L from 'leaflet'
import markerIcon from './marker-icon.png'
import markerShadow from './marker-shadow.png'
import markerRed from './marker-red.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})


export const redIcon = L.icon({
  iconUrl: markerRed,
  iconSize: [32, 32], // ukuran gambar
  iconAnchor: [16, 32], // titik anchor (tengah bawah)
  popupAnchor: [0, -32] // posisi popup relatif
});