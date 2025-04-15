
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import Header from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import styles from './styles/Dashboard.module.css';

const Dashboard = () => {
  const chartRef = useRef(null);

  const productionData = [
    { date: 'Apr 15', production: 400, consumption: 380 },
    { date: 'Apr 16', production: 300, consumption: 290 },
    { date: 'Apr 17', production: 350, consumption: 310 },
    { date: 'Apr 18', production: 450, consumption: 400 },
    { date: 'Apr 19', production: 500, consumption: 450 },
    { date: 'Apr 20', production: 400, consumption: 380 },
    { date: 'Apr 21', production: 350, consumption: 320 },
  ];

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Production', 'Consumption']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: productionData.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Production',
            type: 'bar',
            data: productionData.map(item => item.production),
            color: '#10b981'
          },
          {
            name: 'Consumption',
            type: 'line',
            data: productionData.map(item => item.consumption),
            color: '#f59e0b'
          }
        ]
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, []);

  const recentActivities = [
    { title: 'Egg Collection Completed', time: '2 hours ago', icon: '🥚' },
    { title: 'Feed Distributed', time: '4 hours ago', icon: '🌾' },
    { title: 'Medication Administered', time: '6 hours ago', icon: '💊' },
    { title: 'Health Check Completed', time: '8 hours ago', icon: '✅' },
  ];

  const upcomingTasks = [
    { title: 'Coop Cleaning', date: 'Tomorrow, 8AM', priority: 'High' },
    { title: 'Vaccination', date: 'Apr 25, 2024', priority: 'Medium' },
    { title: 'Feed Delivery', date: 'Apr 26, 2024', priority: 'Medium' },
    { title: 'Monthly Inspection', date: 'Apr 30, 2024', priority: 'Low' },
  ];

  return (
    <>
      <Header />
      <div className={styles.dashboardContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.dashboardHeader}>
            <div className={styles.titleSection}>
              <h1>Dashboard</h1>
              <span className={styles.date}>Thursday, April 10, 2025</span>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.exportButton}>
                <span>Export Data</span>
              </button>
              <button className={styles.newEntryButton}>
                <span>New Entry</span>
              </button>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <Card>
              <CardContent className={styles.statCard}>
                <div className={styles.statHeader}>
                  <p className={styles.statTitle}>Total Egg Production</p>
                  <div className={styles.statValue}>0</div>
                  <p className={styles.statSubtext}>eggs today</p>
                </div>
                <div className={styles.statBottom}>
                  <div className={styles.progressContainer}>
                    <Progress value={65} className="h-1.5 w-full" />
                  </div>
                  <span className={styles.trendPositive}>↑ 12% from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className={styles.statCard}>
                <div className={styles.statHeader}>
                  <p className={styles.statTitle}>Feed Consumption</p>
                  <div className={styles.statValue}>0</div>
                  <p className={styles.statSubtext}>kg today</p>
                </div>
                <div className={styles.statBottom}>
                  <Progress value={45} className="h-1" />
                  <p className={styles.trendNegative}>↓ 5% from yesterday</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className={styles.statCard}>
                <div className={styles.statHeader}>
                  <p className={styles.statTitle}>Active Medications</p>
                  <div className={styles.statValue}>1</div>
                  <p className={styles.statSubtext}>treatments</p>
                </div>
                <div className={styles.statBottom}>
                  <Progress value={80} className="h-1" />
                  <p className={styles.statNote}>Next completion in 5 days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className={styles.statCard}>
                <div className={styles.statHeader}>
                  <p className={styles.statTitle}>Total Birds</p>
                  <div className={styles.statValue}>2,450</div>
                  <p className={styles.statSubtext}>birds</p>
                </div>
                <div className={styles.statBottom}>
                  <Progress value={95} className="h-1" />
                  <p className={styles.trendPositive}>Healthy population</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={styles.chartsSection}>
            <div className={styles.leftSection}>
              <Card className={styles.productionTrends}>
                <CardHeader>
                  <CardTitle>Production Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
                </CardContent>
              </Card>

              <Card className={styles.recentActivities}>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={styles.activitiesList}>
                    {recentActivities.map((activity, index) => (
                      <div key={index} className={styles.activity}>
                        <span className={styles.activityIcon}>{activity.icon}</span>
                        <div className={styles.activityInfo}>
                          <div className={styles.activityTitle}>{activity.title}</div>
                          <div className={styles.activityTime}>{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className={styles.rightSection}>
              <Card className={styles.inventoryStatus}>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={styles.inventoryItem}>
                    <div className={styles.itemLabel}>
                      <span>Egg Production</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className={styles.inventoryItem}>
                    <div className={styles.itemLabel}>
                      <span>Feed Efficiency</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className={styles.inventoryItem}>
                    <div className={styles.itemLabel}>
                      <span>Bird Health</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className={styles.inventoryItem}>
                    <div className={styles.itemLabel}>
                      <span>Mortality Rate</span>
                      <span>2%</span>
                    </div>
                    <Progress value={2} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className={styles.upcomingTasks}>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className={styles.task}>
                      <div className={styles.taskInfo}>
                        <div className={styles.taskTitle}>{task.title}</div>
                        <div className={styles.taskDate}>{task.date}</div>
                      </div>
                      <div className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
                        {task.priority}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;