import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import { redirect } from "next/navigation";

import config from "@/payload.config";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  // If no user, redirect to register (this should be handled by middleware, but as backup)
  if (!user) {
    redirect("/register");
  }

  // If user is not active, redirect to suspended page
  if (!user.isActive) {
    redirect("/suspended");
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Selamat Datang, {user.businessName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Kelola bisnis {user.businessType} Anda dengan Simple PoS
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">Penjualan Hari Ini</h3>
              <p className="text-2xl font-bold">Rp 0</p>
            </div>
            
            <div className="bg-success/10 rounded-lg p-4">
              <h3 className="font-semibold text-success mb-2">Total Produk</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
            
            <div className="bg-warning/10 rounded-lg p-4">
              <h3 className="font-semibold text-warning mb-2">Pesanan Pending</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Mulai Kelola Bisnis Anda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-primary text-white rounded-lg p-4 hover:bg-primary/90 transition-colors">
                Tambah Produk
              </button>
              <button className="bg-secondary text-white rounded-lg p-4 hover:bg-secondary/90 transition-colors">
                Kelola Kategori
              </button>
              <button className="bg-success text-white rounded-lg p-4 hover:bg-success/90 transition-colors">
                Buat Pesanan
              </button>
              <button className="bg-warning text-white rounded-lg p-4 hover:bg-warning/90 transition-colors">
                Lihat Laporan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
