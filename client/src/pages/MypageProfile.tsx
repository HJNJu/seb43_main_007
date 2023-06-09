import styled from "styled-components";
import { motion } from "framer-motion";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import EditProfile from "../components/mypage-profile/EditProfile";
import ChangePassoword from "../components/mypage-profile/ChangePassoword";
import DeleteAccount from "../components/mypage-profile/DeleteAccount";

function MypageProfile() {
   return (
      <MypageProfileContainer
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         exit={{ opacity: 0 }}
      >
         <MypageTopProfile />
         <MypageNavbar />
         <EditProfile />
         <ChangePassoword />
         <DeleteAccount />
      </MypageProfileContainer>
   );
}

export default MypageProfile;

export const MypageProfileContainer = styled(motion.div)`
   width: 1080px;
   padding-left: 16px;
   padding-top: 16px;
   margin-left: 300px;
`;
