import React from "react";
import styled from "styled-components";
import logoImage from "../image/FOCLOGO.png"; // 이미지 경로

const LogoImage = styled.img`
  width: 300px; /* 원하는 크기로 조정 */
  height: auto;
`;

const Logos = () => {
  return <LogoImage src={logoImage} alt="Logo" />;
};

export default Logos;
