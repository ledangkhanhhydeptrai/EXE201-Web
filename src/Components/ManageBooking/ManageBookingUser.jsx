import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";
import Header from "../../Header/Header";
import styles from "./ManageBooking.module.scss";

const ManageBookingUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookingpetservice.onrender.com/api/booking/v1/getAllBookingByUser`,
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
        console.error("❌ Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <Box p={3} mt={10}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Quản lý Đặt lịch
          </Typography>

          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>
                      <strong>ID</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Dịch vụ</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Thú cưng</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Khách hàng</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Ngày đặt</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Trạng thái</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Thanh toán</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((booking, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/managebookinguser/${booking.bookinId}`)
                      }
                    >
                      <TableCell>{booking.bookinId}</TableCell>
                      <TableCell>{booking.serviceName}</TableCell>
                      <TableCell>{booking.petName}</TableCell>
                      <TableCell>{booking.fullName}</TableCell>
                      <TableCell>{booking.bookingDate}</TableCell>
                      <TableCell>
                        <Typography
                          color={
                            booking.bookingStatus === "PENDING"
                              ? "warning.main"
                              : "success.main"
                          }
                        >
                          {booking.bookingStatus === "NOTYET" ? (
                            <span>Chưa diễn ra</span>
                          ) : booking.bookingStatus === "PENDING" ? (
                            <span>Đang diễn ra</span>
                          ) : booking.bookingStatus === "COMPLETE" ? (
                            <span>Hoàn thành</span>
                          ) : booking.bookingStatus === "CANCELLED" ? (
                            <span>Đã hủy</span>
                          ) : (
                            <span>Không xác định</span>
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color={
                            booking.bookingStatusPaid
                              ? "success.main"
                              : "error.main"
                          }
                        >
                          {booking.bookingStatusPaid === "DEPOSIT" ? (
                            <span>Đặt cọc</span>
                          ) : booking.bookingStatusPaid === "PAIDALL" ? (
                            <span>Thanh toán toàn bộ</span>
                          ) : booking.bookingStatusPaid === "FAILED" ? (
                            <span>Thanh toán thất bại</span>
                          ) : booking.bookingStatusPaid === "UNPAID" ? (
                            <span>Chưa thanh toán</span>
                          ) : (
                            <span>Không xác định</span>
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </div>
    </div>
  );
};

export default ManageBookingUser;
