import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";
import styles from "./BookingDetail.module.scss";
import Header1 from "../HeaderAdmin/Header1";
import Sidebar1 from "../Sidebar/Sidebar1";

const BookingDetail1 = () => {
  const { bookinId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    if (!bookinId || isNaN(Number(bookinId))) {
      console.error("❌ ID không hợp lệ:", bookinId);
      setLoading(false);
      return;
    }

    const fetchDataById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/booking/v1/getBookingDetailByIdByAdmin/${bookinId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error(
          "❌ Lỗi khi gọi API:",
          error.response?.status,
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDataById();
  }, [bookinId]);

  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header1 />
        <Sidebar1 />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          {loading ? (
            <CircularProgress />
          ) : data ? (
            <Card sx={{ maxWidth: 500, padding: 3, boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Chi tiết đặt lịch
                </Typography>
                <Typography variant="body1">
                  <strong>ID:</strong> {data.bookinId}
                </Typography>
                <Typography variant="body1">
                  <strong>Dịch vụ:</strong> {data.serviceName}
                </Typography>
                <Typography variant="body1">
                  <strong>Thú cưng:</strong> {data.petName}
                </Typography>
                <Typography variant="body1">
                  <strong>Khách hàng:</strong> {data.fullName}
                </Typography>
                <Typography variant="body1">
                  <strong>Ngày đặt:</strong> {data.bookingDate}
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    data.bookingStatus === "PENDING"
                      ? "warning.main"
                      : "success.main"
                  }
                >
                  <strong>Trạng thái:</strong> {data.bookingStatus}
                </Typography>
                <Typography
                  variant="body1"
                  color={data.bookingStatusPaid ? "success.main" : "error.main"}
                >
                  <strong>Thanh toán:</strong>{" "}
                  {data.bookingStatusPaid ?? "Chưa thanh toán"}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="h6" color="error">
              Không tìm thấy thông tin đặt lịch.
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};

export default BookingDetail1;
