'use client';

import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Active', joinDate: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Moderator', status: 'Active', joinDate: '2024-01-25' },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'User', status: 'Inactive', joinDate: '2024-02-01' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'User', status: 'Pending', joinDate: '2024-02-05' },
    { id: 6, name: 'Diana Davis', email: 'diana.davis@example.com', role: 'Admin', status: 'Active', joinDate: '2024-02-10' },
    { id: 7, name: 'Edward Miller', email: 'edward.miller@example.com', role: 'User', status: 'Active', joinDate: '2024-02-15' },
    { id: 8, name: 'Fiona Garcia', email: 'fiona.garcia@example.com', role: 'Moderator', status: 'Active', joinDate: '2024-02-20' },
    { id: 9, name: 'George Taylor', email: 'george.taylor@example.com', role: 'User', status: 'Inactive', joinDate: '2024-02-25' },
    { id: 10, name: 'Helen Anderson', email: 'helen.anderson@example.com', role: 'User', status: 'Pending', joinDate: '2024-03-01' },
  ]);

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive' | 'Pending';
  }>({
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
  });

  const deleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const addUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const user: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      status: newUser.status,
      joinDate: new Date().toISOString().split('T')[0],
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'User', status: 'Active' });
    setIsAddingUser(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Moderator':
        return 'bg-blue-100 text-blue-800';
      case 'User':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage your users and their permissions</p>
        </div>
        <button
          onClick={() => setIsAddingUser(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <span>+</span>
          Add User
        </button>
      </div>

      {/* Add User Modal */}
      {isAddingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New User</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value as User['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addUser}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200"
              >
                Add User
              </button>
              <button
                onClick={() => setIsAddingUser(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'Active').length}</p>
            <p className="text-sm text-gray-500">Active</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">{users.filter(u => u.status === 'Pending').length}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'Inactive').length}</p>
            <p className="text-sm text-gray-500">Inactive</p>
          </div>
        </div>
      </div>
    </div>
  );
}