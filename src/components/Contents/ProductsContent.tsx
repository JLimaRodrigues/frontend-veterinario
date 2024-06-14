import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        const productsData = response.data.data;
        setProducts(productsData);
        setFilteredProducts(productsData);
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

  const toggleExpandRow = (id: string) => {
    setExpandedRows(prevExpandedRows => {
      const newExpandedRows = new Set(prevExpandedRows);
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id);
      } else {
        newExpandedRows.add(id);
      }
      return newExpandedRows;
    });
  };

  return (
    <div className="flex-1 p-4 dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Products Page</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 dark:text-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('name')}>
                Name
              </th>
              <th className="py-2 px-4 border-b cursor-pointer hidden sm:table-cell" onClick={() => handleSort('description')}>
                Description
              </th>
              <th className="py-2 px-4 border-b cursor-pointer hidden sm:table-cell" onClick={() => handleSort('createdAt')}>
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
                <React.Fragment key={product.id}>
                  <tr>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center justify-between">
                        {product.name}
                        <button className="sm:hidden" onClick={() => toggleExpandRow(product.id)}>
                          <FontAwesomeIcon icon={expandedRows.has(product.id) ? faMinus : faPlus} />
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b hidden sm:table-cell">{product.description}</td>
                    <td className="py-2 px-4 border-b hidden sm:table-cell">{product.createdAt}</td>
                  </tr>
                  {expandedRows.has(product.id) && (
                    <tr className="sm:hidden">
                      <td colSpan={3} className="py-2 px-4 border-b">
                        <div className="flex flex-col">
                          <div><strong>Description:</strong> {product.description}</div>
                          <div><strong>Created At:</strong> {product.createdAt}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
              className={`mx-1 px-3 py-1 border rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-black dark:bg-gray-700 dark:text-gray-200'}`}
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
