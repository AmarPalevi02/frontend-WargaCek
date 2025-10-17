import { Marker, Popup } from "react-leaflet";
import { configs } from "../../configs/config";
import { redIcon } from "../../assets/leaflet-icon";

export default function LaporanMarkers({ data }) {
  return (
    <>
      {data?.map((laporan) => (
        <Marker
          key={laporan.id}
          position={[laporan.latitude, laporan.longitude]}
          icon={redIcon}
        >
          <Popup>
            <div className="w-64 rounded-lg bg-white shadow-md overflow-hidden">
              {laporan.foto_url && (
                <img
                  src={`${configs.base_url_dev}${laporan.foto_url}`}
                  alt="Foto kerusakan"
                  className="w-full h-32 object-cover"
                />
              )}

              {/* Konten */}
              <div className="p-3 text-sm space-y-2">
                <h3 className="font-semibold text-gray-800 text-base">
                  {laporan.tipe_kerusakan ||
                    laporan.jenisKerusakan?.jenis_kerusakan}
                </h3>

               
                <p className="text-gray-600 text-justify leading-7 line-clamp-3">{laporan.deskripsi}</p>

                <p className="text-gray-700">
                  <span className="font-medium">👤 Pelapor:</span>{" "}
                  {laporan.username || "Unknown"}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">🕒 Waktu:</span>{" "}
                  {new Date(laporan.waktu_laporan).toLocaleString()}
                </p>

                {laporan.jarak && (
                  <p className="text-gray-700">
                    <span className="font-medium">📍 Jarak:</span>{" "}
                    {laporan.jarak.toFixed(2)} km
                  </p>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
