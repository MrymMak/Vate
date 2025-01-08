import React from "react";
import { useNavigate } from "react-router-dom";
import { SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const HeaderBar = () => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* VateGPT Logo */}
      <h1
        onClick={() => navigate("/")}
        style={{
          margin: 0,
          fontSize: "1.8rem",
          color: "#000",
          cursor: "pointer",
        }}
      >
        VateGPT
      </h1>

      {/* Icons */}
      <div style={{ display: "flex", gap: "20px" }}>
        <QuestionCircleOutlined
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
          title="Help"
        />
        <SettingOutlined
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
          onClick={() => navigate("/settings")}
          title="Settings"
        />
      </div>
    </header>
  );
};

export default HeaderBar;