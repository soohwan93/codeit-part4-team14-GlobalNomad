"use client";

import React, { useEffect, useState } from "react";

interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

const fetchReservations = async (): Promise<ApiResponse> => {
  // 실제 API 호출로 대체 필요
  return {
    cursorId: 0,
    reservations: [
      {
        id: 0,
        teamId: "string",
        userId: 0,
        activity: {
          bannerImageUrl: "/favicon.ico",
          title: "강아지 배우와 즐거운 스튜디오 댄스",
          id: 0,
        },
        scheduleId: 0,
        status: "pending",
        reviewSubmitted: true,
        totalPrice: 10000,
        headCount: 1,
        date: "2023-02-14",
        startTime: "11:00",
        endTime: "12:30",
        createdAt: "2024-05-23T04:34:57.301Z",
        updatedAt: "2024-05-23T04:34:57.301Z",
      },
      // 추가 데이터
    ],
    totalCount: 1,
  };
};

const Home: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const getReservations = async () => {
      const data = await fetchReservations();
      setReservations(data.reservations);
    };
    getReservations();
  }, []);

  const getStatusText = (status: string, endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);

    if (status === "confirmed" && now > end) {
      return "체험 완료";
    }

    switch (status) {
      case "pending":
        return "예약 완료";
      case "canceled":
        return "예약 취소";
      case "confirmed":
        return "예약 승인";
      case "declined":
        return "예약 거절";
      default:
        return "";
    }
  };

  const handleFilterChange = (filterType: string) => {
    setFilter(filterType);
    setDropdownOpen(false);
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "all") return true;
    if (filter === "completed")
      return (
        reservation.status === "confirmed" &&
        new Date(reservation.endTime) < new Date()
      );
    return reservation.status === filter;
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">예약 내역</h1>
        <div className="relative">
          <button
            className="bg-white w-[160px] h-[53px] p-2 rounded-lg border border-emerald-700"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            필터
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleFilterChange("all")}
              >
                전체 보기
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleFilterChange("pending")}
              >
                예약 완료
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleFilterChange("canceled")}
              >
                예약 취소
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleFilterChange("confirmed")}
              >
                예약 승인
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleFilterChange("declined")}
              >
                예약 거절
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleFilterChange("completed")}
              >
                체험 완료
              </a>
            </div>
          )}
        </div>
      </div>
      {filteredReservations.map((reservation, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-md bg-white p-4 mb-4 flex"
        >
          <img
            src={reservation.activity.bannerImageUrl}
            alt={reservation.activity.title}
            className="w-32 h-32 rounded-lg mr-4"
          />
          <div>
            <div className="text-sm font-bold text-blue-500 mb-2">
              {getStatusText(reservation.status, reservation.endTime)}
            </div>
            <h2 className="text-lg font-bold mb-3">
              {reservation.activity.title}
            </h2>
            <div className="text-gray-600 mb-4">
              {reservation.date} · {reservation.startTime} -{" "}
              {reservation.endTime} · {reservation.headCount}명
            </div>
            <div className="text-gray-800 font-bold">
              ₩{reservation.totalPrice.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
