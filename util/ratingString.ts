const ratingString = (rating: number) => {
  let ratingGrade = "";

  if (rating >= 2.5) {
    if (rating >= 4.6) return "압도적으로 긍정적";

    if (rating >= 4.2) return "매우 긍정적";

    if (rating >= 3.8) return "긍정적";

    if (rating >= 3.4) return "대체로 긍정적";

    return "복합적";
  } else {
    if (rating <= 1.4) return "압도적으로 부정적";

    if (rating <= 1.8) return "매우 부정적";

    if (rating <= 2.2) return "부정적";

    if (rating <= 2.6) return "대체로 부정적";

    return "복합적";
  }
};

export default ratingString;
