import { ScheduleType } from "@/components/activity-management/createOrupdate/ReservationTimeInputs";

export const formatSchedule = (schedule: ScheduleType) => {
  const { date, startTime, endTime } = schedule;

  const dateMonth = date.month >= 10 ? date.month : `0${date.month}`;

  const formatHourOrMinute = (hourOrMinute: number) => {
    const formattedValue =
      hourOrMinute >= 10 ? hourOrMinute : `0${hourOrMinute}`;
    return formattedValue;
  };

  const formattedDate = `${date.year}-${dateMonth}-${date.day}`;
  const formattedStartTime = `${formatHourOrMinute(startTime.hour)}:${formatHourOrMinute(startTime.minute)}`;
  const formattedEndTime = `${formatHourOrMinute(endTime.hour)}:${formatHourOrMinute(endTime.minute)}`;

  return {
    date: formattedDate,
    startTime: formattedStartTime,
    endTime: formattedEndTime,
  };
};
