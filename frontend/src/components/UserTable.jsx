import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { error } from '../services/alert';


const UserTable = ({ users, fetchUsers }) => {
    const deleteUser = async (userId) => {
        try {
          await axios.delete(`/users/${userId}`);
          error('User deleted successfully');
          fetchUsers();
        } catch (error) {
          error('Error deleting user');
        }
      };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <Button color="danger" onClick={() => deleteUser(user.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
