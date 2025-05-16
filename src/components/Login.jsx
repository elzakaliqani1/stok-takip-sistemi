import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, Card, message } from 'antd';

const { Title } = Typography;

function Login({ setUser }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    const { email, password } = values;

    setTimeout(() => {
      if (email === 'admin' && password === '1234') {
        const userData = { email };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/home');
      } else {
        message.error('Kullanıcı adı veya şifre yanlış!');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Katrore dekorativë në sfond */}
      <div className="decor-square square-large top-left"></div>
      <div className="decor-square square-small top-right"></div>
      <div className="decor-square square-small bottom-left"></div>
      <div className="decor-square square-large bottom-right"></div>

      {/* Karta e login-it */}
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: 300, zIndex: 1 }}>
          <Title level={3} style={{ textAlign: 'center' }}>Giriş Yap</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name="email"
              rules={[{ required: true, message: 'Kullanıcı adı girin!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Şifre"
              name="password"
              rules={[{ required: true, message: 'Şifre girin!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Giriş
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Login;
