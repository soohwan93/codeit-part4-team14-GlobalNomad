const dateFormat = (dateString: string) => {
  const now = new Date();
  const updatedAt = new Date(dateString);
  const diffInMilliseconds = now.getTime() - updatedAt.getTime();
  const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));

  if (diffInMinutes < 1) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInMinutes < 1440) {
    const diffInHours = Math.round(diffInMinutes / 60);
    return `${diffInHours}시간 전`;
  } else {
    const diffInDays = Math.round(diffInMinutes / 1440);
    return `${diffInDays}일 전`;
  }
};

export default dateFormat;
