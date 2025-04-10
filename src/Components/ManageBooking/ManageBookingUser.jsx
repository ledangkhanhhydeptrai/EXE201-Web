import { useCallback, useEffect, useState } from "react";
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
  Box,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Pagination
} from "@mui/material";
import Header from "../../Header/Header";
import styles from "./ManageBooking.module.scss";
import Loading from "../Loading/Loading";

const ManageBookingUser = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingStatusPaid, setBookingStatusPaid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const getBookingStatus = (status) => {
    switch (status) {
      case "NOTYET":
        return "Chưa diễn ra";
      case "PENDING":
        return "Đang diễn ra";
      case "COMPLETE":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };
  const getBookingStatusPaid = (status) => {
    switch (status) {
      case "UNPAID":
        return "Chưa thanh toán";
      case "DEPOSIT":
        return "Đặt cọc";
      case "PAIDALL":
        return "Thanh toán toàn bộ";
      case "FAILED":
        return "Thanh toán thất bại";
      default:
        return "Không xác định";
    }
  };

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/booking/v1/getAllBookingByUser`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setData(response.data.data.sort((a, b) => a.bookinId - b.bookinId));
        setCurrentData(response.data.data.slice(0, itemsPerPage));
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchFilteredBookings = useCallback(async () => {
    const params = {};
    if (bookingDate) params.bookingDate = bookingDate;
    if (bookingStatus) params.bookingStatus = bookingStatus;
    if (bookingStatusPaid) params.bookingStatusPaid = bookingStatusPaid;
    console.log("🔥 Params lọc booking gửi đi:", params);

    try {
      const response = await axios.get(
        `${API_URL}/booking/v1/getBookingByUserByDropdown`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          },
          params
        }
      );
      const bookings = response.data.data || [];
      const filtered = bookings.filter((booking) => {
        const matchDate = bookingDate
          ? booking.transactionDateTime.includes(bookingDate)
          : true;
        const matchStatus = bookingStatus
          ? booking.status === bookingStatus
          : true;
        const matchStatusPaid = bookingStatusPaid
          ? booking.bookingStatusPaid === bookingStatusPaid
          : true;
        return matchDate && matchStatus && matchStatusPaid;
      });
      setData(filtered);
      setCurrentData(response.data.data.slice(0, itemsPerPage));
      if (filtered.length > 0) {
        console.log("Không có dữ liệu phù hợp");
      }
    } catch (error) {
      console.error("Lỗi khi lọc danh sách booking:", error);
    }
  }, [bookingDate, bookingStatus, bookingStatusPaid]);
  useEffect(() => {
    fetchAllBookings();
  }, []);
  useEffect(() => {
    fetchFilteredBookings();
  }, [fetchFilteredBookings]);
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    setCurrentData(paginatedData);
  }, [currentPage, data]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={styles.app}>
            <Header />
            <Box p={3} mt={10}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Quản lý Đặt lịch
              </Typography>
              <div className={styles.filters}>
                <TextField
                  label="Ngày đặt chỗ"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className={styles.datePicker}
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl className={styles.select}>
                  <InputLabel>Trạng thái đặt chỗ</InputLabel>
                  <Select
                    value={bookingStatus}
                    onChange={(e) => setBookingStatus(e.target.value)}
                    style={{ width: "300px" }}
                  >
                    <MenuItem value="NOTYET">Chưa diễn ra</MenuItem>
                    <MenuItem value="PENDING">Đang diễn ra</MenuItem>
                    <MenuItem value="COMPLETED">Hoàn thành</MenuItem>
                    <MenuItem value="CANCELLED">Đã hủy</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={styles.select}>
                  <InputLabel>Trạng thái thanh toán</InputLabel>
                  <Select
                    value={bookingStatusPaid}
                    onChange={(e) => setBookingStatusPaid(e.target.value)}
                    style={{ width: "300px" }}
                  >
                    <MenuItem value="PAIDALL">Thanh toán toàn bộ</MenuItem>
                    <MenuItem value="DEPOSIT">Đặt cọc</MenuItem>
                    <MenuItem value="UNPAID">Chưa thanh toán</MenuItem>
                    <MenuItem value="FAILED">Thanh toán thất bại</MenuItem>
                  </Select>
                </FormControl>
              </div>
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
                        <strong>Dịch vụ phụ</strong>
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
                        <strong>Thời gian bắt đầu</strong>
                      </TableCell>
                      {/* <TableCell>
                        <strong>Thời gian kết thúc</strong>
                      </TableCell> */}
                      <TableCell>
                        <strong>Trạng thái</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Trạng thái thanh toán</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Thanh toán</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={11} align="center">
                          <div
                            style={{
                              padding: "40px 0",
                              color: "#999",
                              fontSize: "18px"
                            }}
                          >
                            Không có dữ liệu
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentData.map((booking, index) => (
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
                          <TableCell>
                            {booking.optinalServiceName ?? "không có"}
                          </TableCell>
                          <TableCell>{booking.petName}</TableCell>
                          <TableCell>{booking.fullName}</TableCell>
                          <TableCell>{booking.bookingDate}</TableCell>
                          <TableCell>{booking.startTime}</TableCell>
                          {/* <TableCell>{booking.endTime}</TableCell> */}
                          <TableCell>
                            <Typography
                              color={
                                booking.bookingStatus === "PENDING"
                                  ? "warning.main"
                                  : "success.main"
                              }
                            >
                              {getBookingStatus(booking.bookingStatus)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getBookingStatusPaid(booking.bookingStatusPaid)}
                          </TableCell>
                          <TableCell>
                            {booking.bookingStatus === "NOTYET" && (
                              <button
                                style={{
                                  backgroundColor: "#1976d2",
                                  color: "white",
                                  padding: "6px 12px",
                                  border: "none",
                                  borderRadius: "4px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  cursor: "pointer",
                                  transition:
                                    "background-color 0.3s ease, transform 0.2s ease"
                                }}
                                onMouseOver={(e) =>
                                  (e.target.style.backgroundColor = "#115293")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.backgroundColor = "#1976d2")
                                }
                                onMouseDown={(e) =>
                                  (e.target.style.backgroundColor = "#0d3a7d")
                                }
                                onMouseUp={(e) =>
                                  (e.target.style.backgroundColor = "#115293")
                                }
                              >
                                Thanh toán
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <div className={styles.pagination}>
              <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageBookingUser;
