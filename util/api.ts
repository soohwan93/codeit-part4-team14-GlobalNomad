import { auth } from "@/auth";
import {
  ActivityImagesBody,
  ActivityQuerys,
  ActivityReservationBody,
  ActivityReviewsQuery,
  AvailableScheduleQuery,
  FetchMethod,
  LoginBody,
  MyActivitiesQuery,
  MyActivityBody,
  MyNotificationsQuery,
  MyReservationBody,
  MyReservationReviewBody,
  MyReservationsQuery,
  PatchUserBody,
  PostActivityBody,
  PostUserBody,
  ReservationBody,
  ReservationDashBoardQuery,
  ReservationsQuery,
  ReservedScheduleQuery,
  UserImageUrlBody,
} from "./apiType";

import { convertQuery } from "./querySetting";
import { fetcher } from "./actions";

// 기본 url
export const BASE_URL = "https://sp-globalnomad-api.vercel.app/4-14";

/** Activities
 * 체험 리스트 조회
 * 체험 등록
 * 체험 상세 조회
 * 체험 예약 가능일 조회
 * 체험 리뷰 조회
 * 체험 예약 신청
 * 체험 이미지 url 생성
 */

// 체험 리스트 조회
export function getActivities(query: ActivityQuerys) {
  const q = convertQuery(query);
  return fetcher(`/activities${q}`, "GET");
}

// 체험 등록
export function postActivity(body: PostActivityBody) {
  return fetcher(`/activities`, "POST", body);
}

// 체험 상세 조회
export function getActivityById(activityId: number) {
  return fetcher(`/activities/${activityId}`, "GET");
}

// 체험 예약 가능일 조회
export function getActivityAvailableSchedule(
  activityId: number,
  query: AvailableScheduleQuery,
) {
  const q = convertQuery(query);
  return fetcher(`/activities/${activityId}/available-schedule${q}`, "GET");
}

// 체험 리뷰 조회
export function getActivityReviews(
  activityId: number,
  query: ActivityReviewsQuery,
) {
  const q = convertQuery(query);
  return fetcher(`/activities/${activityId}/reviews${q}`, "GET");
}

// 체험 예약 신청
export function postActivityReservation(
  activityId: number,
  body: ActivityReservationBody,
) {
  return fetcher(`/activities/${activityId}/reservations`, "POST", body);
}

// 체험 이미지 url 생성
export function postActivityImages(formData: FormData) {
  return fetcher(`/activities/image`, "POST", formData);
}

/** Auth
 * 로그인
 */

// 로그인
export async function postLogin(body: LoginBody) {
  return fetcher(`/auth/login`, "POST", body);
}

/** MyActivities
 * 내 체험 리스트 조회
 * 내 체험 월별 예약 현황 조회
 * 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
 * 내 체험 예약 시간대별 예약 내역 조회
 * 내 체험 예약 상태(승인, 거절) 업데이트
 * 내 체험 삭제
 * 내 체험 수정
 */

// 내 체험 리스트 조회
export function getMyActivities(query?: MyActivitiesQuery) {
  const q = query ? convertQuery(query) : "";
  return fetcher(`/my-activities${q}`, "GET");
}

// 내 체험 월별 예약 현황 조회
export function getMyActivityReservationDashBoard(
  activityId: number,
  query: ReservationDashBoardQuery,
) {
  const q = convertQuery(query);
  return fetcher(
    `/my-activities/${activityId}/reservation-dashboard${q}`,
    "GET",
  );
}

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
export function getMyActivityReservedSchedule(
  activityId: number,
  query: ReservedScheduleQuery,
) {
  const q = convertQuery(query);
  return fetcher(`/my-activities/${activityId}/reserved-schedule${q}`, "GET");
}

// 내 체험 예약 시간대별 예약 내역 조회
export function getMyActivityReservations(
  activityId: number,
  query: ReservationsQuery,
) {
  const q = convertQuery(query);
  return fetcher(`/my-activities/${activityId}/reservations${q}`, "GET");
}

// 내 체험 예약 상태(승인, 거절) 업데이트
export function patchMyActivityReservation(
  activityId: number,
  reservationId: number,
  body: ReservationBody,
) {
  return fetcher(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    "PATCH",
    body,
  );
}

// 내 체험 삭제
export function deleteMyActivity(activityId: number) {
  return fetcher(`/my-activities/${activityId}`, "DELETE");
}

// 내 체험 수정
export function patchMyActivity(activityId: number, body: MyActivityBody) {
  return fetcher(`/my-activities/${activityId}`, "PATCH", body);
}

/** MyNotifications
 * 내 알림 리스트 조회
 * 내 알림 삭제
 */

// 내 알림 리스트 조회
export function getMyNotifications(
  query: MyNotificationsQuery,
  token?: string,
) {
  const q = convertQuery(query);
  return fetcher(`/my-notifications${q}`, "GET", null, token);
}

// 내 알림 삭제
export function deleteMyNotification(notificationId: number) {
  return fetcher(`/my-notifications/${notificationId}`, "DELETE");
}

/** MyReservations
 * 내 예약 리스트 조회
 * 내 예약 수정 (취소)
 * 내 예약 리뷰 작성
 */

// 내 예약 리스트 조회
export function getMyReservations(query: MyReservationsQuery) {
  const q = convertQuery(query);
  return fetcher(`/my-reservations${q}`, "GET");
}

// 내 예약 수정 (취소)
export function patchMyReservation(
  reservationId: number,
  body: MyReservationBody,
) {
  return fetcher(`/my-reservations/${reservationId}`, "PATCH", body);
}

// 내 예약 리뷰 작성
export function postMyReservationReview(
  reservationId: number,
  body: MyReservationReviewBody,
) {
  return fetcher(`/my-reservations/${reservationId}/reviews`, "POST", body);
}

/** Users
 * 회원가입
 * 내 정보 조회
 * 내 정보 수정
 * 프로필 이미지 url 작성
 */

// 회원가입
export function postUser(body: PostUserBody) {
  return fetcher(`/users`, "POST", body);
}

// 내 정보 조회
export function getUser() {
  return fetcher(`/users/me`, "GET");
}

// 내 정보 수정
export function patchUser(body: PatchUserBody) {
  return fetcher(`/users/me`, "PATCH", body);
}

// 프로필 이미지 url 작성
export function postUserImageUrl(formData: FormData) {
  return fetcher(`/users/me/image`, "POST", formData);
}
