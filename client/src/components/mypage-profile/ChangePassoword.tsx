import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
   ProfileEditContainer,
   TitleBox,
   SectionBox,
   SubsectionBox,
   InputButtonContainer,
   DefaultButton,
} from "./EditProfile";
import passwordArr from "./passwordArray";
import { updatePassword } from "../../api/axios";
import { RootState } from "../../store/store";
import {
   passwordChangeRetry,
   passwordChangeSuccess,
   serverError,
} from "../../util/toastify";

export interface PasswordChangeForm {
   currentPassword: string;
   newPassword: string;
   confirmPassword: string;
}

function ChangePassoword() {
   // useForm setup
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors, isValid },
   } = useForm<PasswordChangeForm>({
      mode: "onChange",
      criteriaMode: "all",
      defaultValues: {
         currentPassword: "",
         newPassword: "",
         confirmPassword: "",
      },
   });

   const memberId = useSelector((state: RootState) => state.memberId);

   // Handlers
   const handleChange = () => {
      const { currentPassword, newPassword, confirmPassword } = getValues();
      updatePassword(memberId, currentPassword, newPassword, confirmPassword)
         .then(() => {
            passwordChangeSuccess();
         })
         .catch((error) => {
            if (error.message === "현재 비밀번호 불일치") {
               passwordChangeRetry();
            } else if (error.message === "서버 오류") {
               serverError();
            }
         });
   };

   return (
      <ProfileEditContainer onSubmit={handleSubmit(handleChange)}>
         <TitleBox>비밀번호 변경</TitleBox>
         <SectionBox>
            {passwordArr.map((password) => (
               <SubsectionBox key={password.content}>
                  <label htmlFor={`${password.content}`}>
                     {password.labelName}
                  </label>
                  <InputButtonContainer>
                     <input
                        id={`${password.content}`}
                        type="password"
                        className="profile-input"
                        placeholder={password.placeholder}
                        {...register(password.content, {
                           required: password.required,
                           validate:
                              password.content !== "confirmPassword"
                                 ? (value: string) =>
                                      password.validFunction(value) ||
                                      password.errorMessage
                                 : (value: string) => {
                                      const { newPassword } = getValues();
                                      return (
                                         newPassword === value ||
                                         password.errorMessage
                                      );
                                   },
                        })}
                     />
                     {password.content === "confirmPassword" && (
                        <DefaultButton
                           type="submit"
                           disabled={!isValid}
                           onClick={handleSubmit(handleChange)}
                        >
                           변경
                        </DefaultButton>
                     )}
                  </InputButtonContainer>
                  {errors[password.content] && (
                     <p className="error-msg">
                        {errors[password.content]?.message}
                     </p>
                  )}
               </SubsectionBox>
            ))}
         </SectionBox>
      </ProfileEditContainer>
   );
}

export default ChangePassoword;
