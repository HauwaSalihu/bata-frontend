import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserStats } from "../../utils/api/user_api";
import { getOrderStats } from "../../utils/api/order";
import { getSaleStats } from "../../utils/api/sale";
import { getProductStats } from "../../utils/api/product";
import { addNotification } from "../../utils/slicers/notificationSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: null,
    orders: null,
    sales: null,
    products: null
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [userStats, orderStats, saleStats, productStats] = await Promise.all([
        getUserStats(),
        getOrderStats({}),
        getSaleStats({}),
        getProductStats({})
      ]);

      setStats({
        users: userStats.status ? userStats.data : null,
        orders: orderStats.status ? orderStats.data : null,
        sales: saleStats.status ? saleStats.data : null,
        products: productStats.status ? productStats.data : null
      });
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Failed to fetch dashboard statistics"
      }));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-medium mb-8">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Today's Revenue</h3>
          <p className="text-2xl font-semibold mt-2">
            ₦{stats.orders?.todayRevenue?.toLocaleString() || 0}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            {stats.orders?.todayOrders || 0} orders today
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Active Products</h3>
          <p className="text-2xl font-semibold mt-2">
            {stats.products?.publishedProducts || 0}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            {stats.products?.lowStockProducts || 0} low stock items
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Active Sales</h3>
          <p className="text-2xl font-semibold mt-2">
            {stats.sales?.activeSales || 0}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Avg {stats.sales?.averageDiscount?.toFixed(1) || 0}% discount
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-semibold mt-2">
            {stats.users?.totalUsers || 0}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            {stats.users?.newUsersLast30Days || 0} new in 30 days
          </div>
        </div>
      </div>

      {/* Detailed Stats Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Product Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium mb-4">Product Overview</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Published</div>
                <div className="text-lg font-medium">
                  {stats.products?.publishedProducts || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Draft</div>
                <div className="text-lg font-medium">
                  {stats.products?.draftProducts || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Variations</div>
                <div className="text-lg font-medium">
                  {stats.products?.totalVariations || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Average Price</div>
                <div className="text-lg font-medium">
                  ₦{stats.products?.averagePrice?.toLocaleString() || 0}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Stock Status</span>
                <span className="text-sm font-medium">
                  {stats.products?.lowStockPercentage}% Low Stock
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${stats.products?.lowStockPercentage || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium mb-4">User Overview</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Total Users</div>
                <div className="text-lg font-medium">
                  {stats.users?.totalUsers || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Active Users</div>
                <div className="text-lg font-medium">
                  {stats.users?.activeUsers || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Verified Users</div>
                <div className="text-lg font-medium">
                  {stats.users?.verifiedUsers || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">New Users (30d)</div>
                <div className="text-lg font-medium">
                  {stats.users?.newUsersLast30Days || 0}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex gap-2 flex-wrap">
                <div className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800">
                  {stats.users?.adminCount || 0} Admin
                </div>
                <div className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {stats.users?.staffCount || 0} Staff
                </div>
                <div className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  {stats.users?.customerCount || 0} Customers
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Active Sales</div>
                <div className="text-lg font-medium">
                  {stats.sales?.activeSales || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Products on Sale</div>
                <div className="text-lg font-medium">
                  {stats.sales?.totalProductsOnSale || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Average Discount</div>
                <div className="text-lg font-medium">
                  {stats.sales?.averageDiscount?.toFixed(1) || 0}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Recent Sales (30d)</div>
                <div className="text-lg font-medium">
                  {stats.sales?.recentSales || 0}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex gap-2 flex-wrap">
                {Object.entries(stats.sales?.salesByStatus || {}).map(([status, count]) => (
                  <div
                    key={status}
                    className={`px-3 py-1 text-sm rounded-full ${
                      status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : status === 'ended'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {count} {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium mb-4">Order Overview</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Total Orders</div>
                <div className="text-lg font-medium">
                  {stats.orders?.totalOrders || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="text-lg font-medium">
                  ₦{stats.orders?.totalRevenue?.toLocaleString() || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Average Order Value</div>
                <div className="text-lg font-medium">
                  ₦{stats.orders?.avgOrderValue?.toLocaleString() || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Pending Orders</div>
                <div className="text-lg font-medium">
                  {stats.orders?.pendingOrders || 0}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex gap-2 flex-wrap">
                <div className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                  {stats.orders?.pendingOrders || 0} Pending
                </div>
                <div className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {stats.orders?.processingOrders || 0} Processing
                </div>
                <div className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  {stats.orders?.completedOrders || 0} Completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;