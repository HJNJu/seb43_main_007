import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import PostDeleteModal from "./PostDeleteModal";
import { RootState } from "../../store/store";
import { deletePost } from "../../api/axios";
import { postDeleteSuccess, serverError } from "../../util/toastify";

export interface PostButtonsProps {
   memberId: number;
   boardId: number;
   category: string;
}

function PostButtons({ memberId, boardId, category }: PostButtonsProps) {
   const [modalOpen, setModalOpen] = useState(false);

   const myMemberId = useSelector((state: RootState) => state.memberId);
   const isAdmin = useSelector((state: RootState) => state.isAdmin);

   const openModal = () => {
      setModalOpen(true);
   };
   const closeModal = () => {
      setModalOpen(false);
   };

   const navigate = useNavigate();

   const handleEdit = () => {
      navigate(`/editpost/${boardId}`);
   };

   const handleToList = () => {
      navigate(`/communitylist/${category}`);
   };

   const handleDeletePost = async () => {
      const response = await deletePost(boardId);
      if (response) {
         console.log("게시글 삭제");
         postDeleteSuccess();
         navigate("/communitylist");
      } else {
         serverError();
      }
   };

   return (
      <PostButtonContainer>
         {(isAdmin || memberId === myMemberId) && (
            <EditDeleteContainer>
               <button
                  className="postdetail-btn edit-btn"
                  type="button"
                  onClick={handleEdit}
               >
                  수정
               </button>
               <span className="separator">|</span>
               <button
                  className="postdetail-btn"
                  type="submit"
                  onClick={openModal}
               >
                  삭제
               </button>
               <PostDeleteModal
                  open={modalOpen}
                  close={closeModal}
                  handleDeletePost={handleDeletePost}
               />
            </EditDeleteContainer>
         )}
         <button
            className="postdetail-btn"
            type="button"
            onClick={handleToList}
         >
            목록으로
         </button>
      </PostButtonContainer>
   );
}

export default PostButtons;

export const PostButtonContainer = styled.div`
   margin-left: 15px;
   margin-bottom: 15px;
   display: flex;
   justify-content: space-between;
   font-size: 13px;

   .postdetail-btn {
      color: #787878;
      border: none;
      background-color: transparent;
      font-size: 13px;
      cursor: pointer;
   }

   .edit-btn {
      padding-left: 0;
   }
`;

export const EditDeleteContainer = styled.div`
   .separator {
      color: #787878;
   }
`;
