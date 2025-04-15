import { Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";

const DashboardFor = () => {
  const days = ["08/04", "09/04", "10/04", "11/04", "12/04"];
  const visitors = [10, 25, 17, 30, 22];

  return (
    <div>
      <Header />
      <Sidebar />
      <Card
        sx={{
          width: "100%",
          maxWidth: 1300,
          margin: "40px auto",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          marginLeft: "235px"
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Số lượng người truy cập (5 ngày gần nhất)
          </Typography>

          <BarChart
            xAxis={[{ scaleType: "band", data: days }]}
            series={[
              { data: visitors, label: "Lượt truy cập", color: "#42a5f5" }
            ]}
            width={1300}
            height={400}
            sx={{ marginLeft: "-10px", marginRight: "auto" }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardFor;
