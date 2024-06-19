import { ScheduleType } from "@/components/activity-management/create/ReservationTimeInputs";
import badWords from "@/public/data/badwords.json";
import {
  CalendarDate,
  getLocalTimeZone,
  now,
  ZonedDateTime,
} from "@internationalized/date";
import { PostActivityBody } from "./apiType";
import { ERROR_MESSAGE } from "./constraints";

interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const validateEmail = (value: string): ValidationResult => {
  const emailRegex =
    /^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/;
  const isValid = emailRegex.test(value);
  const error = isValid ? "" : "잘못된 이메일 형식입니다.";
  return { isValid, error };
};

export const validateNickname = (value: string): ValidationResult => {
  if (value.trim() === "") {
    return { isValid: false, error: "닉네임을 입력해 주세요." };
  }

  const containsBadWord = badWords.some((word) => value.includes(word));
  if (containsBadWord) {
    return { isValid: false, error: "사용할 수 없는 닉네임입니다." };
  }

  const isValid = value.length <= 10;
  const error = isValid ? "" : "열 자 이하로 작성해주세요.";
  return { isValid, error };
};

export const validatePassword = (value: string): ValidationResult => {
  const isValid =
    value.length >= 8 && /[A-Z]/.test(value) && /[!@#$%^&*]/.test(value);
  const error = isValid
    ? ""
    : "8자 이상 특수문자, 대문자 1개가 포함되어야 합니다";
  return { isValid, error };
};

export const loginValidatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: "비밀번호를 입력해 주세요." };
  } else if (password.length < 8) {
    return { isValid: false, error: "8자 이상 작성해 주세요." };
  }
  return { isValid: true, error: "" };
};

export const addScheduleValidation = (
  date: CalendarDate,
  startTime: ZonedDateTime,
  endTime: ZonedDateTime,
  schedules: ScheduleType[],
) => {
  //보여질 메시지
  let message = "";

  //현재 시간
  const nowDate = now(getLocalTimeZone());
  console.log(nowDate);
  console.log(date);
  //시간 차
  const timediff =
    endTime.hour * 60 -
    startTime.hour * 60 +
    (endTime.minute - startTime.minute);

  //시작 시간을 과거 시간으로 설정 불가
  if (
    nowDate.year === date.year &&
    nowDate.month === date.month &&
    nowDate.day === date.day &&
    nowDate.hour === startTime.hour &&
    nowDate.minute > startTime.minute
  ) {
    message = "시작 시간은 과거 시간으로 설정할 수 없습니다.";
    return message;
  }

  //종료 시간이 시작시간보다 작거나 같을 수 없도록 설정
  if (
    startTime.hour > endTime.hour ||
    (startTime.hour === endTime.hour && startTime.minute >= endTime.minute)
  ) {
    message = "종료시간은 시작시간보다 작거나 같을 수 없습니다.";
    return message;
  }

  console.log(timediff);
  // 최소 체험 시간 설정
  if (timediff < 15) {
    message = "체험은 최소 15분 이상이어야 합니다.";
    return message;
  }

  // 최대 예약 가능한 시간대 제한
  if (schedules.length >= 10) {
    message = "예약 가능한 시간대는 최대 10개까지 설정 가능합니다.";
    return message;
  }

  // 새 예약이 기존 예약과 겹치는지 확인
  for (const schedule of schedules) {
    if (
      schedule.date.year === date.year &&
      schedule.date.month === date.month &&
      schedule.date.day === date.day
    ) {
      const existingStart =
        schedule.startTime.hour * 60 + schedule.startTime.minute;
      const existingEnd = schedule.endTime.hour * 60 + schedule.endTime.minute;
      const newStart = startTime.hour * 60 + startTime.minute;
      const newEnd = endTime.hour * 60 + endTime.minute;

      // 시간대가 겹치는지 확인
      if (
        (newStart < existingEnd && newEnd > existingStart) ||
        (existingStart < newEnd && existingEnd > newStart)
      ) {
        message = "다른 예약과 시간이 겹칩니다.";
        return message;
      }
    }
  }
  return message;
};

export const validateActivityCreate = (
  body: PostActivityBody,
  showNotification: (message: string, callback?: () => void) => void,
) => {
  const { title, category, description, address, price, schedules } = body;
  const nowDate = new Date();
  console.log(nowDate);
  console.log(schedules);
  if (title === "") {
    showNotification(ERROR_MESSAGE.TITLE);
    return false;
  }
  if (category === "") {
    showNotification(ERROR_MESSAGE.CATEGORY);
    return false;
  }
  if (description === "") {
    showNotification(ERROR_MESSAGE.DESCRIPTION);
    return false;
  }
  if (address === "") {
    showNotification(ERROR_MESSAGE.ADDRESS);
    return false;
  }
  console.log(price);
  if (price === 0) {
    showNotification(ERROR_MESSAGE.PRICE);
    return false;
  }
  console.log(schedules);
  if (schedules.length === 0) {
    showNotification(ERROR_MESSAGE.SCHEDULES.EMPTY);
    return false;
  }
  for (const schedule of schedules) {
    const { date, startTime } = schedule;

    const [year, month, day] = date.split("-").map(Number);
    const [startHour, startMinute] = startTime.split(":").map(Number);

    const scheduleDateTime = new Date(
      year,
      month - 1,
      day,
      startHour,
      startMinute,
    );

    if (scheduleDateTime < nowDate) {
      showNotification(ERROR_MESSAGE.SCHEDULES.WRONG);
      return false;
    }
  }

  return true;
};
