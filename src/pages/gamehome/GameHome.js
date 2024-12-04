import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mainStyle } from "../../GlobalStyled";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  padding: 30px calc(${mainStyle.moPadding} * 2);
`;

const MainText = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const GameWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
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

const GameHome = () => {
  const [records, setRecords] = useState({
    plus: "00 : 00",
    minus: "00 : 00",
    multiply: "00 : 00",
    division: "00 : 00",
    mix: "00 : 00",
  });

  useEffect(() => {
    // 각 게임별 최고 기록 가져오기
    const storedRecords = {
      plus: localStorage.getItem("record_plus") || "00 : 00",
      minus: localStorage.getItem("record_minus") || "00 : 00",
      multiply: localStorage.getItem("record_multiply") || "00 : 00",
      division: localStorage.getItem("record_division") || "00 : 00",
      mix: localStorage.getItem("record_mix") || "00 : 00",
    };
    setRecords(storedRecords);
  }, []);

  return (
    <Wrap>
      <MainText>문제 선택</MainText>
      <GameWrap>
        <PlusGame>
          <Text>덧셈</Text>
          <Record>기록 : {records.plus}</Record>
          <Link to="/plus">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </PlusGame>
        <MinusGame>
          <Text>뺄셈</Text>
          <Record>기록 : {records.minus}</Record>
          <Link to="/minus">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </MinusGame>
        <MultiGame>
          <Text>곱셈</Text>
          <Record>기록 : {records.multiply}</Record>
          <Link to="/multiply">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </MultiGame>
        <DivGame>
          <Text>나눗셈</Text>
          <Record>기록 : {records.division}</Record>
          <Link to="/division">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </DivGame>
        <MixGame>
          <Text>혼합계산</Text>
          <Record>기록 : {records.mix}</Record>
          <Link to="/mix">
            <PlayBtn>PLAY</PlayBtn>
          </Link>
        </MixGame>
      </GameWrap>
    </Wrap>
  );
};

export default GameHome;
