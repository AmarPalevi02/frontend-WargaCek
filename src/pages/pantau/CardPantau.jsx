import React, { useEffect } from "react";
import SkeletonCard from "../../components/SkeletonCard";

import {
  FaClock,
  FaMapMarkerAlt,
  FaRegThumbsDown,
  FaThumbsUp,
  FaUser,
  FaUsers,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTools,
  FaFlagCheckered,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLaporanVote,
  resetFetchLaporanVote,
} from "../../redux/getlaporanbyvote/action";
import { voteLaporan } from "../../redux/vote/action";
import { configs } from "../../configs/config";

const CardPantau = () => {
  const dispatch = useDispatch();
  const { data, radius, loading } = useSelector((state) => state.laporanbyVote);
  const { voting } = useSelector((state) => state.voteLaporan);

  // Fungsi untuk mendapatkan warna dan icon berdasarkan status
  const getStatusInfo = (status) => {
    switch (status) {
      case "PENDING":
        return {
          color: "bg-red-100 text-red-800 border-red-300",
          icon: FaExclamationTriangle,
          text: "Menunggu Validasi",
          textColor: "text-red-600",
        };
      case "VALIDATED":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-300",
          icon: FaCheckCircle,
          text: "Tervalidasi",
          textColor: "text-yellow-600",
        };
      case "IN_PROGRESS":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-300",
          icon: FaTools,
          text: "Dalam Penanganan",
          textColor: "text-blue-600",
        };
      case "DONE":
        return {
          color: "bg-green-100 text-green-800 border-green-300",
          icon: FaFlagCheckered,
          text: "Selesai",
          textColor: "text-green-600",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-300",
          icon: FaExclamationTriangle,
          text: "Menunggu Validasi",
          textColor: "text-gray-600",
        };
    }
  };

  // Komponen Status Badge
  const StatusBadge = ({ status, dinas }) => {
    const statusInfo = getStatusInfo(status);
    const StatusIcon = statusInfo.icon;

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusInfo.color} text-xs font-medium`}
      >
        <StatusIcon className="text-xs" />
        <span>{statusInfo.text}</span>
        {dinas && <span className="ml-1 text-xs opacity-80">• {dinas}</span>}
      </div>
    );
  };

  // Format tanggal untuk status update
  const formatStatusDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Hari ini";
    if (diffDays === 2) return "Kemarin";
    if (diffDays <= 7) return `${diffDays - 1} hari lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          fetchLaporanVote({
            userLat: latitude,
            userLng: longitude,
            radius: radius,
          })
        );
      },
      () => {
        dispatch(fetchLaporanVote());
      }
    );

    return () => {
      dispatch(resetFetchLaporanVote());
    };
  }, [dispatch]);

  if (loading) {
    return Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />);
  }

  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="text-center text-gray-600 py-8">
        🚧 Lokasi sekitarmu tidak ada kerusakan
      </div>
    );
  }

  return (
    <>
      {data?.map((laporan, i) => (
        <div
          key={i}
          className="bg-[#fff] rounded-xl overflow-hidden shadow-md mb-4 max-w-md mx-auto"
        >
          <div className="h-40 w-full overflow-hidden p-2">
            {laporan.foto_url && (
              <img
                src={`${configs.base_url_dev}${laporan.foto_url}`}
                alt="Foto kerusakan"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          <div className="p-4">
            {/* Header dengan status */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-black mb-1 flex-1">
                {laporan.tipe_kerusakan}
              </h2>
              <StatusBadge
                status={laporan.status || "PENDING"}
                dinas={laporan.dinas}
              />
            </div>

            {/* Info update status */}
            {(laporan.statusUpdatedAt || laporan.dinas) && (
              <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                {laporan.statusUpdatedAt && (
                  <span>
                    Diupdate {formatStatusDate(laporan.statusUpdatedAt)}
                  </span>
                )}
                {laporan.statusUpdatedAt && laporan.dinas && <span>•</span>}
                {laporan.dinas && (
                  <span className="font-medium">Ditangani {laporan.dinas}</span>
                )}
              </div>
            )}

            <p className="text-sm text-gray-800 mb-4 line-clamp-3 text-justify">
              {laporan.deskripsi}
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm text-black mb-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span className="line-clamp-3">{laporan.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers />
                <span>{laporan.likeCount || 0} orang setuju</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegThumbsDown className="text-red-500" />
                <span>{laporan.dislikeCount || 0} orang tidak setuju</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{new Date(laporan.waktu_laporan).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <FaUser />
                <span>
                  Oleh @{laporan.User?.username || laporan.username || "Anonim"}
                </span>
              </div>
            </div>

            {/* Progress bar untuk status (opsional) */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Status Penanganan</span>
                <span>{getStatusInfo(laporan.status || "PENDING").text}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    laporan.status === "PENDING"
                      ? "bg-red-500 w-1/4"
                      : laporan.status === "VALIDATED"
                      ? "bg-yellow-500 w-2/4"
                      : laporan.status === "IN_PROGRESS"
                      ? "bg-blue-500 w-3/4"
                      : laporan.status === "DONE"
                      ? "bg-green-500 w-full"
                      : "bg-gray-500 w-1/4"
                  }`}
                />
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3 flex-wrap justify-evenly">
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm 
                        ${
                          laporan.userVote === "LIKE"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                disabled={voting || laporan.userVote === "LIKE"}
                onClick={() => dispatch(voteLaporan(laporan.id, "LIKE"))}
              >
                <FaThumbsUp className="text-base sm:text-lg md:text-xl hidden sm:inline" />
                Saya melihat ini
              </button>

              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm 
                        ${
                          laporan.userVote === "DISLIKE"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                disabled={voting || laporan.userVote === "DISLIKE"}
                onClick={() => dispatch(voteLaporan(laporan.id, "DISLIKE"))}
              >
                <FaRegThumbsDown className="text-base sm:text-lg md:text-xl hidden sm:inline" />
                Tidak melihat ini
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardPantau;