import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { RootState } from "../../store/store";
import { deleteAccount } from "../../api/axios";
import { serverError } from "../../util/toastify";
import { ProfileEditContainer, TitleBox, SectionBox } from "./EditProfile";
import AccountDeleteModal from "./AccountDeleteModal";
import { DeleteButton } from "../../style/ButtonStyle";

function DeleteAccount() {
   const [modalOpen, setModalOpen] = useState(false);

   const openModal = () => {
      setModalOpen(true);
   };
   const closeModal = () => {
      setModalOpen(false);
   };

   const [, , removeCookie] = useCookies(["accessToken", "isAdmin"]);
   const navigate = useNavigate();
   const memberId = useSelector((state: RootState) => state.memberId);

   const handleDeleteAccount = async () => {
      const response = await deleteAccount(memberId);
      if (response) {
         removeCookie("accessToken");
         removeCookie("isAdmin");
         sessionStorage.removeItem("memberId");
         navigate("/");
         window.location.reload();
      } else {
         serverError();
      }
   };

   return (
      <ProfileEditContainer>
         <TitleBox>계정 삭제</TitleBox>
         <SectionBox>
            <DeleteGuide>
               나만의 친환경 서비스를 다시 사용할 일이 없어 계정을 없애고
               싶으시면 계정 폐쇄를 처리해드리겠습니다. 삭제된 계정은 다시
               복구할 수 없고 계정의 게시물이나 정보는 완전히 삭제된다는 점을
               기억해 주세요. 그래도 계정을 삭제하려면 “계정 삭제”를 클릭하세요.
            </DeleteGuide>
            <DeleteButton onClick={openModal}>계정 삭제</DeleteButton>
         </SectionBox>
         <AccountDeleteModal
            open={modalOpen}
            close={closeModal}
            handleDeleteAccount={handleDeleteAccount}
         />
      </ProfileEditContainer>
   );
}

export default DeleteAccount;

export const DeleteGuide = styled.span`
   font-size: 15px;
   margin-bottom: 20px;
`;
