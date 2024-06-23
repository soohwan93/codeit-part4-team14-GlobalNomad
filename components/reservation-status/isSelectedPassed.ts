interface IsSelectedPassedType {
  year: number;
  month: number;
  date: number;
}

const isSelectedPassed = (
  today: IsSelectedPassedType,
  selectedDate: IsSelectedPassedType,
) => {
  if (selectedDate.year > today.year) {
    return false;
  }

  if (selectedDate.year === today.year) {
    if (today.month < selectedDate.month) {
      return false;
    }

    if (today.month === selectedDate.month) {
      return today.date <= selectedDate.date ? false : true;
    }
  }
  return true;
};

export default isSelectedPassed;
