import Header1 from "../HeaderAdmin/Header1";
import Sidebar1 from "../Sidebar/Sidebar1";
import styles from "./Dashboard.module.scss";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Dashboard1() {
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 13000 },
    { month: "May", revenue: 20000 },
    { month: "Jun", revenue: 22000 },
    { month: "Jul", revenue: 19000 },
    { month: "Aug", revenue: 25000 },
    { month: "Sep", revenue: 23000 },
    { month: "Oct", revenue: 27000 },
    { month: "Nov", revenue: 29000 },
    { month: "Dec", revenue: 31000 }
  ];

  return (
    <>
      <Header1 />
      <Sidebar1 />
      <div className={styles.dashboard}>
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>📊 Thống kê doanh thu</h2>
            <div className={styles.revenueSummary}>
              <h3>Tổng doanh thu năm:</h3>
              <p className={styles.revenueAmount}>
                $
                {revenueData
                  .reduce((sum, item) => sum + item.revenue, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className={styles.chartContainer}>
              <h3>📅 Doanh thu theo tháng</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#ff4d4d"
                    barSize={40}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.chartContainer}>
              <h3>📈 Xu hướng doanh thu</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ff4d4d"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
