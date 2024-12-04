import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 결과 페이지로 이동하기 위해 사용

const Plus = () => {
  const [problems, setProblems] = useState([]); // 문제 저장
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 인덱스
  const [userAnswer, setUserAnswer] = useState(""); // 사용자가 입력한 답
  const [startTime, setStartTime] = useState(null); // 현재 문제 시작 시간
  const [totalStartTime, setTotalStartTime] = useState(null); // 전체 시작 시간
  const [timeRecords, setTimeRecords] = useState([]); // 문제별 풀이 시간 기록
  const [elapsedTime, setElapsedTime] = useState(0); // 총 경과 시간
  const [currentElapsedTime, setCurrentElapsedTime] = useState(0); // 현재 문제 경과 시간
  const navigate = useNavigate(); // 페이지 이동용

  // 랜덤 덧셈 문제 생성 함수
  const generateProblems = () => {
    const newProblems = [];
    for (let i = 0; i < 10; i++) {
      const numTerms = Math.floor(Math.random() * 3) + 2; // 항의 개수(3~5)
      const problem = Array.from(
        { length: numTerms },
        () => Math.floor(Math.random() * 30) + 1
      ); // 1~30 사이 숫자
      newProblems.push(problem);
    }
    setProblems(newProblems);
  };

  // 정답 확인 함수
  const checkAnswer = () => {
    const correctAnswer = problems[currentIndex].reduce((a, b) => a + b, 0);

    if (parseInt(userAnswer) === correctAnswer) {
      // 정답일 경우
      const timeTaken = currentElapsedTime.toFixed(2); // 현재 문제 풀이 시간
      setTimeRecords([...timeRecords, timeTaken]); // 시간 기록 저장
      setUserAnswer(""); // 입력 필드 초기화

      if (currentIndex < problems.length - 1) {
        setCurrentIndex(currentIndex + 1); // 다음 문제로 이동
        setStartTime(Date.now()); // 다음 문제 시작 시간
        setCurrentElapsedTime(0); // 현재 문제 경과 시간 초기화
      } else {
        // 모든 문제를 완료한 경우
        alert("모두 클리어했습니다! 결과를 확인해볼까요?");
        const totalTime = elapsedTime.toFixed(2); // 총 소요 시간
        navigate("/result", { state: { timeRecords, totalTime } }); // 결과 페이지로 이동
      }
    } else {
      // 오답일 경우
      alert("오답입니다! 다시 풀어볼까요?");
      setUserAnswer(""); // 입력 필드 초기화
    }
  };

  // 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      if (totalStartTime) {
        setElapsedTime((Date.now() - totalStartTime) / 1000); // 총 경과 시간
      }
      if (startTime) {
        setCurrentElapsedTime((Date.now() - startTime) / 1000); // 현재 문제 경과 시간
      }
    }, 100); // 0.1초 간격으로 업데이트

    return () => clearInterval(interval); // 컴포넌트가 언마운트되면 타이머 정리
  }, [totalStartTime, startTime]);

  useEffect(() => {
    generateProblems();
    setTotalStartTime(Date.now()); // 전체 시작 시간 기록
    setStartTime(Date.now()); // 첫 문제 시작 시간 기록
  }, []);

  if (problems.length === 0) {
    return <div>문제를 불러오는 중...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>덧셈 문제</h1>
      <div style={{ marginBottom: "20px" }}>
        <strong>문제 {currentIndex + 1} / 10</strong>
      </div>
      <div style={{ fontSize: "20px", marginBottom: "10px" }}>
        {problems[currentIndex].join(" + ")} =
      </div>
      <input
        type="number"
        placeholder="정답을 입력해 주세요"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        style={{ fontSize: "16px", padding: "5px", width: "200px" }}
      />
      <button
        onClick={checkAnswer}
        style={{
          marginLeft: "10px",
          padding: "5px 15px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        확인
      </button>
      <div style={{ marginTop: "20px" }}>
        <strong>현재 문제 풀이 시간:</strong> {currentElapsedTime.toFixed(2)}초
      </div>
      <div>
        <strong>총 경과 시간:</strong> {elapsedTime.toFixed(2)}초
      </div>
    </div>
  );
};

export default Plus;
