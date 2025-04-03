import { AlertTriangle, ArrowDown, ArrowUp, BarChart3, Package, PlusCircle, Settings } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/layout/Header';
import { Button } from '../components/ui/button';
import styles from './styles/FeedManagement.module.css';

const FeedManagement = () => {
  const [feedStock] = useState([
    { id: 1, type: 'Layer Feed', quantity: 500, unit: 'kg', minStock: 100, trend: 'up', change: '+12%' },
    { id: 2, type: 'Starter Feed', quantity: 300, unit: 'kg', minStock: 75, trend: 'down', change: '-8%' },
    { id: 3, type: 'Grower Feed', quantity: 400, unit: 'kg', minStock: 80, trend: 'up', change: '+5%' },
  ]);

  const totalStock = feedStock.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>Feed Management</h1>
            <Button className={styles.settingsButton}>
              <Settings size={20} />
              Settings
            </Button>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statsCard}>
              <div className={styles.statsIcon}>
                <BarChart3 size={24} />
              </div>
              <div className={styles.statsInfo}>
                <h3>Total Feed Stock</h3>
                <p className={styles.statsValue}>{totalStock}<span>kg</span></p>
                <div className={styles.statsTrend}>
                  <ArrowUp className={styles.trendUp} /> +3.2% from last week
                </div>
              </div>
            </div>

            <div className={`${styles.statsCard} ${styles.warningCard}`}>
              <div className={styles.statsIcon}>
                <AlertTriangle size={24} />
              </div>
              <div className={styles.statsInfo}>
                <h3>Low Stock Alerts</h3>
                <p className={styles.statsValue}>2</p>
                <p className={styles.statsSubtext}>Items need attention</p>
              </div>
            </div>
          </div>

          <div className={styles.mainCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <Package className={styles.cardIcon} />
                <h2>Feed Administration</h2>
              </div>
              <Button className={styles.addButton}>
                <PlusCircle size={20} />
                Add New Feed
              </Button>
            </div>

            <form className={styles.feedForm}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Feed Type</label>
                  <select className={styles.select}>
                    <option>Layer Feed</option>
                    <option>Starter Feed</option>
                    <option>Grower Feed</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Quantity (kg)</label>
                  <input type="number" className={styles.input} placeholder="Enter amount" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Date</label>
                  <input type="date" className={styles.input} />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Notes</label>
                <textarea className={styles.textarea} placeholder="Add feeding observations..." />
              </div>
              <Button className={styles.submitButton}>Log Administration</Button>
            </form>
          </div>

          <div className={styles.stockGrid}>
            {feedStock.map((feed) => (
              <div
                key={feed.id}
                className={`${styles.stockCard} ${
                  feed.quantity <= feed.minStock ? styles.lowStock : ''
                }`}
              >
                <div className={styles.stockHeader}>
                  <h3>{feed.type}</h3>
                  {feed.quantity <= feed.minStock && (
                    <span className={styles.stockAlert}>Low Stock</span>
                  )}
                </div>
                <div className={styles.stockInfo}>
                  <div className={styles.stockQuantity}>
                    {feed.quantity}
                    <span className={styles.unit}>{feed.unit}</span>
                  </div>
                  <div className={styles.stockMeta}>
                    <p>Minimum: {feed.minStock} {feed.unit}</p>
                    <div className={`${styles.stockTrend} ${
                      feed.trend === 'up' ? styles.trendUp : styles.trendDown
                    }`}>
                      {feed.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      {feed.change}
                    </div>
                  </div>
                </div>
                <Button className={styles.updateButton}>Update Stock</Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedManagement;