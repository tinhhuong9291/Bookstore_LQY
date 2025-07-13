import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";
import dayjs from "dayjs";

interface RevenueData {
  dailyRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  totalOrders: number;
  topSellingBooks: Array<{
    _id: string;
    title: string;
    soldCount: number;
    revenue: number;
  }>;
}

const RevenueReport = () => {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("daily");

  useEffect(() => {
    fetchRevenueData();
  }, [dateRange]);

  const fetchRevenueData = async () => {
    try {
      const response = await API.get(`/orders/revenue?range=${dateRange}`);
      setRevenueData(response.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Báo cáo doanh thu</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">
              Doanh thu hôm nay
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {revenueData?.dailyRevenue?.toLocaleString("vi-VN")}đ
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">
              Doanh thu tháng này
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {revenueData?.monthlyRevenue?.toLocaleString("vi-VN")}đ
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">
              Tổng số đơn hàng
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {revenueData?.totalOrders}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Sách bán chạy
          </h3>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tên sách
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Số lượng đã bán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Doanh thu
                </th>
              </tr>
            </thead>
            <tbody>
              {revenueData?.topSellingBooks.map((book) => (
                <tr key={book._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.soldCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.revenue.toLocaleString("vi-VN")}đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RevenueReport;
