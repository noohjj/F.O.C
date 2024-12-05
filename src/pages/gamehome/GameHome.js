import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mainStyle } from "../../GlobalStyled";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  padding: 30px calc(${mainStyle.moPadding} * 2);
`;

const MainWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainText = styled.h3`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const GameWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  font-size: 22px;
`;

const GameBox = styled.div`
  width: 100%;
  height: 140px;
  padding: 20px;
  border-radius: 20px;
  margin-top: 15px;
`;

const PlusGame = styled(GameBox)`
  background-color: #d4fbd8;
`;

const MinusGame = styled(GameBox)`
  background-color: #fff2df;
`;

const MultiGame = styled(GameBox)`
  background-color: #ebf5ff;
`;

const DivGame = styled(GameBox)`
  background-color: #fbdfff;
`;

const MixGame = styled(GameBox)`
  background-color: #ffdfe0;
`;

const Text = styled.h3`
  font-weight: 500;
`;

const Record = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #555;
`;

const PlayBtn = styled.button`
  background-color: #fca43b;
  width: 140px;
  height: 40px;
  border: 0px solid white;
  border-radius: 15px;
  margin-top: 20px;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const ResetButton = styled.button`
  background-color: #ff4c4c;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
`;

const GameHome = () => {
  const [records, setRecords] = useState({
    plus: "00 : 00",
    minus: "00 : 00",
    multiply: "00 : 00",
    division: "00 : 00",
    mix: "00 : 00",
  });

  // localStorage에서 최고 기록을 불러오는 함수
  const loadRecords = () => {
    const storedRecords = {
      plus: localStorage.getItem("record_plus") || "00 : 00",
      minus: localStorage.getItem("record_minus") || "00 : 00",
      multiply: localStorage.getItem("record_multiple") || "00 : 00",
      division: localStorage.getItem("record_division") || "00 : 00",
      mix: localStorage.getItem("record_mix") || "00 : 00",
    };
    setRecords(storedRecords);
  };

  useEffect(() => {
    // 최초 렌더링 시 기록 불러오기
    loadRecords();
  }, []);

  // RESET 버튼 클릭 시 처리
  const handleReset = () => {
    localStorage.removeItem("record_plus");
    localStorage.removeItem("record_minus");
    localStorage.removeItem("record_multiply");
    localStorage.removeItem("record_division");
    localStorage.removeItem("record_mix");

    // 초기화 후 기록을 다시 로드
    loadRecords();

    alert("모든 기록이 초기화되었습니다.");
  };

  return (
    <Wrap>
      <MainWrap>
        <MainText>문제 선택</MainText>
        <ResetButton onClick={handleReset}>RESET</ResetButton>
      </MainWrap>
      <GameWrap>
        <PlusGame>
          <Text>덧셈</Text>
          <Record>최고 기록 : {records.plus}초</Record>
          <Link to="/plus">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </PlusGame>
        <MinusGame>
          <Text>뺄셈</Text>
          <Record>최고 기록 : {records.minus}초</Record>
          <Link to="/minus">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </MinusGame>
        <MultiGame>
          <Text>곱셈</Text>
          <Record>최고 기록 : {records.multiply}초</Record>
          <Link to="/multiple">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </MultiGame>
        <DivGame>
          <Text>나눗셈</Text>
          <Record>최고 기록 : {records.division}초</Record>
          <Link to="/division">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </DivGame>
        <MixGame>
          <Text>혼합계산</Text>
          <Record>최고 기록 : {records.mix}초</Record>
          <Link to="/mix">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </MixGame>
      </GameWrap>
    </Wrap>
  );
};

export default GameHome;
