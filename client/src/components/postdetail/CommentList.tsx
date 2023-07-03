import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { RootState } from "../../store/store";

interface CommentListProps {
   boardId: number;
}

function CommentList({ boardId }: CommentListProps) {
   // 댓글
   const comments = useSelector((state: RootState) => state.comments.comments);

   // 대댓글 클릭된 댓글 Id
   const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
      null
   );

   const handleReplyClick = (commentId: number | null) => {
      setSelectedCommentId(commentId);
   };

   return (
      <CommentListContainer>
         <ul className="comments">
            {comments.map((comment) => {
               const isReplySelected = selectedCommentId === comment.commentId;
               return (
                  <Comment
                     key={comment.commentId}
                     comment={comment}
                     handleReplyClick={handleReplyClick}
                     isReplySelected={isReplySelected}
                     boardId={boardId}
                  />
               );
            })}
         </ul>
      </CommentListContainer>
   );
}

export default CommentList;

export const CommentListContainer = styled.div`
   display: flex;
   flex-direction: column;

   .comments {
      padding: 0;
   }
`;

export const CreateCommentContainer = styled.div`
   background-color: var(--first-color2);
   border-bottom: 1px solid var(--light-gray);
   padding: 15px;
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const CommentInputBox = styled.div`
   display: flex;
   align-items: center;

   .letter-count {
      font-size: 12px;
      width: 50px;
      text-align: end;
      margin-right: 10px;
      color: var(--dark-gray);
   }

   .create-comment {
      height: 50px;
      width: 895px;
      resize: none;
      border: 1px solid var(--light-gray);
      border-radius: 3px;

      &:focus {
         box-shadow: 0 0 0 2px rgba(0, 149, 255, 0.15);
         border: 1px solid var(--second-color3);
         outline: none;
      }
   }
`;
