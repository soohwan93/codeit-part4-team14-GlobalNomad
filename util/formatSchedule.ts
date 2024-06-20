import { ScheduleType } from "@/components/activity-management/createOrupdate/ReservationTimeInputs";
import { CalendarDate, ZonedDateTime } from "@internationalized/date";

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

export const mapApiDataToSchedules = (
  schedules: [
    {
      id: number;
      date: string;
      startTime: string;
      endTime: string;
    },
  ],
) => {
  return schedules.map((item, index) => ({
    key: `schedules_${index}`,
    id: item.id,
    date: new CalendarDate(
      +item.date.split("-")[0],
      +item.date.split("-")[1],
      +item.date.split("-")[2],
    ),
    startTime: new ZonedDateTime(
      +item.date.split("-")[0],
      +item.date.split("-")[1],
      +item.date.split("-")[2],
      "Asia/Seoul",
      32400000,
      +item.startTime.split(":")[0],
      +item.startTime.split(":")[1],
    ),
    endTime: new ZonedDateTime(
      +item.date.split("-")[0],
      +item.date.split("-")[1],
      +item.date.split("-")[2],
      "Asia/Seoul",
      32400000,
      +item.endTime.split(":")[0],
      +item.endTime.split(":")[1],
    ),
  }));
};
