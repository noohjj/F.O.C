import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 전달된 소요 시간 데이터를 가져오기
  const { totalTime } = location.state || { totalTime: "0" };

  // 시간 포맷 변환 (초를 "분 : 초" 형식으로 변환)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <div style={{ margin: "20px 0", fontSize: "24px", fontWeight: "bold" }}>
        RESULT
      </div>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          display: "inline-block",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ fontSize: "18px", marginBottom: "10px" }}>
          당신의 결과는?
        </div>
        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>
          {formatTime(totalTime)}
        </div>
      </div>
      <div style={{ marginTop: "20px", fontSize: "16px", color: "#555" }}>
        수고하셨습니다 ~! <br />더 나은 결과를 위해 파이팅!
      </div>
      <button
        onClick={() => navigate("/")}
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
        다시 시작하기
      </button>
    </div>
  );
};

export default Result;
