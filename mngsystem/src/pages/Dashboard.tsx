import * as echarts from "echarts";
import { Calendar, Clock, Download, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import styles from "./styles/Dashboard.module.css";

const productionData = [
  { date: "Apr 10", eggProduction: 380, feedConsumption: 110 },
  { date: "Apr 11", eggProduction: 610, feedConsumption: 200 },
  { date: "Apr 12", eggProduction: 680, feedConsumption: 250 },
  { date: "Apr 13", eggProduction: 730, feedConsumption: 300 },
  { date: "Apr 14", eggProduction: 600, feedConsumption: 100 },
  { date: "Apr 15", eggProduction: 570, feedConsumption: 280 },
  { date: "Apr 16", eggProduction: 360, feedConsumption: 320 },
];

const inventoryData = [
  { name: "Layer Feed", level: 75 },
  { name: "Starter Feed", level: 45 },
  { name: "Vitamins", level: 90 },
  { name: "Egg Cartons", level: 30 },
];

const upcomingTasks = [
  { task: "Coop Cleaning", date: "Today", time: "8:30 AM", priority: "HIGH", icon: '🧹' }, // Added icons
  { task: "Vaccination", date: "Apr 25", time: "10:00 AM", priority: "Medium", icon: '💉' },
  { task: "Feed Delivery", date: "Apr 26", time: "1:00 PM", priority: "Medium", icon: '🚚' },
  { task: "Monthly Inspection", date: "Apr 30", time: "9:00 AM", priority: "Low", icon: '📋' },
];

const recentActivities = [
  { activity: "Egg Collection Completed", details: "425 eggs collected from Coop A", time: "Today, 8:30 AM", icon: '🥚', color: '#e8f2ff', iconColor: '#3b82f6' }, // Added icons and colors
  { activity: "Feed Distributed", details: "250kg of layer feed distributed", time: "Today, 7:15 AM", icon: '🌾', color: '#fef3c7', iconColor: '#d97706' },
  { activity: "Medication Administered", details: "Vitamin supplement added to water", time: "Today, 6:45 AM", icon: '💊', color: '#f3e8ff', iconColor: '#9333ea' },
  { activity: "Health Check Completed", details: "All birds in good condition", time: "Yesterday, 5:30 PM", icon: '✅', color: '#dcfce7', iconColor: '#16a34a' },
];

const Dashboard: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        legend: {
          data: ["Egg Production", "Feed Consumption"],
          top: 10, // Adjust legend position
          right: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: productionData.map((item) => item.date),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Egg Production",
            type: "bar",
            data: productionData.map((item) => item.eggProduction),
            itemStyle: { color: "#22c55e" }, // Green color for bars
          },
          {
            name: "Feed Consumption",
            type: "line",
            smooth: true, // Make line smoother
            data: productionData.map((item) => item.feedConsumption),
            itemStyle: { color: "#f59e0b" }, // Orange color for line
            lineStyle: { width: 3 }, // Thicker line
            symbol: 'circle', // Add circles to points
            symbolSize: 8,
          },
        ],
      };
      chart.setOption(option);

      // Handle chart resize
      const resizeChart = () => chart.resize();
      window.addEventListener('resize', resizeChart);

      // Cleanup on component unmount
      return () => {
        chart.dispose();
        window.removeEventListener('resize', resizeChart);
      };
    }
  }, []);

  // Helper function for badge variants
  const getBadgeVariant = (priority: string): "destructive" | "secondary" | "outline" => {
    switch (priority.toUpperCase()) {
      case 'HIGH': return 'destructive';
      case 'MEDIUM': return 'secondary';
      case 'LOW': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    // Removed Header component call, assuming it's part of a layout wrapper now
    <div className={styles.dashboardContainer}>
      <Header/>
      <header className={styles.dashboardHeader}>
        <div> {/* Group title and date */}
          <h1 className={styles.dashboardTitle}>Dashboard</h1>
          <p className={styles.dashboardDate}>Wednesday, April 16, 2025</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> {/* Use Download icon */}
            Export Data
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> {/* Use Plus icon */}
            New Entry
          </Button>
        </div>
      </header>

      <div className={styles.statsGrid}> {/* Renamed from summaryCards */}
        <Card className={styles.statCard}>
          <CardHeader className={styles.statCardHeader}>
            <CardTitle className={styles.statCardTitle}>Total Egg Production</CardTitle>
          </CardHeader>
          <CardContent className={styles.statCardContent}>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>0</span>
              <span className={styles.statUnit}>eggs today</span>
            </div>
            <Progress value={12} className={styles.statProgress} />
            <p className={`${styles.statTrend} ${styles.trendPositive}`}>
              <TrendingUp className="w-4 h-4 mr-1" /> 12% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className={styles.statCard}>
          <CardHeader className={styles.statCardHeader}>
            <CardTitle className={styles.statCardTitle}>Feed Consumption</CardTitle>
          </CardHeader>
          <CardContent className={styles.statCardContent}>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>0</span>
              <span className={styles.statUnit}>kg today</span>
            </div>
            <Progress value={5} className={styles.statProgress} />
            <p className={`${styles.statTrend} ${styles.trendNegative}`}>
              <TrendingDown className="w-4 h-4 mr-1" /> 5% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className={styles.statCard}>
          <CardHeader className={styles.statCardHeader}>
            <CardTitle className={styles.statCardTitle}>Active Medications</CardTitle>
          </CardHeader>
          <CardContent className={styles.statCardContent}>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>1</span>
              <span className={styles.statUnit}>treatments</span>
            </div>
            <Progress value={40} className={styles.statProgress} /> {/* Example progress */}
            <p className={styles.statNote}>
              Next completion in 5 days
            </p>
          </CardContent>
        </Card>
        <Card className={styles.statCard}>
          <CardHeader className={styles.statCardHeader}>
            <CardTitle className={styles.statCardTitle}>Total Birds</CardTitle>
          </CardHeader>
          <CardContent className={styles.statCardContent}>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>2,450</span>
              <span className={styles.statUnit}>birds</span>
            </div>
            <Progress value={95} className={styles.statProgress} /> {/* Example progress */}
            <p className={`${styles.statTrend} ${styles.trendPositive}`}>
              Healthy population
            </p>
          </CardContent>
        </Card>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}> {/* Renamed */}
          <Card className={styles.chartCard}> {/* Added class */}
            <CardHeader>
              <CardTitle>Production Trends</CardTitle>
              <p className={styles.cardSubtitle}>Daily egg production and feed consumption</p> {/* Added class */}
            </CardHeader>
            <CardContent>
              <div ref={chartRef} style={{ height: "350px", width: "100%" }} /> {/* Increased height slightly */}
            </CardContent>
          </Card>
        </div>

        <div className={styles.rightColumn}> {/* Renamed */}
          <Card className={styles.listCard}> {/* Added class */}
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <p className={styles.cardSubtitle}>Latest farm operations</p>
            </CardHeader>
            <CardContent className={styles.listCardContent}> {/* Added class */}
              {recentActivities.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <div className={styles.activityIconWrapper} style={{ backgroundColor: activity.color }}>
                    <span style={{ color: activity.iconColor }}>{activity.icon}</span>
                  </div>
                  <div className={styles.activityDetails}>
                    <p className={styles.activityTitleText}>{activity.activity}</p> {/* Added class */}
                    <p className={styles.activitySubText}>{activity.details}</p> {/* Added class */}
                    <p className={styles.activityTimeText}>{activity.time}</p> {/* Added class */}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Second Row for Inventory and Tasks */}
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <Card className={styles.listCard}>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <p className={styles.cardSubtitle}>Current stock levels</p>
            </CardHeader>
            <CardContent className={styles.listCardContent}>
              {inventoryData.map((item, index) => (
                <div key={index} className={styles.inventoryItem}>
                  <div className={styles.inventoryLabel}>
                    <span>{item.name}</span>
                    <span>{item.level}%</span>
                  </div>
                  <Progress value={item.level} className={styles.inventoryProgress} /> {/* Added class */}
                </div>
              ))}
              <Button variant="outline" className={styles.viewInventoryButton}> {/* Added class */}
                View Full Inventory
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className={styles.rightColumn}>
          <Card className={styles.listCard}>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <p className={styles.cardSubtitle}>Scheduled farm activities</p>
            </CardHeader>
            <CardContent className={styles.listCardContent}>
              {upcomingTasks.map((task, index) => (
                <div key={index} className={styles.taskItem}>
                   <div className={styles.activityIconWrapper} style={{ backgroundColor: '#e8f2ff' }}> {/* Example color */}
                    <span style={{ color: '#3b82f6' }}>{task.icon}</span>
                  </div>
                  <div className={styles.taskDetails}> {/* Added class */}
                    <p className={styles.activityTitleText}>{task.task}</p>
                    <p className={styles.activitySubText}> {/* Use same style as activity */}
                      <Calendar className="w-3 h-3 mr-1" /> {task.date} <Clock className="w-3 h-3 ml-2 mr-1" /> {task.time}
                    </p>
                  </div>
                  <Badge variant={getBadgeVariant(task.priority)} className={styles.taskBadge}>{task.priority}</Badge> {/* Added class */}
                </div>
              ))}
              {/* Removed Add New Task button to match screenshot */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;