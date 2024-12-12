import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  getAllUsers,
  getUserStats,
  searchUsers,
  updateUser
} from "../../utils/api/user_api";
import { addNotification } from "../../utils/slicers/notificationSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      handleSearch();
    } else {
      fetchUsers();
    }
  }, [currentPage, search]);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await getUserStats();
      if (response.status) {
        setStats(response.data);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Failed to fetch user statistics"
      }));
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers({
        params: {
          page: currentPage,
          limit: 10
        }
      });

      if (response.status) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Failed to fetch users"
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      const response = await searchUsers({
        params: {
          query: search,
          page: currentPage,
          limit: 10
        }
      });

      if (response.status) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Failed to search users"
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = async (userId) => {
    const updates = {
      name: editingUser.name,
      phone: editingUser.phone,
      accountType: editingUser.accountType,
      isActive: editingUser.isActive,
      billing: {
        address: editingUser.billing?.address || '',
        city: editingUser.billing?.city || '',
        state: editingUser.billing?.state || '',
        zipCode: editingUser.billing?.zipCode || ''
      }
    };

    try {
      const response = await updateUser({ userId, data: updates });

      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "User updated successfully"
        }));
        fetchUsers();
        fetchStats();
        setShowModal(false);
        setEditingUser(null);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to update user"
      }));
    }
  };

  const getAccountTypeColor = (type) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      staff: "bg-blue-100 text-blue-800",
      customer: "bg-green-100 text-green-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-8">
      {/* Stats Cards */}
      {!statsLoading && stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="text-2xl font-semibold mt-2">{stats.totalUsers}</p>
              <div className="mt-2 text-sm text-gray-500">
                {stats.newUsersLast30Days} new in last 30 days
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500">Active/Verified</h3>
              <p className="text-2xl font-semibold mt-2">
                {stats.activeUsers}/{stats.verifiedUsers}
              </p>
              <div className="mt-2 text-sm text-gray-500">
                {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% active
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500">User Types</h3>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                  {stats.adminCount} Admin
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {stats.staffCount} Staff
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {stats.customerCount} Customer
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500">Growth Rate</h3>
              <p className="text-2xl font-semibold mt-2">
                {((stats.newUsersLast30Days / stats.totalUsers) * 100).toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-gray-500">
                In last 30 days
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name, email, or phone..."
          className="w-full md:w-96 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getAccountTypeColor(user.accountType)
                    }`}>
                      {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(pagination.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`
                    px-4 py-2 rounded
                    ${currentPage === index + 1
                      ? 'bg-[#db4444] text-white'
                      : 'border hover:bg-red-50'
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Edit User</h3>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    value={editingUser.accountType}
                    onChange={(e) => setEditingUser(prev => ({
                      ...prev,
                      accountType: e.target.value
                    }))}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  >
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editingUser.isActive ? "active" : "inactive"}
                    onChange={(e) => setEditingUser(prev => ({
                      ...prev,
                      isActive: e.target.value === "active"
                    }))}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Address
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingUser.billing?.address || ''}
                      onChange={(e) => setEditingUser(prev => ({
                        ...prev,
                        billing: { ...prev.billing, address: e.target.value }
                      }))}
                      placeholder="Street Address"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                    />
                    <input
                      type="text"
                      value={editingUser.billing?.city || ''}
                      onChange={(e) => setEditingUser(prev => ({
                        ...prev,
                        billing: { ...prev.billing, city: e.target.value }
                      }))}
                      placeholder="City"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                    />
                    <input
                      type="text"
                      value={editingUser.billing?.state || ''}
                      onChange={(e) => setEditingUser(prev => ({
                        ...prev,
                        billing: { ...prev.billing, state: e.target.value }
                      }))}
                      placeholder="State"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                    />
                    <input
                      type="text"
                      value={editingUser.billing?.zipCode || ''}
                      onChange={(e) => setEditingUser(prev => ({
                        ...prev,
                        billing: { ...prev.billing, zipCode: e.target.value }
                      }))}
                      placeholder="ZIP Code"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateUser(editingUser._id)}
                  className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;