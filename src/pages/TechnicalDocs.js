import React from "react";
import { Layout, Menu, Button, Input, Row, Col, Card } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const TechnicalDocs = () => {
    const navigate = useNavigate();

    const handleCardClick = (key) => {
        if (key === "overview-topics") {
            navigate("/overview-topics");
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
                <Content style={{ padding: "20px", backgroundColor: "#fff" }}>
                    <h2
                        style={{
                            fontSize: "1.8rem",
                            color: "#484848",
                            marginBottom: "20px",
                        }}
                    >
                        Technical Documentation Templates
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
                        {[
                            "Getting Started Guide Templates",
                            "How-To Topic Templates",
                            "API References Templates",
                            "Concept Topics Templates",
                            "FAQs Templates",
                            "Release Notes Templates",
                            "Troubleshooting Guide Templates",
                            "Quickstart Guide Templates",
                            "Decision-Support Topic Templates",
                            "Overview Topic Templates",
                        ].map((template, index) => (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <Card
                                    hoverable
                                    style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                        border: "1px solid #DFDFDF",
                                        borderRadius: "8px",
                                        color: "#484848",
                                    }}
                                    onClick={() =>
                                        template === "Overview Topic Templates"
                                            ? handleCardClick("overview-topics")
                                            : null
                                    }
                                >
                                    {template}
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

                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default TechnicalDocs;