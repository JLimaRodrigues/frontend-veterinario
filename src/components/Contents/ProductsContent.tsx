import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GenericTable, { Column } from '@/components/GenericsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  const handleEdit = (id: string) => {
    console.log('Edit product with id:', id);
    // Lógica para editar o produto
    // Você pode redirecionar para uma página de edição ou abrir um modal
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('Delete product with id:', id);
      // Lógica para excluir o produto
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const columns: Column<Product>[] = [
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { key: 'createdAt', header: 'Created At' },
    {
      key: 'actions',
      header: 'Actions',
      render: (product: Product) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(product.id)} className="text-blue-500">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => handleDelete(product.id)} className="text-red-500">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
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
