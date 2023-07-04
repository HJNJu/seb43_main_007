import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostData } from "../api/axios";
import { CommentType } from "../components/postdetail/commentType";
import groupCommentsAndReplies from "../util/groupCommentsAndReplies";
import { RootState } from "../store/store";
import { setComments } from "../reducers/commentsSlice";
import { setBoardId } from "../reducers/boardIdSlice";

export interface Post {
   memberId: number;
   boardId: number;
   title: string;
   content: string;
   address: string | null;
   now: string;
   photo: string;
   pick: number;
   pin: number;
   likeCheck: number;
   likeCount: number;
   bookmark: number;
   nickName: string;
   userPhoto: string;
   category: string;
   tags: {
      tagId: number;
      tagName: string;
   }[];
   comments?: CommentType[];
}

const usePost = (boardId: string) => {
   const dispatch = useDispatch();
   const [post, setPost] = useState<Post | null>(null);
   const [postDeleted, setPostDeleted] = useState(false);

   const memberId = useSelector((state: RootState) => state.memberId);

   useEffect(() => {
      const fetchPost = async () => {
         dispatch(setBoardId(parseInt(boardId, 10)));

         const data = await getPostData(memberId, parseInt(boardId, 10));
         if (data && data.comments) {
            const commentsWithReplies = groupCommentsAndReplies(data.comments);
            dispatch(setComments(commentsWithReplies));
         } else if (!data) {
            setPostDeleted(true);
         }
         setPost(data);
      };

      fetchPost();
   }, [dispatch, memberId, boardId]);

   return { post, postDeleted };
};

export default usePost;
