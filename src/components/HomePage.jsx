import React from 'react';
import { Button, Typography, Layout, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function HomePage() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 40px',
        }}
      >
        <Title style={{ color: 'white', margin: 0 }} level={3}>
          📦 Stok Takip Sistemi
        </Title>
        <Button
          onClick={logout}
          style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none' }}
        >
          Çıkış Yap
        </Button>
      </Header>

      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <Title level={2} style={{ color: '#333', marginBottom: 10 }}>
          Hoş geldin, admin 👋
        </Title>

        <Text style={{ fontSize: '16px', color: '#555' }}>
          Buradan ürün yönetimi işlemlerini gerçekleştirebilirsiniz.
        </Text>
        <br />
        <Text strong style={{ color: '#888' }}>
          Lütfen ürün fiyatlarını Türk Lirası (₺) cinsinden giriniz.
        </Text>

        <Space direction="vertical" style={{ marginTop: 40 }}>
          <Button
            type="primary"
            size="large"
            style={{
              width: 200,
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
              fontWeight: 'bold',
            }}
            onClick={() => navigate('/add')}
          >
            ➕ Yeni Ürün Ekle
          </Button>

          <Button
            type="default"
            size="large"
            style={{
              width: 200,
              borderColor: '#1890ff',
              color: '#1890ff',
              fontWeight: 'bold',
            }}
            onClick={() => navigate('/list')}
          >
            📄 Ürün Listesi
          </Button>
        </Space>
      </Content>
    </Layout>
  );
}

export default HomePage;
