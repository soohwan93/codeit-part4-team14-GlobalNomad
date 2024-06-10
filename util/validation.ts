import badWords from "@/public/data/badwords.json";

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
