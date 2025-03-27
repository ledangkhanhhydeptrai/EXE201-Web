import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider
} from "@mui/material";
import Header from "../../Header/Header";
import styles from "./UserDetail.module.scss";
import Footer from "../../Footer/Footer";

const UserDetail = () => {
  const { bookinId } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookingpetservice.onrender.com/api/booking/v1/getBookingDetailByIdByUser/${bookinId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
          }
        );
        if (response.status >= 200 && response.status < 300) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchData();
  }, [bookinId]);

  if (!data) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Đang tải dữ liệu...
        </Typography>
      </Container>
    );
  }

  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <Container className={styles.container} sx={{ mt: 4 }}>
          <Card sx={{ maxWidth: 700, mx: "auto", p: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Thông tin chi tiết
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                {/* Cột 1 */}
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>ID:</strong> {data.bookinId}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Ngày đặt:</strong> {data.bookingDate}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Trạng thái:</strong> {data.bookingStatus}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Thanh toán:</strong>{" "}
                    {data.bookingStatusPaid
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Khách hàng:</strong> {data.fullName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>SĐT:</strong> {data.phone}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Địa chỉ:</strong> {data.address}
                  </Typography>
                </Grid>

                {/* Cột 2 */}
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Dịch vụ:</strong> {data.serviceName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Giá:</strong> {data.price} VNĐ
                  </Typography>
                  <Typography variant="body1">
                    <strong>Mô tả:</strong> {data.serviceDescription}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {data.paymentMethodEnum}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Ngày tạo:</strong> {data.createAt}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Avatar */}
              {data.userAvatar && (
                <Grid container justifyContent="center">
                  <Avatar
                    src={data.userAvatar}
                    sx={{ width: 80, height: 80 }}
                  />
                </Grid>
              )}

              {/* Nút quay lại */}
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                >
                  Quay Lại
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default UserDetail;
