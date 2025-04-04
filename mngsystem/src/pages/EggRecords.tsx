import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Header from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Download, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/EggRecords.module.css';

const EggRecords: React.FC = () => {
  const navigate = useNavigate();

  // Sample data - replace with actual data from your backend
  const monthlyData = [
    { month: 'Jan', total: 2100, large: 800, medium: 700, small: 600 },
    { month: 'Feb', total: 2300, large: 900, medium: 800, small: 600 },
    // ... add more months
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden pl-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className={styles.recordsContainer}>
            <div className={styles.headerSection}>
              <Button
                variant="ghost"
                className={styles.backButton}
                onClick={() => navigate('/egg-logging')}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Logging
              </Button>
              <div className={styles.actionButtons}>
                <Button variant="outline" className={styles.filterButton}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button className={styles.exportButton}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <Card className={styles.trendChart}>
                <CardHeader>
                  <CardTitle>Production Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#22c55e"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={styles.distributionChart}>
                <CardHeader>
                  <CardTitle>Size Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="large" fill="#22c55e" />
                      <Bar dataKey="medium" fill="#84cc16" />
                      <Bar dataKey="small" fill="#bef264" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EggRecords;