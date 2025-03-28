import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

interface FeedInventoryItem {
  id: string;
  type: string;
  currentStock: number;
  lastRestocked: Date;
}

const FeedManagement: React.FC = () => {
  const [feedInventory, setFeedInventory] = useState<FeedInventoryItem[]>([
    {
      id: '1',
      type: 'Layer Feed',
      currentStock: 500,
      lastRestocked: new Date()
    },
    {
      id: '2',
      type: 'Starter Feed',
      currentStock: 300,
      lastRestocked: new Date()
    }
  ]);

  const [newFeedType, setNewFeedType] = useState('');
  const [newFeedStock, setNewFeedStock] = useState('');

  const addFeedInventory = () => {
    if (newFeedType && newFeedStock) {
      const newItem: FeedInventoryItem = {
        id: String(feedInventory.length + 1),
        type: newFeedType,
        currentStock: Number(newFeedStock),
        lastRestocked: new Date()
      };
      setFeedInventory([...feedInventory, newItem]);
      setNewFeedType('');
      setNewFeedStock('');
    }
  };

  const updateStock = (id: string, amount: number) => {
    setFeedInventory(feedInventory.map(item =>
      item.id === id
        ? { ...item, currentStock: item.currentStock + amount }
        : item
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feed Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedInventory.map((feed) => (
              <div
                key={feed.id}
                className={`p-4 rounded ${feed.currentStock < 200 ? 'bg-red-100' : 'bg-green-100'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{feed.type}</h3>
                    <p>Current Stock: {feed.currentStock} kg</p>
                    <p>Last Restocked: {feed.lastRestocked.toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => updateStock(feed.id, -50)}
                    >
                      -50 kg
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => updateStock(feed.id, 50)}
                    >
                      +50 kg
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Feed Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Feed Type"
              value={newFeedType}
              onChange={(e) => setNewFeedType(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Initial Stock"
              value={newFeedStock}
              onChange={(e) => setNewFeedStock(e.target.value)}
            />
            <Button onClick={addFeedInventory}>Add Feed</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedManagement;