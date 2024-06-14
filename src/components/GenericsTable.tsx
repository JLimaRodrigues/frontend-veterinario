import React, { useEffect, useState, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export interface Column<T> {
    key: keyof T;
    header: string;
    render?: (item: T) => ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    itemsPerPage?: number;
    searchKey: keyof T;
}

const GenericTable = <T,>({ data, columns, itemsPerPage = 10, searchKey }: TableProps<T>) => {
    const [filteredData, setFilteredData] = useState<T[]>(data);
    const [searchTerm, setSearchTerm]     = useState('');
    const [sortOrder, setSortOrder]       = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage]   = useState(1);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    useEffect(() => {
        const results = data.filter(item =>
          String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(results);
      }, [searchTerm, data, searchKey]);
    
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSort = (key: keyof T) => {
        const sorted = [...filteredData].sort((a, b) => {
            if(a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
            if(a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        })
        setFilteredData(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    const indexOfLastItem  = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems     = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    const toggleExpandRow  = (index: number) => {
        setExpandedRows(prevExpandedRows => {
            const newExpandedRows = new Set(prevExpandedRows);
            if(newExpandedRows.has(index)){
                newExpandedRows.delete(index);
            } else {
                newExpandedRows.add(index);
            }
            return newExpandedRows;
        });
    }

    return (
        <div className="flex-1 p-4 dark:bg-gray-800 dark:text-gray-200">
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
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 border-b cursor-pointer"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="py-2 px-4 border-b text-center">
                      No records found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        {columns.map((col, colIndex) => (
                          <td key={colIndex} className="py-2 px-4 border-b">
                            <div className="flex items-center justify-between">
                              {col.render ? col.render(item) : String(item[col.key])}
                              {colIndex === 0 && (
                                <button className="sm:hidden" onClick={() => toggleExpandRow(index)}>
                                  <FontAwesomeIcon icon={expandedRows.has(index) ? faMinus : faPlus} />
                                </button>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                      {expandedRows.has(index) && (
                        <tr className="sm:hidden">
                          <td colSpan={columns.length} className="py-2 px-4 border-b">
                            <div className="flex flex-col">
                              {columns.slice(1).map((col, colIndex) => (
                                <div key={colIndex}>
                                  <strong>{col.header}:</strong> {col.render ? col.render(item) : String(item[col.key])}
                                </div>
                              ))}
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
              {currentItems.length > 0 && (
                <span>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
                </span>
              )}
            </div>
            <div>
              {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => i + 1).map(pageNumber => (
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
}

export default GenericTable;

