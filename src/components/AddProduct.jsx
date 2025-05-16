import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Typography, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Title } = Typography;

function AddProduct() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const newProduct = {
        ...values,
        id: Date.now(),
      };

      // Ruaj në localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      existingProducts.push(newProduct);
      localStorage.setItem('products', JSON.stringify(existingProducts));

      // Dërgo në Google Sheets
      await fetch('https://script.google.com/macros/s/AKfycbzEc62JDAju-r1ah_yCRONJEHBQUJKD-chWG5dBjeI7BSvHARkr7x6L5vQ5bm0V2kISEw/exec', {
        method: 'POST',
        body: JSON.stringify(newProduct),
      });

      message.success("Ürün başarıyla eklendi!");
      form.resetFields();
      navigate('/list');
    } catch (error) {
      console.error(error);
      message.error("Hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => navigate("/home");

  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: 600, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <ArrowLeftOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 10 }} onClick={goBack} />
          <Title level={3}><ShoppingCartOutlined /> Yeni Ürün Ekle</Title>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ price: null }}
        >
          <Form.Item
            label="Ürün Adı"
            name="name"
            rules={[{ required: true, message: "Ürün adı gerekli!" }]}
          >
            <Input placeholder="Örn: Şampuan" />
          </Form.Item>

          <Form.Item
            label="Fiyat (₺)"
            name="price"
            rules={[{ required: true, message: "Fiyat gerekli!" }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Örn: 99.99" addonAfter="₺" />
          </Form.Item>

          <Form.Item
            label="Stok Adedi"
            name="stock"
            rules={[{ required: true, message: "Stok adedi gerekli!" }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Örn: 20" />
          </Form.Item>

          <Form.Item
            label="Barkod (opsiyonel)"
            name="barcode"
          >
            <Input placeholder="Örn: 1234567890" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Ürünü Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AddProduct;
