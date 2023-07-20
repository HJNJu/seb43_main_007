import {
   ModalContainer,
   ModalContentBox,
} from "../mypage-profile/AccountDeleteModal";
import { DeleteButton, CancelButton } from "../../style/ButtonStyle";

export interface CommentDeleteModalProps {
   open: boolean;
   close: () => void;
   handleDeleteComment: () => void;
}

function CommentDeleteModal({
   open,
   close,
   handleDeleteComment,
}: CommentDeleteModalProps) {
   return (
      <ModalContainer className={open ? "openModal" : "closeModal"}>
         <ModalContentBox>
            <h1>댓글 삭제</h1>
            <p>정말로 댓글을 삭제하시겠습니까?</p>
            <div className="button-container">
               <DeleteButton onClick={handleDeleteComment}>
                  댓글 삭제
               </DeleteButton>
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

export default CommentDeleteModal;
