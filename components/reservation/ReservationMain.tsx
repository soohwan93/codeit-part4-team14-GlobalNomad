"use client";
import React, { useEffect, useState, useCallback } from "react";
import FilterDropdown from "@/components/common/FilterDropdown";
import ReservationCanvanCard from "@/components/reservation/ReservationCanvanCard";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { getMyReservations } from "@/util/api"; // 내 예약 리스트 조회 API 함수 가져오기
import { ApiResponse } from "@/app/(app)/reservations/page";
import ActivityManagementWrapper from "../activity-management/ActivityManagementWrapper";

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

const ReservationMain = ({
  cursorId: initialCursorId,
  reservations: initialReservations,
  totalCount,
}: ApiResponse) => {
  const [reservations, setReservations] =
    useState<Reservation[]>(initialReservations);
  const [filter, setFilter] = useState<string>("all");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cursorId, setCursorId] = useState<number | null>(initialCursorId);
  const { ref, inView } = useInView();

  const getReservations = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const query = { cursorId: cursorId, size: 5 }; // 필요한 쿼리 파라미터 설정
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
    if (inView && !loading && totalCount > 5 && cursorId) {
      getReservations();
    }
  }, [inView, getReservations, totalCount, cursorId, loading]);

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
    console.log("filtered");
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
    <ActivityManagementWrapper>
      <div className="mt-1 flex items-center justify-between pb-6">
        <h1 className="text-[32px] font-bold">예약 내역</h1>
        <FilterDropdown
          filterOptions={filterOptions}
          selectedFilter={filter}
          onFilterChange={handleFilterChange}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
        />
      </div>
      {filteredReservations.length > 0 ? (
        filteredReservations.map((reservation) => (
          <ReservationCanvanCard
            key={reservation.id}
            reservation={reservation}
            setReservations={setReservations}
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
      {loading && (
        <div className="flex h-32 w-full items-center justify-center space-x-2 bg-gray-10 dark:invert md:h-52">
          <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black"></div>
        </div>
      )}
      <div ref={ref} className="h-1"></div>
    </ActivityManagementWrapper>
  );
};

export default ReservationMain;
