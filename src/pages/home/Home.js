import styled from "styled-components";
import Logos from "../../image/MainLogo";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

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

const Title = styled.h3`
  margin-top: 20px;
  font-size: 20px;
`;
const Home = () => {
  return (
    <Wrap>
      <PageTitle title="Home" />
      <Logos />
      <Title>~ 기록으로 도전하는 암산게임! ~</Title>
      <Link to="/gamehome">
        <GoText>LET'S START!</GoText>
      </Link>
    </Wrap>
  );
};

export default Home;
