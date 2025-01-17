import styled from "styled-components";

export interface PostTagProps {
   tags: Array<{
      tagId: number;
      tagName: string;
   }>;
}

function PostTags({ tags }: PostTagProps) {
   return (
      <PostTagContainer>
         {tags.map((tag) => {
            return <Tag key={tag.tagId}>{tag.tagName}</Tag>;
         })}
      </PostTagContainer>
   );
}

export default PostTags;

export const PostTagContainer = styled.div`
   margin-left: 15px;
   margin-bottom: 30px;
   display: flex;
   align-items: center;
`;

export const Tag = styled.div`
   background-color: var(--first-color3);
   border-radius: 5px;
   font-size: var(--font-small);
   margin-right: 5px;
   padding: 3px 10px;
`;
