import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BarChart, DollarSign, ShoppingBag, Users } from 'lucide-react';
import AdminSettings from '../../components/AdminSettings';
import VideoManagement from '../../components/VideoManagement';


export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    orderCount: 0,
    averageOrderValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchOrders(token);
  }, []);

  const fetchOrders = async (token) => {
    try {
      const res = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized');
      }

      const data = await res.json();
      setOrders(data);

      // Statistiken berechnen
      const revenue = data.reduce((sum, order) => sum + order.amount, 0);
      setStats({
        totalRevenue: revenue,
        orderCount: data.length,
        averageOrderValue: data.length ? revenue / data.length : 0,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.message === 'Unauthorized') {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#e3cbaa]">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#e3cbaa]">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Ausloggen
          </button>
        </div>

        {/* Statistik-Karten */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Gesamtumsatz"
            value={`${stats.totalRevenue}€`}
            icon={<DollarSign className="text-[#d0b48f]" size={24} />}
          />
          <StatCard
            title="Bestellungen"
            value={stats.orderCount}
            icon={<ShoppingBag className="text-[#d0b48f]" size={24} />}
          />
          <StatCard
            title="Durchschnittswert"
            value={`${Math.round(stats.averageOrderValue)}€`}
            icon={<BarChart className="text-[#d0b48f]" size={24} />}
          />
        </div>

        {/* Bestellungen Tabelle */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-6 py-3 text-left text-[#e3cbaa]">Bestell-ID</th>
                <th className="px-6 py-3 text-left text-[#e3cbaa]">Datum</th>
                <th className="px-6 py-3 text-left text-[#e3cbaa]">Betrag</th>
                <th className="px-6 py-3 text-left text-[#e3cbaa]">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-800">
                  <td className="px-6 py-4 text-[#d0b48f]">#{order.id}</td>
                  <td className="px-6 py-4 text-white">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-white">{order.amount}€</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded ${
                      order.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-black'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>


  <h1 className="text-2xl mt-24"></h1>
  <VideoManagement />
</div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#e3cbaa] mb-6">Website Einstellungen</h2>
          <AdminSettings />

        </div>




      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#e3cbaa]">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
} 