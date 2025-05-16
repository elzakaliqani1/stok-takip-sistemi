import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ÜrünListesi = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    message.success('Ürün başarıyla silindi!');
  };

  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fiyat (₺)',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `₺${text}`,
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Barkod',
      dataIndex: 'barcode',
      key: 'barcode',
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (text, record, index) => (
        <>
          <Popconfirm
            title="Bu ürünü silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(index)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px' }}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/home')}
        style={{ marginBottom: 20 }}
      >
        Geri Dön
      </Button>

      <h2>Ürün Listesi</h2>
      <Table
        dataSource={products.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
        bordered
      />
    </div>
  );
};

export default ÜrünListesi;
