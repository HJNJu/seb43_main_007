import styled from "styled-components";

export const DefaultButton = styled.button`
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
   text-align: center;
   transition-duration: 3ms;

   &:hover:not(:disabled) {
      background-color: #d4e6d9;
   }

   &:active:not(:disabled) {
      background-color: #c4dccb;
   }

   &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
   }
`;

export const DeleteButton = styled.button`
   height: 32px;
   width: 74px;
   background-color: #ffd3d3;
   border-radius: 3px;
   border: none;
   color: #860a0e;
   cursor: pointer;
   font-size: 15px;
   font-weight: 400;
   outline: none;
   text-align: center;
   transition-duration: 3ms;

   &:hover {
      background-color: #ffbebe;
      color: #510003;
   }

   &:active {
      background-color: #f9a2a2;
      color: #510003;
   }
`;

export const CancelButton = styled.button`
   height: 32px;
   width: 74px;
   background-color: transparent;
   border-radius: 3px;
   border: none;
   color: var(--first-color4);
   cursor: pointer;
   font-size: 15px;
   font-weight: 400;
   outline: none;
   text-align: center;
   transition-duration: 3ms;

   &:hover {
      background-color: transparent;
      color: var(--first-color4);
   }

   &:active {
      background-color: transparent;
   }
`;
