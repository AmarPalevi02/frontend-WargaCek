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
            <div>
              <h3 className="font-bold">
                {laporan.tipe_kerusakan || laporan.jenisKerusakan?.jenis_kerusakan}
              </h3>
              <p>{laporan.deskripsi}</p>
              {laporan.foto_url && (
                <img
                  src={`${configs.base_url_dev}${laporan.foto_url}`}
                  alt="Foto kerusakan"
                  style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
                />
              )}
              <p>
                <strong>Pelapor:</strong> {laporan.username || "Unknown"}
              </p>
              <p>
                <strong>Waktu:</strong>{" "}
                {new Date(laporan.waktu_laporan).toLocaleString()}
              </p>
              {laporan.jarak && (
                <p>
                  <strong>Jarak:</strong> {laporan.jarak.toFixed(2)} km
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
