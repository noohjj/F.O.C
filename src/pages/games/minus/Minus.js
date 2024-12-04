import React, { useState, useEffect } from "react";

// 랜덤 뺄셈 문제 생성 함수
const generateMinusProblem = () => {
  const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;
  const numOperands = Math.floor(Math.random() * 4) + 2; // 항의 개수 (최소 2개, 최대 4개)
  const numbers = Array.from({ length: numOperands }, () =>
    getRandomNumber(20)
  );
  return numbers;
};

const Minus = () => {
  const [problem, setProblem] = useState(generateMinusProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  // 정답 계산
  const calculateAnswer = () => problem.reduce((result, num) => result - num);

  // 타이머 시작
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // 시간 포맷 (초 -> 분:초)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // 정답 제출 함수
  const handleSubmit = () => {
    if (parseInt(userAnswer) === calculateAnswer()) {
      alert("정답입니다! 다음 문제로 넘어갑니다!");
      setProblem(generateMinusProblem()); // 새로운 문제 생성
      setUserAnswer(""); // 입력값 초기화
    } else {
      alert("오답입니다! 다시 풀어보세요!");
    }
  };

  return (
    <div>
      <h3>뺄셈 문제</h3>
      <h4>시간: {formatTime(time)}</h4>
      <div style={{ fontSize: "24px", margin: "20px 0" }}>
        {problem.join(" - ")} {/* 문제 표시 */}
      </div>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="정답을 입력하세요"
        style={{
          padding: "10px",
          fontSize: "18px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "200px",
          textAlign: "center",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#fca43b",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        제출
      </button>
    </div>
  );
};

export default Minus;
