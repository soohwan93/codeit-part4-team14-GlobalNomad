"use client";
import {
  CalendarDate,
  getLocalTimeZone,
  now,
  Time,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { TimeInput } from "@nextui-org/date-input";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InteractivePlusSvg from "@/components/common/svg/InteractivePlusSvg";
import InteractiveMinusSvg from "@/components/common/svg/InteractiveMinusSvg";
import { formatSchedule } from "@/util/formatSchedule";
import { useNotification } from "@/contexts/NotificationContext";
import { addScheduleValidation } from "@/util/validation";
import Label from "@/components/common/Label";

interface Props {
  setFormattedSchedules: React.Dispatch<React.SetStateAction<string>>;
}

export interface ScheduleType {
  key: string;
  date: CalendarDate;
  startTime: ZonedDateTime;
  endTime: ZonedDateTime;
}

const ReservationTimeInputs = (props: Props) => {
  const { setFormattedSchedules } = props;

  const datePickerRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [startTime, setStartTime] = useState(now(getLocalTimeZone()));
  const [endTime, setEndTime] = useState(now(getLocalTimeZone()));

  const [isDateInvalid, setIsDateInvalid] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);

  const { showNotification } = useNotification();
  const handleDateChange = (selectedDate: CalendarDate) => {
    const nowDate = today(getLocalTimeZone());
    setDate(selectedDate);
    if (nowDate > selectedDate) {
      const msg = nowDate.year + ". " + nowDate.month + ". " + nowDate.day;
      setIsDateInvalid(true);
      setDateErrorMessage(`날짜는 ${msg} 이상이어야 합니다.`);
      return;
    }
    setIsDateInvalid(false);
    setDateErrorMessage("");
  };

  const handleAddSchedule = () => {
    const res = addScheduleValidation(date, startTime, endTime, schedules);

    if (res !== "") {
      showNotification(res);
      return;
    }

    const newSchedule = {
      key: `schedules_${schedules.length}`,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };

    console.log(schedules);
    if (schedules) {
      setSchedules([...schedules, newSchedule]);
    } else {
      setSchedules([newSchedule]);
    }
  };

  const handleDeleteSchedule = (key: string) => {
    setSchedules(schedules.filter((item) => item.key !== key));
  };

  const formatSchedules = useCallback((schedules: ScheduleType[]) => {
    return schedules.map(formatSchedule);
  }, []);

  useEffect(() => {
    const formatted = JSON.stringify(formatSchedules(schedules));
    setFormattedSchedules(formatted);
  }, [schedules, formatSchedules, setFormattedSchedules]);

  return (
    <div className="pb-10">
      <Label required htmlFor="" labelText="예약 가능한 시간대">
        <div className="flex gap-1 md:gap-5">
          <DatePicker
            ref={datePickerRef}
            className="w-full"
            minValue={today(getLocalTimeZone())}
            value={date}
            onChange={handleDateChange}
            label="날짜"
            isInvalid={isDateInvalid}
            errorMessage={dateErrorMessage}
          />
          <TimeInput
            label="시작 시간"
            className="max-w-[69px] whitespace-nowrap"
            hourCycle={24}
            value={startTime}
            onChange={setStartTime}
            hideTimeZone
          />
          <div className="hidden h-14 md:flex md:items-center">~</div>
          <TimeInput
            label="종료 시간"
            className="max-w-[69px] whitespace-nowrap"
            hourCycle={24}
            value={endTime}
            minValue={new Time(10)}
            onChange={setEndTime}
            hideTimeZone
          />
          <InteractivePlusSvg
            isDateInvalid={isDateInvalid}
            onClick={handleAddSchedule}
          />
        </div>
        {schedules?.length !== 0 && (
          <div className="w-full py-4 md:py-[21px]">
            <hr className="h-[1px] bg-gray-30" />
          </div>
        )}
        {schedules?.map((item) => (
          <div key={item.key} className="flex gap-1 md:gap-5 md:pb-[21px]">
            <DatePicker
              className="w-full "
              defaultValue={item.date}
              label="날짜"
              isReadOnly
            />
            <TimeInput
              label="시작 시간"
              className="max-w-[69px] whitespace-nowrap"
              hourCycle={24}
              defaultValue={item.startTime}
              hideTimeZone
              isReadOnly
            />
            <div className="hidden md:flex md:items-center">~</div>
            <TimeInput
              label="종료 시간"
              className="max-w-[69px] whitespace-nowrap"
              hourCycle={24}
              defaultValue={item.endTime}
              hideTimeZone
              isReadOnly
            />
            <InteractiveMinusSvg
              onClick={() => handleDeleteSchedule(item.key)}
            />
          </div>
        ))}
      </Label>
    </div>
  );
};

export default ReservationTimeInputs;
