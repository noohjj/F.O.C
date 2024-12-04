import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.header`
  width: 100%;
  height: 80px;
  background-color: #00a651;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jersey 25", sans-serif;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: 900;
`;

const MainText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 36px;
  letter-spacing: 2px;
`;

const SubText = styled.h3`
  font-size: 20px;
  letter-spacing: 2px;
`;

const Header = () => {
  return (
    <Wrap>
      <Link to="/">
        <TextWrap>
          <MainText>F.O.C</MainText>
          <SubText>~ Fast Of Calculation ~</SubText>
        </TextWrap>
      </Link>
    </Wrap>
  );
};

export default Header;
