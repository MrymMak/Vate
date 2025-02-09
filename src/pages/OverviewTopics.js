import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, Button, Row, Col, Card, Tag } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios


const { Sider, Content } = Layout;

const OverviewTopics = () => {
    const navigate = useNavigate();
    const [expandedTemplate, setExpandedTemplate] = useState(null);
    const [selectedTemplates, setSelectedTemplates] = useState([]);
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

    const [templateData, setTemplateData] = useState(null);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/templates/tech-docs/overview-topics/template.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch template");
                }
                return response.json();
            })
            .then(data => {
                console.log("Loaded Template:", data);
                setTemplateData(data); // Update state with template data
            })
            .catch(error => console.error("Error loading template:", error));
    }, []);

    const handleExpand = (template) => {
        setExpandedTemplate(template);
    };

    const handleSelectTemplate = () => {
        let updatedTemplates;

        if (selectedTemplates.includes(expandedTemplate)) {
            // Remove the template
            updatedTemplates = selectedTemplates.filter((template) => template !== expandedTemplate);
        } else {
            // Add the template
            updatedTemplates = [...selectedTemplates, expandedTemplate];
        }

        setSelectedTemplates(updatedTemplates);
        setIsUploadEnabled(updatedTemplates.length > 0); // Disable button if no templates are selected
    };

    const handleMinimize = () => {
        setExpandedTemplate(null);
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
                                        {selectedTemplates.includes(template) && (
                                            <Tag
                                                color="green"
                                                style={{
                                                    position: "absolute",
                                                    top: "10px",
                                                    left: "10px",
                                                }}
                                            >
                                                Selected
                                            </Tag>
                                        )}
                                        {template}
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                cursor: "pointer",
                                                fontSize: "1.2rem",
                                            }}
                                        >
                                            ↗
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {/* Footer */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "30px",
                            }}
                        >
                            <Button
                                type="primary"
                                size="large"
                                disabled={!isUploadEnabled}
                                onClick={async () => {
                                    if (isUploadEnabled) {
                                        try {
                                            const API_KEY = process.env.REACT_APP_API_KEY;  // Declare first

                                            console.log("Sending request to create session...");
                                            console.log("Frontend API Key:", API_KEY); // Now API_KEY is defined

                                            const response = await axios.post(
                                                "https://vate.onrender.com/api/session",
                                                { selectedTemplate: selectedTemplates[0] },
                                                { headers: { "x-api-key": API_KEY } }
                                            );
                                            console.log("API Response:", response);

                                            if (response.status === 201 || response.status === 200) {  // Handle both 201 and 200
                                                const sessionId = response.data.sessionId;
                                                console.log("Session created successfully:", sessionId);

                                                //  Redirect to VateGPT with session ID
                                                const vateGPTUrl = `https://chatgpt.com/g/g-67607db379148191bb6a5d90511fe882-vategpt?session=${sessionId}`;
                                                window.open(vateGPTUrl, "_blank");
                                            } else {
                                                console.error("Unexpected response:", response.status);
                                                alert(`Error: Unexpected response (${response.status}).`);
                                            }
                                        } catch (error) {
                                            console.error("Error in API call:", error.response ? error.response.data : error.message);
                                            alert("Error: Could not create session. Check console for details.");
                                        }
                                    }
                                }}
                            >
                                Continue to VateGPT
                            </Button>
                        </div>
                    </div>

                    {/* Right Section: Expanded Template */}
                    {expandedTemplate && (
                        <div
                            style={{
                                flex: 1,
                                backgroundColor: "#F9F9F9",
                                padding: "20px",
                                borderLeft: "1px solid #DFDFDF",
                                position: "relative",
                                transition: "flex 0.3s ease",
                            }}
                        >
                            <h3 style={{ color: "#484848" }}>{expandedTemplate}</h3>

                            {/* Iframe to Preview the Template */}
                            <iframe
                                title={`Preview of ${expandedTemplate}`}
                                src={`${process.env.PUBLIC_URL}/templates/tech-docs/overview-topics/${expandedTemplate.replace(/\s+/g, "").toLowerCase()}/index.html`}
                                width="100%"
                                height="600px"
                                style={{ border: "none", marginTop: "10px" }}
                            ></iframe>
                            <Button
                                type="primary"
                                style={{
                                    marginTop: "10px",
                                    backgroundColor: selectedTemplates.includes(expandedTemplate) ? "#D9534F" : "#305E3C",
                                    borderColor: selectedTemplates.includes(expandedTemplate) ? "#D9534F" : "#305E3C",
                                }}
                                onClick={handleSelectTemplate}
                            >
                                {selectedTemplates.includes(expandedTemplate) ? "Unselect this template" : "Select this template"}
                            </Button>

                            <Button
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    cursor: "pointer",
                                    backgroundColor: "#DFDFDF",
                                    border: "1px solid #DFDFDF",
                                }}
                                onClick={handleMinimize}
                            >
                                ↙
                            </Button>
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default OverviewTopics;