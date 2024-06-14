import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GenericTable, { Column } from '@/components/GenericsTable';

interface User {
    id: string;
    name: string;
    nickname: string;
    email: string;
    createdAt: string;
    password?: string;
}

const UsersContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        const usersData = response.data.data;
        console.log('Users Fetched', usersData)
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchUsers();
  }, []);

  const columns: Column<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'nickname', header: 'Nickname' },
    { key: 'email', header: 'Email' },
    { key: 'createdAt', header: 'Created At' },
  ];

  return (
    <GenericTable 
      data={users}
      columns={columns}
      itemsPerPage={10}
      searchKey="name"
    />
  );
};

export default UsersContent;
