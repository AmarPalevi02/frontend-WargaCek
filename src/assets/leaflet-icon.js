import L from 'leaflet'
import markerIcon from './marker-icon.png'
import markerShadow from './marker-shadow.png'

L.Icon.Default.mergeOptions({
   iconRetinaUrl: markerIcon,
   iconUrl: markerIcon,
   shadowUrl: markerShadow,
 })
 