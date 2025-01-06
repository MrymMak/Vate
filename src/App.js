import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Settings from './pages/Settings';

const { Content, Footer } = Layout;

const App = () => {
    return (
        <Router>
            <Layout>
                <Navbar />
                <Content style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Vate ©2025</Footer>
            </Layout>
        </Router>
    );
};

export default App;