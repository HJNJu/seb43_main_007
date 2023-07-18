import validFunc from "../../util/signinValidFunc";

export interface PasswordType {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}

interface InputContent {
   labelName: string;
   content: keyof PasswordType;
   placeholder: string;
   required: boolean | string;
   errorMessage: string;
   validFunction: (v: string) => boolean;
}

const passwordArr: InputContent[] = [
   {
      labelName: "현재 비밀번호",
      content: "currentPassword",
      placeholder: "현재 비밀번호",
      required: true,
      errorMessage: "",
      validFunction: () => true,
   },
   {
      labelName: "새로운 비밀번호",
      content: "newPassword",
      placeholder: "영문, 숫자 포함 8자 이상 20자 이하",
      required: true,
      errorMessage: "영문, 숫자 포함 8자 이상 20자 이하여야 합니다",
      validFunction: validFunc.validPassword,
   },
   {
      labelName: "비밀번호 재확인",
      content: "confirmPassword",
      placeholder: "새로운 비밀번호 재입력",
      required: true,
      errorMessage: "비밀번호가 일치하지 않습니다.",
      validFunction: () => true,
   },
];

export default passwordArr;
