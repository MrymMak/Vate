import React from "react";
import { Layout, Menu, Dropdown, Input, Button, Row, Col, Card } from "antd";
import { FilterOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const HomePage = () => {
    const navigate = useNavigate();

    const profileMenu = (
        <Menu>
            <Menu.Item key="profile" onClick={() => navigate("/profile")}>
                Profile
            </Menu.Item>
            <Menu.Item key="settings" onClick={() => navigate("/settings")}>
                Settings
            </Menu.Item>
        </Menu>
    );

    const handleCardClick = (key) => {
        if (key === "technical-docs") {
            navigate("/technical-docs");
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sider style={{ backgroundColor: "#214D3C", color: "#fff" }}>
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
                <Menu theme="dark" mode="vertical" style={{ border: "none" }}>
                    <Menu.Item key="template-library" onClick={() => navigate("/home")}>
                        Template Library
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
                        backgroundColor: "#fff",
                        padding: "10px 20px",
                        borderBottom: "1px solid #ddd",
                    }}
                >
                    <h1
                        style={{ margin: 0, fontSize: "1.5rem", cursor: "pointer" }}
                        onClick={() => navigate("/home")}
                    >
                        VateGPT
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/docs")}
                        >
                            Docs
                        </span>
                        <Dropdown overlay={profileMenu} trigger={["click"]}>
                            <UserOutlined style={{ fontSize: "1.5rem", cursor: "pointer" }} />
                        </Dropdown>
                    </div>
                </header>

                {/* Content */}
                <Content style={{ padding: "20px" }}>
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
                            { key: "technical-docs", title: "Technical Documentation Templates" },
                            { key: "content-strategy", title: "Content Strategy Templates" },
                            { key: "knowledge-management", title: "Knowledge Management Templates" },
                            { key: "template-management", title: "Template Management Templates" },
                            { key: "creative-production", title: "Creative and Content Production Templates" },
                            { key: "education-training", title: "Education and Training Templates" },
                            { key: "user-research", title: "User Research and Data Templates" },
                            { key: "team-management", title: "Project and Team Management Templates" },
                            { key: "xxx-templates", title: "xxx Templates" },
                        ].map((template) => (
                            <Col xs={24} sm={12} md={8} key={template.key}>
                                <Card
                                    hoverable
                                    style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleCardClick(template.key)}
                                >
                                    {template.title}
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
                            onClick={() =>
                                window.open("https://chat.openai.com/", "_blank")
                            }
                            style={{
                                backgroundColor: "#214D3C",
                                borderColor: "#214D3C",
                            }}
                        >
                            Send message to VateGPT
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomePage;