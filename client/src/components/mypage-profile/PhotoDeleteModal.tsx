import styled from "styled-components";
import { DeleteButton, CancelButton } from "../../style/ButtonStyle";

export interface PhotoDeleteModalProps {
   open: boolean;
   close: () => void;
   handleDelete: () => void;
}

function PhotoDeleteModal({
   open,
   close,
   handleDelete,
}: PhotoDeleteModalProps) {
   return (
      <ModalContainer className={open ? "openModal" : "closeModal"}>
         <ModalContentBox>
            <h1>프로필 사진 삭제</h1>
            <p>프로필 사진을 삭제하시겠습니까?</p>
            <div className="button-container">
               <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
               <CancelButton onClick={close}>취소</CancelButton>
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <span className="material-symbols-outlined" onClick={close}>
               close
            </span>
         </ModalContentBox>
      </ModalContainer>
   );
}

export default PhotoDeleteModal;

export const ModalContainer = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 1000;
   display: flex;
   justify-content: center;
   align-items: center;

   &.openModal {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease;
   }

   &.closeModal {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s ease, visibility 0.3s ease;
   }
`;

export const ModalContentBox = styled.div`
   position: relative;
   width: 483px;
   height: 174px;
   padding: 24px;
   background-color: white;
   border-radius: 7px;
   box-shadow: 0 1px 4px hsla(0, 0%, 0%, 0.09), 0 3px 8px hsla(0, 0%, 0%, 0.09),
      0 4px 13px hsla(0, 0%, 0%, 0.13);

   h1 {
      font-size: 20px;
      font-weight: 500;
      margin: 0 0 16px;
      color: #c22e32;
   }

   p {
      width: 100%;
      font-size: 13px;
      margin: 0 0 24px;
      color: black;
   }

   .material-symbols-outlined {
      position: absolute;
      right: 12px;
      top: 12px;
      font-size: var(--font-base);
      font-weight: 600;
      padding: 12px;
      color: hsl(210, 8%, 45%);

      &:hover,
      &:focus {
         color: var(--dark-gray);
         background-color: #f1f2f3;
         cursor: pointer;
      }

      &:focus {
         box-shadow: 0 0 0 4px rgba(131, 140, 149, 0.15);
      }

      &:active {
         background-color: hsl(210, 8%, 95%);
         box-shadow: none;
      }
   }
`;
