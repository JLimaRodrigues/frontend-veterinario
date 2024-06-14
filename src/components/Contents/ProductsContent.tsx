import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GenericTable, { Column } from '@/components/GenericsTable';

interface ImagesProducts {
  id: number;
  path: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  images: ImagesProducts[];
}

const ProductsContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        const productsData = response.data.data;
        console.log('Products Fetched', productsData)
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const columns: Column<Product>[] = [
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { key: 'createdAt', header: 'Created At' },
  ];

  return (
    <GenericTable 
      data={products}
      columns={columns}
      itemsPerPage={10}
      searchKey="name"
    />
  );
};

export default ProductsContent;
