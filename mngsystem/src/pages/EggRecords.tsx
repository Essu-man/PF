import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Header from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Download, Filter, ArrowLeft, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/EggRecords.module.css';

const EggRecords: React.FC = () => {
  const navigate = useNavigate();

  // Sample data - replace with actual data
  const weeklyRecords = [
    {
      date: '2024-02-20',
      houseId: 'H-001',
      sizes: {
        Peewee: 50,
        Small: 150,
        Medium: 300,
        Large: 400,
        'Extra Large': 200,
        Jumbo: 100
      },
      total: 1200,
      notes: 'Normal production day'
    },
    // Add more days...
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden pl-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className={styles.recordsContainer}>
            <div className={styles.headerSection}>
              <div className={styles.titleGroup}>
                <Button
                  variant="ghost"
                  className={styles.backButton}
                  onClick={() => navigate('/egg-logging')}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className={styles.pageTitle}>Egg Production Records</h1>
              </div>

              <div className={styles.searchSection}>
                <div className={styles.searchBar}>
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    className={styles.searchInput}
                  />
                </div>
                <div className={styles.actionButtons}>
                  <Button className={styles.dateButton}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 7 Days
                  </Button>
                  <Button className={styles.filterButton}>
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button className={styles.exportButton}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Card className={styles.tableCard}>
              <CardHeader>
                <CardTitle>Production History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.tableWrapper}>
                  <table className={styles.recordsTable}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>House ID</th>
                        <th>Peewee</th>
                        <th>Small</th>
                        <th>Medium</th>
                        <th>Large</th>
                        <th>Extra Large</th>
                        <th>Jumbo</th>
                        <th>Total</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyRecords.map((record, index) => (
                        <tr key={index}>
                          <td>{new Date(record.date).toLocaleDateString()}</td>
                          <td>{record.houseId}</td>
                          <td>{record.sizes.Peewee}</td>
                          <td>{record.sizes.Small}</td>
                          <td>{record.sizes.Medium}</td>
                          <td>{record.sizes.Large}</td>
                          <td>{record.sizes['Extra Large']}</td>
                          <td>{record.sizes.Jumbo}</td>
                          <td className={styles.totalColumn}>{record.total}</td>
                          <td>
                            <div className={styles.notesCell}>{record.notes}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EggRecords;