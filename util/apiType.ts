// fetch 요청 타입
export type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// 정렬 쿼리 타입
export type SortQuery = "most_reviewed" | "price_asc" | "price_desc" | "latest";

// 카테고리 쿼리 타입
export type CategoryQuery =
  | "문화 · 예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙";

// method 쿼리 타입
export type MethodQuery = "offset" | "cursor";

// 예약 상태 타입
export type ReservationsStatus = "declined" | "pending" | "confirmed";

// 스케줄 타입
export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

// 체험 리뷰 쿼리 타입
export interface ActivityReviewsQuery {
  [key: string]: number;
  page: number;
  size: number;
}

// 체험 예약 가능일 조회 쿼리 타입
export interface AvailableScheduleQuery {
  [key: string]: number;
  year: number;
  month: number;
}

// 내 체험 리스트 조회 쿼리 타입
export interface MyActivitiesQuery {
  [key: string]: number;
  cursorId: number;
  size: number;
}

// 내 체험 리스트 조회 쿼리 타입
export interface ReservationDashBoardQuery extends AvailableScheduleQuery {}

// 내 체험 리스트 조회 쿼리 타입
export interface ReservedScheduleQuery {
  [key: string]: string;
  date: string;
}

// 내 체험 리스트 조회 쿼리 타입
export interface ReservationsQuery {
  [key: string]: string | undefined | number | ReservationsStatus;
  cursorId?: string;
  size?: string;
  scheduleId: number;
  status: ReservationsStatus;
}

// 내 알림 리스트 조회 쿼리 타입
export interface MyNotificationsQuery extends MyActivitiesQuery {}

// 내 예약 리스트 조회 쿼리 타입
export interface MyReservationsQuery extends MyActivitiesQuery {}

// 체험 등록 body 타입
export interface PostActivityBody {
  title: string; // required
  category: string; // required
  description: string; // required
  address: string; // required
  price: number; // required
  schedules: Schedule[];
  bannerImageUrl?: string;
  subImageUrls?: string[];
}

// 회원가입 body 타입
export interface ActivityQuerys {
  [key: string]: number | string | MethodQuery | CategoryQuery | undefined;
  method: MethodQuery; // required
  cursorId?: number;
  category?: CategoryQuery;
  keyword?: string;
  sort?: SortQuery;
  page?: number; //default value: 1
  size?: number; //default value: 20
}

// 체험 예약 신청 body 타입
export interface ActivityReservationBody {
  scheduleId: number;
  headCount: number;
}

// 체험 이미지 url 생성 body 타입
export interface ActivityImagesBody {
  image: string;
}

// 프로필 이미지 url 생성 body 타입
export interface UserImageUrlBody extends ActivityImagesBody {}

// 회원가입 body 타입
export interface PostUserBody {
  email: string;
  nickname: string;
  password: string;
}

// 내 정보 수정 body 타입
export interface PatchUserBody {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}

// 로그인 body 타입
export interface LoginBody {
  email: string;
  password: string;
}

// 내 체험 예약 상태 body 타입
export interface ReservationBody {
  status: ReservationsStatus;
}

// 내 체험 수정 body 타입
export interface MyActivityBody {
  title: string; // required
  category: string; // required
  description: string; // required
  address: string; // required
  price: number; // required
  schedules: Schedule[];
  bannerImageUrl?: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: Schedule[];
}

// 내 예약 수정 (취소) body 타입
export interface MyReservationBody {
  status: "canceled";
}

// 내 예약 리뷰 작성 body 타입
export interface MyReservationReviewBody {
  rating: number;
  content: string;
}
