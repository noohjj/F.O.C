import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mix = () => {
  const [problems, setProblems] = useState([]); // 문제 저장
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 인덱스
  const [userAnswer, setUserAnswer] = useState(""); // 사용자가 입력한 답
  const [startTime, setStartTime] = useState(null); // 현재 문제 시작 시간
  const [totalStartTime, setTotalStartTime] = useState(null); // 전체 시작 시간
  const [timeRecords, setTimeRecords] = useState([]); // 문제별 풀이 시간 기록
  const [elapsedTime, setElapsedTime] = useState(0); // 총 경과 시간
  const [currentElapsedTime, setCurrentElapsedTime] = useState(0); // 현재 문제 경과 시간
  const navigate = useNavigate(); // 페이지 이동용

  // 랜덤 혼합 문제 생성 함수
  const generateProblems = () => {
    const operators = ["+", "-", "*", "/"];
    const newProblems = [];
    for (let i = 0; i < 10; i++) {
      const numTerms = Math.floor(Math.random() * 3) + 2; // 항의 개수 (2~4)
      let problem = [];
      let result;

      while (true) {
        problem = [];
        for (let j = 0; j < numTerms; j++) {
          let randomNum = Math.floor(Math.random() * 30) + 1; // 1~30 사이의 숫자

          // 곱셈과 나눗셈의 경우 한자리 숫자로 제한
          if (j > 0 && problem[j - 1] === "*") {
            randomNum = Math.floor(Math.random() * 9) + 1; // 1~9 사이 숫자
          } else if (j > 0 && problem[j - 1] === "/") {
            randomNum = Math.floor(Math.random() * 9) + 1; // 1~9 사이 숫자
          }

          problem.push(randomNum);

          if (j < numTerms - 1) {
            // 랜덤으로 연산자 추가
            const operator =
              operators[Math.floor(Math.random() * operators.length)];
            problem.push(operator);
          }
        }

        // 문제를 계산하고 정답이 정수인지 확인
        result = evaluateProblem(problem);
        if (result !== null) break; // 정답이 정수일 때만 문제 생성 완료
      }

      newProblems.push({ problem, result });
    }

    setProblems(newProblems);
  };

  // 문제 평가 함수
  const evaluateProblem = (problem) => {
    try {
      let expression = problem.join(" ");
      let result = Function(
        "return " + expression.replace("x", "*").replace("÷", "/")
      )();
      return result % 1 === 0 ? result : null; // 정수만 반환
    } catch (error) {
      console.error("문제 평가 중 오류:", error);
      return null;
    }
  };

  // 정답 확인 함수
  const checkAnswer = () => {
    const correctAnswer = problems[currentIndex].result;

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkAnswer(); // 엔터 키를 눌렀을 때 정답 확인
    }
  };

  if (problems.length === 0) {
    return <div>문제를 불러오는 중...</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "30px", fontWeight: "500" }}>혼합 계산</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "50px",
            backgroundColor: "#f7f3f3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <strong style={{ fontSize: "14px" }}>현재 문제 풀이 시간:</strong>
          <h4 style={{ fontSize: "20px" }}>
            {currentElapsedTime.toFixed(2)}초
          </h4>
        </div>
        <div
          style={{
            width: "200px",
            height: "50px",
            backgroundColor: "#f7f3f3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <strong style={{ fontSize: "14px" }}>총 경과 시간:</strong>
          <h4 style={{ fontSize: "20px" }}>{elapsedTime.toFixed(2)}초</h4>
        </div>
      </div>
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <strong>문제 {currentIndex + 1} / 10</strong>
      </div>
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#f7f3f3",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "35px",
          fontWeight: "600",
          borderRadius: "20px",
        }}
      >
        {problems[currentIndex].problem
          .map((item) => (item === "*" ? "x" : item === "/" ? "÷" : item))
          .join(" ")}{" "}
        =
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <input
          type="number"
          placeholder="정답을 입력해 주세요"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            fontSize: "16px",
            padding: "5px",
            width: "80%",
          }}
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
      </div>
    </div>
  );
};

export default Mix;
