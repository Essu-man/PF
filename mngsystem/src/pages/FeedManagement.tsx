// Remove ShoppingBag from imports since it's not used
import { BarChart3, Package, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import styles from './styles/FeedManagement.module.css';

const FeedManagement = () => {
  const [feedStock] = useState([
    { id: 1, type: 'Layer Feed', quantity: 500, unit: 'kg', minStock: 100 },
    { id: 2, type: 'Starter Feed', quantity: 300, unit: 'kg', minStock: 75 },
    { id: 3, type: 'Grower Feed', quantity: 400, unit: 'kg', minStock: 80 },
  ]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="flex-1 flex flex-col overflow-hidden pl-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className={styles.container}>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Feed Stock</p>
                      <h3 className="text-3xl font-bold mt-2">1,200 kg</h3>
                    </div>
                    <BarChart3 className="h-8 w-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              {/* Feed Administration Log Card */}
              <Card className={`${styles.card} shadow-lg`}>
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-green-500" />
                    <CardTitle className="text-2xl">Feed Administration Log</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Feed Type</label>
                        <select className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option>Layer Feed</option>
                          <option>Starter Feed</option>
                          <option>Grower Feed</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Quantity (kg)</label>
                        <Input type="number" placeholder="Enter quantity" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notes</label>
                      <textarea
                        className="w-full min-h-[100px] rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Add any feeding observations..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Log Feed Administration
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div> {/* Close Summary Cards div */}

            {/* Current Stock Overview */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${styles.stockGrid}`}>
              {feedStock.map((feed) => (
                <Card key={feed.id}>
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
                      <div className={`w-full h-full rounded-full ${
                        feed.quantity <= feed.minStock ? 'bg-red-100/50' : 'bg-green-100/50'
                      }`}></div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{feed.type}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-2xl font-bold text-gray-900">
                        {feed.quantity} <span className="text-sm text-gray-500">{feed.unit}</span>
                      </p>
                      <p className="text-sm text-gray-500">Minimum stock: {feed.minStock} {feed.unit}</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Update Stock
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div> {/* Close Stock Overview div */}
          </div> {/* Close container div */}
        </main>
      </div>
    </div>
  );
};

export default FeedManagement;