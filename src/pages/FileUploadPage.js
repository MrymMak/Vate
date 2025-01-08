import React, { useState } from "react";
import { Layout, Button, Upload, message } from "antd";
import { UploadOutlined, CheckOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

const FileUploadPage = () => {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (info) => {
        const { name } = info.file;
        setFileUploaded(true);
        setFile(name);
        message.success(`${name} uploaded successfully.`);
    };

    const uploadProps = {
        beforeUpload: (file) => {
            setFile(file);
            return false; // Prevent automatic upload
        },
        onChange: handleFileChange,
    };

    const handleContinue = async () => {
        if (fileUploaded) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("selectedTemplate", "Your Selected Template");

            try {
                const response = await fetch("http://localhost:5000/api/vategpt", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    // Redirect to VateGPT platform
                    window.location.href = data.url;
                } else {
                    message.error("Failed to process the file. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                message.error("An error occurred while communicating with the server.");
            }
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
                >
                    Vate
                </h2>
            </Sider>

            {/* Main Content */}
            <Layout>
                <Content
                    style={{
                        padding: "20px",
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h2 style={{ color: "#484848" }}>Upload your file</h2>

                    <Upload {...uploadProps} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>

                    <Button
                        type="primary"
                        size="large"
                        onClick={handleContinue}
                        disabled={!fileUploaded}
                        style={{ marginTop: "20px" }}
                    >
                        Continue to VateGPT
                    </Button>
                </Content>
            </Layout>
        </Layout>
    );
};

export default FileUploadPage;