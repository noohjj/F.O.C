import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 전달된 소요 시간 데이터를 가져오기
  const { totalTime, gameType } = location.state || {
    totalTime: "0",
    gameType: "",
  };

  // 시간 포맷 변환 (초를 "분 : 초" 형식으로 변환)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // 최고 기록 갱신 함수
  const updateRecord = (category, newTime) => {
    const currentRecord = localStorage.getItem(category);
    if (!currentRecord || parseFloat(newTime) < parseFloat(currentRecord)) {
      localStorage.setItem(category, newTime);
    }
  };

  useEffect(() => {
    // 게임별 최고 기록을 갱신
    if (gameType) {
      updateRecord(`record_${gameType}`, totalTime);
    }
  }, [totalTime, gameType]);

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <PageTitle title="결과" />
      <div style={{ margin: "20px 0", fontSize: "24px", fontWeight: "bold" }}>
        RESULT
      </div>
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "60px",
          display: "inline-block",
          backgroundColor: "#f7f3f3",
        }}
      >
        <div style={{ fontSize: "25px", marginBottom: "10px" }}>
          당신의 결과는?
        </div>
        <div style={{ fontSize: "40px", fontWeight: "bold", color: "#333" }}>
          {formatTime(totalTime)}
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          fontSize: "18px",
          color: "#555",
          lineHeight: "20px",
        }}
      >
        수고하셨습니다 ~! <br />더 나은 결과를 위해 파이팅!
      </div>
      <button
        onClick={() => navigate("/gamehome")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        홈으로 가기
      </button>
    </div>
  );
};

export default Result;
