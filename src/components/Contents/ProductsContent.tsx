import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        const productsData = response.data;

        if (Array.isArray(productsData)) {
          setProducts(productsData);
          setFilteredProducts(productsData);
        } else {
          console.error('API response is not an array');
        }
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleSort = (key: keyof Product) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredProducts(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Products Page</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('name')}>
                Name
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('description')}>
                Description
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('createdAt')}>
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-2 px-4 border-b text-center">
                  Não há registros
                </td>
              </tr>
            ) : (
              currentProducts.map(product => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b sm:flex sm:flex-col">
                    {product.name}
                    <button className="sm:hidden">
                      <FontAwesomeIcon icon={FaPlus} />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b sm:flex sm:flex-col">
                    {product.description}
                    <button className="sm:hidden">
                      <FaPlus />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b sm:flex sm:flex-col">
                    {product.createdAt}
                    <button className="sm:hidden">
                      <FaPlus />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          {currentProducts.length > 0 && (
            <span>
              Exibindo {indexOfFirstProduct + 1} a {Math.min(indexOfLastProduct, filteredProducts.length)} de {filteredProducts.length}
            </span>
          )}
        </div>
        <div>
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => i + 1).map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsContent;
