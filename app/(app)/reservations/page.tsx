"use client";
import React, { useEffect, useState, useCallback } from "react";
import FilterDropdown from "@/components/common/FilterDropdown";
import ReservationCanvanCard from "@/components/reservation/ReservationCanvanCard";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { getMyReservations } from "@/util/api"; // 내 예약 리스트 조회 API 함수 가져오기

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

const Home = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cursorId, setCursorId] = useState<number>(0);
  const { ref, inView } = useInView();

  const getReservations = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const query = { cursorId, size: 10 }; // 필요한 쿼리 파라미터 설정
      const data: ApiResponse = await getMyReservations(query);
      setReservations((prev) => [...prev, ...data.reservations]);
      setCursorId(data.cursorId);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, cursorId]);

  useEffect(() => {
    getReservations();
  }, [getReservations]);

  useEffect(() => {
    if (inView) {
      getReservations();
    }
  }, [inView, getReservations]);

  const getStatusText = (status: string, endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);

    if (status === "confirmed" && now > end) {
      return "체험 완료";
    }

    switch (status) {
      case "pending":
        return "예약 신청";
      case "canceled":
        return "예약 취소";
      case "confirmed":
        return "예약 승인";
      case "declined":
        return "예약 거절";
      case "completed":
        return "체험 완료";
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
    if (filter === "completed") return reservation.status === "completed";
    return reservation.status === filter;
  });

  const filterOptions = [
    { label: "전체 보기", value: "all" },
    { label: "예약 신청", value: "pending" },
    { label: "예약 취소", value: "canceled" },
    { label: "예약 승인", value: "confirmed" },
    { label: "예약 거절", value: "declined" },
    { label: "체험 완료", value: "completed" },
  ];

  return (
    <div className="min-h-screen py-4" style={{ padding: "30px 15%" }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">예약 내역</h1>
        <FilterDropdown
          filterOptions={filterOptions}
          selectedFilter={filter}
          onFilterChange={handleFilterChange}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
        />
      </div>
      {filteredReservations.length > 0 ? (
        filteredReservations.map((reservation, index) => (
          <ReservationCanvanCard
            key={index}
            reservation={reservation}
            getStatusText={getStatusText}
          />
        ))
      ) : (
        <div className="mx-auto mt-20 flex w-fit flex-col items-center">
          <Image
            src="/icons/no-result.svg"
            width={130}
            height={177}
            alt="아직 등록된 예약이 없습니다."
          />
          <span className="mt-10 inline-block text-xl font-medium text-gray-70 md:text-2xl">
            아직 등록된 예약이 없어요.
          </span>
        </div>
      )}
      <div ref={ref} className="h-1"></div>
      {loading && <div className="text-center">로딩 중...</div>}
    </div>
  );
};

export default Home;
