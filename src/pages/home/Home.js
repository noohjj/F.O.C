import styled from "styled-components";
import Logos from "../../image/MainLogo";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  height: 90vh;
  padding: 200px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoText = styled.div`
  margin-top: 30px;
  font-size: 35px;
  font-family: "Jersey 25", sans-serif;
  font-weight: 900;
  letter-spacing: 2px;
`;
const Home = () => {
  return (
    <Wrap>
      <Logos />
      <Link to="/gamehome">
        <GoText>LET'S START!</GoText>
      </Link>
    </Wrap>
  );
};

export default Home;
