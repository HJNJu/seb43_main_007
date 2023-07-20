import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "../../store/store";
import validFunc from "../../util/signinValidFunc";
import { setPhoto, resetPhoto } from "../../reducers/ProfilePhotoSlice";
import { setNickname } from "../../reducers/ProfileNicknameSlice";
import { DefaultButton } from "../../style/ButtonStyle";
import PhotoUploadModal from "./PhotoUploadModal";
import {
   resetUserProfilePhoto,
   updateNickname,
   updateUserProfilePhoto,
} from "../../api/axios";
import {
   nicknameChangeRetry,
   nicknameChangeSuccess,
   photoChangeError,
   photoChangeSuccess,
   serverError,
} from "../../util/toastify";
import PhotoDeleteModal from "./PhotoDeleteModal";

interface ProfileEditTypes {
   nickname: string;
}

function EditProfile() {
   // useForm setup
   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      watch,
   } = useForm<ProfileEditTypes>({
      mode: "onChange",
      criteriaMode: "all",
      defaultValues: {
         nickname: "",
      },
   });

   // Redux dispatch
   const dispatch = useDispatch();

   // State variables
   const [prevPhoto, setPrevPhoto] = useState("");
   const [uploadModalOpen, setUploadModalOpen] = useState(false);
   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);

   // Redux selector
   const memberId = useSelector((state: RootState) => state.memberId);
   const currentPhoto = useSelector(
      (state: RootState) => state.profilePhoto.photo
   );

   // Handlers
   const currentNickname = watch("nickname");

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         if (file.size > 1048576) {
            alert("파일 크기는 1MB 이하여야 합니다.");
            return;
         }
         setPrevPhoto(currentPhoto);
         const reader = new FileReader();
         reader.onload = (event) => {
            if (event.target) {
               const fileResult = event.target.result as string;
               setSelectedFile(file);
               setPrevPhoto(fileResult);
               setUploadModalOpen(true);
            }
         };
         reader.readAsDataURL(file);
      }
   };

   const handleConfirmUpload = () => {
      if (selectedFile) {
         dispatch(setPhoto(prevPhoto));
         updateUserProfilePhoto(memberId, selectedFile)
            .then(() => {
               photoChangeSuccess();
            })
            .catch((error) => {
               console.error("프로필 사진 변경에 실패하였습니다.", error);
               photoChangeError();
            });
         setUploadModalOpen(false);
         setSelectedFile(null);
      }
   };

   const handleSave = () => {
      updateNickname(memberId, currentNickname)
         .then(() => {
            dispatch(setNickname(currentNickname));
            nicknameChangeSuccess();
         })
         .catch((error) => {
            console.error("닉네임 변경에 실패하였습니다.", error);
            if (error.message === "닉네임 중복") {
               nicknameChangeRetry();
            } else if (error.message === "서버 오류") {
               serverError();
            }
         });
   };

   const handleDelete = () => {
      resetUserProfilePhoto(memberId)
         .then(() => {
            dispatch(resetPhoto());
            setDeleteModalOpen(false);
         })
         .catch((error) => {
            console.error("프로필 사진 초기화에 실패하였습니다.", error);
            photoChangeError();
         });
   };

   return (
      <ProfileEditContainer onSubmit={handleSubmit(handleSave)}>
         <TitleBox>프로필 관리</TitleBox>
         <SectionBox>
            <SubsectionBox>
               <label htmlFor="nickname">닉네임</label>
               <InputButtonContainer>
                  <input
                     id="nickname"
                     type="text"
                     className="profile-input"
                     placeholder="한글 및 영어, 숫자 10자 이내"
                     {...register("nickname", {
                        required: true,
                        validate: (value) =>
                           validFunc.validNickName(value) ||
                           "닉네임은 10자 이하여야 합니다.",
                     })}
                  />
                  <DefaultButton
                     type="submit"
                     onClick={handleSave}
                     disabled={!isValid}
                  >
                     저장
                  </DefaultButton>
               </InputButtonContainer>
               {errors.nickname && (
                  <p className="error-msg">{errors.nickname.message}</p>
               )}
            </SubsectionBox>
            <SubsectionBox>
               <label htmlFor="profile-pic">프로필 사진</label>
               <PhotoLimit>jpg, jpeg, png 지원 (최대 1MB)</PhotoLimit>
               <InputButtonContainer>
                  <label htmlFor="img-file" className="find-btn">
                     파일 찾기
                  </label>
                  <DefaultButton onClick={() => setDeleteModalOpen(true)}>
                     삭제
                  </DefaultButton>
                  <input
                     id="img-file"
                     type="file"
                     className="file-input"
                     accept="image/jpeg, image/png"
                     onChange={handleFileChange}
                  />
               </InputButtonContainer>
            </SubsectionBox>
         </SectionBox>
         <PhotoUploadModal
            open={uploadModalOpen}
            close={() => setUploadModalOpen(false)}
            imgSrc={prevPhoto}
            handleConfirmUpload={handleConfirmUpload}
         />
         <PhotoDeleteModal
            open={deleteModalOpen}
            close={() => setDeleteModalOpen(false)}
            handleDelete={handleDelete}
         />
      </ProfileEditContainer>
   );
}

export default EditProfile;

export const ProfileEditContainer = styled.div`
   margin-bottom: 35px;
`;

export const TitleBox = styled.div`
   font-size: 23px;
   color: var(--first-color4);
   font-weight: 700;
   margin: 10px 0;
`;

export const SectionBox = styled.div`
   padding: 20px;
   background-color: var(--first-color2);
   border-radius: 3px;
   display: flex;
   flex-direction: column;
`;

export const SubsectionBox = styled.div`
   margin-bottom: 15px;

   label {
      font-weight: 600;
      font-size: 16px;
   }

   .error-msg {
      font-size: 13px;
      color: red;
      margin-top: 3px;
   }
`;

export const PhotoLimit = styled.div`
   margin: 10px 0;
   font-size: 13px;
`;

export const InputButtonContainer = styled.div`
   display: flex;
   margin-top: 5px;

   .profile-input {
      width: 500px;
      height: 32px;
      margin-right: 15px;
      font-size: 13px;
      padding: 0 5px;
      border: 1px solid var(--light-gray);
   }

   .profile-input:focus {
      box-shadow: 0 0 0 2px rgba(0, 149, 255, 0.15);
      border: 1px solid var(--second-color3);
      outline: none;
   }

   .file-input {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
   }

   .find-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      height: 32px;
      width: 74px;
      background-color: var(--first-color3);
      border-radius: 3px;
      border: 1px solid #c4dccb;
      color: var(--first-color4);
      cursor: pointer;
      font-size: 15px;
      font-weight: 400;
      outline: none;
      transition-duration: 3ms;

      &:hover {
         background-color: #d4e6d9;
      }

      &:active {
         background-color: #c4dccb;
      }
   }

   @media all and (max-width: 767px) {
      .profile-input {
         width: 75%;
      }

      .photo-delete-btn {
         display: none;
      }
   }
`;
