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
import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";

const BookingDetail = () => {
  const { bookinId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const getBookingStatus = (status) => {
    switch (status) {
      case "NOTYET":
        return "Chưa diễn ra";
      case "PENDING":
        return "Đang diễn ra";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };
  const getBookingStatusPaid = (status) => {
    switch (status) {
      case "PAIDALL":
        return "Thanh toán toàn bộ";
      case "DEPOSIT":
        return "Đặt cọc";
      case "UNPAID":
        return "Chưa thanh toán";
      case "FAILED":
        return "Thanh toán thất bại";
      default:
        return "Không xác định";
    }
  };
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
  }, [API_URL, bookinId]);

  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <Sidebar />
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
                  <strong>Dịch vụ chọn:</strong> {data.optinalServiceName}
                </Typography>
                <Typography variant="body1">
                  <strong>Thú cưng:</strong> {data.petName}
                </Typography>
                <Typography variant="body1">
                  <strong>Họ tên đầy đủ:</strong> {data.fullName}
                </Typography>
                <Typography variant="body1">
                  <strong>Ngày đặt:</strong> {data.bookingDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Giờ bắt đầu:</strong> {data.startTime}
                </Typography>
                <Typography variant="body1">
                  <strong>Giờ kết thúc:</strong> {data.endTime}
                </Typography>
                <Typography variant="body1">
                  <strong>Ngày kết thúc:</strong> {data.endDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Tổng số lượng:</strong> {data.totalAmount}
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    data.bookingStatus === "PENDING"
                      ? "warning.main"
                      : "success.main"
                  }
                >
                  <strong>Trạng thái:</strong>{" "}
                  {getBookingStatus(data.bookingStatus)}
                </Typography>
                <Typography
                  variant="body1"
                  color={data.bookingStatusPaid ? "success.main" : "error.main"}
                >
                  <strong>Thanh toán:</strong>{" "}
                  {getBookingStatusPaid(data.bookingStatusPaid)}
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

export default BookingDetail;
