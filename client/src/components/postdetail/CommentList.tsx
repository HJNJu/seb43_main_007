import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { RootState } from "../../store/store";

function CommentList() {
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
