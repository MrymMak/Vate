import React, { useState } from "react";
import { Layout, Menu, Input, Button, Row, Col, Card, Tag } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import TempDocsOverviewIndex1 from "./TempDocsOverviewIndex1";

const { Sider, Content } = Layout;

const OverviewTopics = () => {
    const navigate = useNavigate();
    const [expandedTemplate, setExpandedTemplate] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null); // Track single selection
    const [isUploadEnabled, setIsUploadEnabled] = useState(false);

    const templates = [
        "Template 1",
        "Template 2",
        "Template 3",
        "Template 4",
        "Template 5",
        "Template 6",
        "Template 7",
        "Template 8",
        "Template 9",
        "Template 10",
    ];

    const handleExpand = (template) => {
        setExpandedTemplate(template);
    };

    const handleSelectTemplate = (template) => {
        if (selectedTemplate === template) {
            setSelectedTemplate(null);
            setIsUploadEnabled(false);
        } else {
            setSelectedTemplate(template);
            setIsUploadEnabled(true);
        }
    };

    const handleMinimize = () => {
        setExpandedTemplate(null);
    };

    const handleContinueToVateGPT = async () => {
        if (!isUploadEnabled || !selectedTemplate) return;

        try {
            const API_KEY = process.env.REACT_APP_RENDER_API_KEY;

            console.log("Sending request to create session...");
            console.log("REACT_APP_RENDER_API_KEY:", API_KEY);

            const response = await axios.post(
                "https://vate.onrender.com/api/session",
                { selectedTemplate },
                { headers: { "x-api-key": API_KEY } }
            );

            console.log("API Response:", response.data);

            if (response.status === 201 || response.status === 200) {
                const sessionId = response.data.sessionId;
                console.log("Session Created:", sessionId);

                const vateGPTUrl = `https://chat.openai.com/g/g-67607db379148191bb6a5d90511fe882-vategpt?session=${sessionId}`;
                window.open(vateGPTUrl, "_blank");
            } else {
                console.error("Unexpected response:", response.status);
                alert(`Error: Unexpected response (${response.status}).`);
            }
        } catch (error) {
            console.error("Error in API call:", error.response ? error.response.data : error.message);
            alert("Error: Could not create session. Check console for details.");
        }
    };

    return (
        <Layout style={{ minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
            {/* Sidebar */}
            <Sider style={{ backgroundColor: "#305E3C", color: "#fff" }}>
                <h2
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        padding: "20px",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/home")}
                >
                    Vate
                </h2>
                <Menu theme="dark" mode="vertical" style={{ border: "none", backgroundColor: "#305E3C" }}>
                    <Menu.Item key="template-library" onClick={() => navigate("/home")}>
                        Template Library
                    </Menu.Item>
                    <Menu.Item key="docs" onClick={() => navigate("/docs")}>
                        Docs
                    </Menu.Item>
                    <Menu.Item key="settings" onClick={() => navigate("/settings")}>
                        Settings
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Main Content */}
            <Layout>
                {/* Header */}
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#DFDFDF",
                        padding: "10px 20px",
                        borderBottom: "1px solid #DFDFDF",
                    }}
                >
                    <h1
                        style={{ margin: 0, fontSize: "1.5rem", color: "#305E3C", cursor: "pointer" }}
                        onClick={() => navigate("/home")}
                    >
                        VateGPT
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", color: "#484848" }}>
                        <span style={{ cursor: "pointer" }} onClick={() => navigate("/docs")}>
                            Docs
                        </span>
                        <div
                            style={{
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                color: "#305E3C",
                                fontWeight: "bold",
                            }}
                            onClick={() => navigate("/settings")}
                        >
                            V
                        </div>
                    </div>
                </header>

                {/* Content */}
                <Content style={{ padding: "20px", backgroundColor: "#fff", display: "flex" }}>
                    {/* Left Section: Templates */}
                    <div style={{ flex: expandedTemplate ? 1 : 2, transition: "flex 0.3s ease" }}>
                        <h2
                            style={{
                                fontSize: "1.8rem",
                                color: "#484848",
                                marginBottom: "20px",
                            }}
                        >
                            Overview Topic Templates
                        </h2>

                        {/* Search and Filters */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <Button
                                icon={<FilterOutlined />}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#DFDFDF",
                                    color: "#305E3C",
                                    border: "1px solid #DFDFDF",
                                }}
                            >
                                Filters
                            </Button>
                            <Input.Search
                                placeholder="Filter by name"
                                allowClear
                                style={{ maxWidth: "300px" }}
                            />
                        </div>

                        {/* Template Cards */}
                        <Row gutter={[16, 16]}>
                            {templates.map((template, index) => (
                                <Col xs={24} sm={12} md={8} key={index}>
                                    <Card
                                        hoverable
                                        style={{
                                            textAlign: "center",
                                            cursor: "pointer",
                                            border: "1px solid #DFDFDF",
                                            borderRadius: "8px",
                                            color: "#484848",
                                            position: "relative",
                                        }}
                                        onClick={() => handleExpand(template)}
                                    >
                                        {template}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Right Section: Template Preview */}
                    {expandedTemplate && (
                        <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f8f8", borderLeft: "2px solid #ccc" }}>
                            <TempDocsOverviewIndex1 />
                            <Button
                                type="primary"
                                style={{ display: "block", margin: "10px auto" }}
                                onClick={() => handleSelectTemplate(expandedTemplate)}
                            >
                                {selectedTemplate === expandedTemplate ? "Deselect Template" : "Select This Template"}
                            </Button>
                            <Button type="default" onClick={handleMinimize} style={{ marginTop: "10px" }}>
                                Minimize
                            </Button>
                        </div>
                    )}
                </Content>
            </Layout>

            {/* Footer */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    paddingBottom: "20px",
                }}
            >
                <Button
                    type="primary"
                    size="large"
                    disabled={!isUploadEnabled}
                    onClick={handleContinueToVateGPT}
                >
                    Continue to VateGPT
                </Button>
            </div>
        </Layout>
    );
};

export default OverviewTopics;