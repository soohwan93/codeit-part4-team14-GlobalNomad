"use client";
import { useReducer, ChangeEvent } from "react";
import Input from "../common/Input";

interface State {
  [key: string]: string;
}

interface Action {
  type: string;
  payload: string;
}

const initialState: State = {
  text: "",
  email: "",
  invalidEmail: "",
  password: "",
  invalidPassword: "",
  readonlyText: "",
};

const reducer = (state: State, action: Action): State => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const InputTest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  return (
    <div>
      <Input
        name="text"
        value={state.text}
        onChange={handleChange}
        error={false}
        placeholder="텍스트를 입력해 주세요"
      />
      <Input
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="이메일을 입력해 주세요"
      />
      <Input
        type="email"
        name="invalidEmail"
        value={state.invalidEmail}
        onChange={handleChange}
        error={true}
        errorMessage="잘못된 이메일 입니다."
        placeholder="이메일을 입력해 주세요"
      />
      <Input
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
        placeholder="비밀번호를 입력해 주세요"
      />
      <Input
        type="password"
        name="invalidPassword"
        value={state.invalidPassword}
        onChange={handleChange}
        error={true}
        errorMessage="비밀번호가 올바르지 않습니다"
        placeholder="비밀번호를 입력해 주세요"
      />
      <Input
        name="readonlyText"
        value={state.readonlyText}
        onChange={handleChange}
        placeholder="비활성화 텍스트"
        readOnly
        disabled
      />
    </div>
  );
};

export default InputTest;
