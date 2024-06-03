interface ReservationListCardProps {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: "pending" | "confirmed" | "completed" | "declined" | "canceled";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

const RESERVATION_DATA: ReservationListCardProps[] = [
  {
    id: 0,
    teamId: "string",
    userId: 0,
    activity: {
      bannerImageUrl: "/images/함께 배우면 즐거운 스트릿 댄스.png",
      title: "string",
      id: 0,
    },
    scheduleId: 0,
    status: "pending",
    reviewSubmitted: true,
    totalPrice: 0,
    headCount: 0,
    date: "string",
    startTime: "string",
    endTime: "string",
    createdAt: "2024-06-03T07:13:48.836Z",
    updatedAt: "2024-06-03T07:13:48.836Z",
  },
  {
    id: 1,
    teamId: "string",
    userId: 0,
    activity: {
      bannerImageUrl: "/images/함께 배우면 즐거운 스트릿 댄스.png",
      title: "string",
      id: 0,
    },
    scheduleId: 0,
    status: "confirmed",
    reviewSubmitted: true,
    totalPrice: 0,
    headCount: 0,
    date: "string",
    startTime: "string",
    endTime: "string",
    createdAt: "2024-06-03T07:13:48.836Z",
    updatedAt: "2024-06-03T07:13:48.836Z",
  },
  {
    id: 2,
    teamId: "string",
    userId: 0,
    activity: {
      bannerImageUrl: "/images/함께 배우면 즐거운 스트릿 댄스.png",
      title: "string",
      id: 0,
    },
    scheduleId: 0,
    status: "completed",
    reviewSubmitted: true,
    totalPrice: 0,
    headCount: 0,
    date: "string",
    startTime: "string",
    endTime: "string",
    createdAt: "2024-06-03T07:13:48.836Z",
    updatedAt: "2024-06-03T07:13:48.836Z",
  },
  {
    id: 3,
    teamId: "string",
    userId: 0,
    activity: {
      bannerImageUrl: "/images/함께 배우면 즐거운 스트릿 댄스.png",
      title: "string",
      id: 0,
    },
    scheduleId: 0,
    status: "completed",
    reviewSubmitted: false,
    totalPrice: 0,
    headCount: 0,
    date: "string",
    startTime: "string",
    endTime: "string",
    createdAt: "2024-06-03T07:13:48.836Z",
    updatedAt: "2024-06-03T07:13:48.836Z",
  },
  {
    id: 4,
    teamId: "string",
    userId: 0,
    activity: {
      bannerImageUrl: "/images/함께 배우면 즐거운 스트릿 댄스.png",
      title: "string",
      id: 0,
    },
    scheduleId: 0,
    status: "declined",
    reviewSubmitted: true,
    totalPrice: 0,
    headCount: 0,
    date: "string",
    startTime: "string",
    endTime: "string",
    createdAt: "2024-06-03T07:13:48.836Z",
    updatedAt: "2024-06-03T07:13:48.836Z",
  },
  {
    id: 5,
    teamId: "string",
    userId: 0,
    activity: {
      bannerImageUrl: "/images/함께 배우면 즐거운 스트릿 댄스.png",
      title: "string",
      id: 0,
    },
    scheduleId: 0,
    status: "canceled",
    reviewSubmitted: true,
    totalPrice: 0,
    headCount: 0,
    date: "string",
    startTime: "string",
    endTime: "string",
    createdAt: "2024-06-03T07:13:48.836Z",
    updatedAt: "2024-06-03T07:13:48.836Z",
  },
];
export default RESERVATION_DATA;
