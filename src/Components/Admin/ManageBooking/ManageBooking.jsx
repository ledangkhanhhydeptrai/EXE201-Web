import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Pagination,
  TextField
} from "@mui/material";
import styles from "./ManageBooking.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../HeaderAdmin/Header";
const ManageBooking = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingStatusPaid, setBookingStatusPaid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  // const getBookingStatus = (status) => {
  //   switch (status) {
  //     case "NOTYET":
  //       return "Chưa diễn ra";
  //     case "PENDING":
  //       return "Đang diễn ra";
  //     case "COMPLETED":
  //       return "Hoàn thành";
  //     case "CANCELLED":
  //       return "Đã hủy";
  //     default:
  //       return "Không xác định";
  //   }
  // };
  // const getBookingStatusPaid = (status) => {
  //   switch (status) {
  //     case "PAIDALL":
  //       return "Thanh toán toàn bộ";
  //     case "DEPOSIT":
  //       return "Đặt cọc";
  //     case "UNPAID":
  //       return "Chưa thanh toán";
  //     case "FAILED":
  //       return "Thanh toán thất bại";
  //     default:
  //       return "Không xác định";
  //   }
  // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAllBookings = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/booking/v1/getAllBookingByAmind`
      );
      setData(response.data.data.sort((a, b) => a.bookinId - b.bookinId));
      setCurrentData(response.data.data.slice(0, itemsPerPage));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách booking:", error);
    }
  });
  const fetchFilteredBookings = useCallback(async () => {
    if (!bookingDate && !bookingStatus && !bookingStatusPaid) {
      fetchAllBookings();
      return;
    }

    const params = {};
    if (bookingDate) params.bookingDate = bookingDate;
    if (bookingStatus) params.bookingStatus = bookingStatus;
    if (bookingStatusPaid) params.bookingStatusPaid = bookingStatusPaid;

    console.log("🔥 Params lọc booking gửi đi:", params);

    try {
      const response = await axios.get(
        `${API_URL}/booking/v1/getBookingByAdmiByDropdown`,
        { params }
      );
      setData(response.data.data);
      setCurrentData(response.data.data.slice(0, itemsPerPage));
    } catch (error) {
      console.error("Lỗi khi lọc danh sách booking:", error);
    }
  }, [
    API_URL,
    bookingDate,
    bookingStatus,
    bookingStatusPaid,
    fetchAllBookings
  ]);

  useEffect(() => {
    fetchFilteredBookings();
  }, [fetchFilteredBookings]);

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);
  
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    setCurrentData(paginatedData);
  }, [currentPage, data]);

  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.container}>
        <div className={styles.filters}>
          <TextField
            label="Ngày đặt chỗ"
            type="date"
            value={bookingDate}
            onChange={(e) => {
              console.log("Ngày vừa chọn:", e.target.value); // Kiểm tra ở đây
              setBookingDate(e.target.value);
            }}
            className={styles.datePicker}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl className={styles.select}>
            <InputLabel>Trạng thái đặt chỗ</InputLabel>
            <Select
              value={bookingStatus}
              onChange={(e) => setBookingStatus(e.target.value)}
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
            >
              <MenuItem value="PAIDALL">Thanh toán toàn bộ</MenuItem>
              <MenuItem value="DEPOSIT">Đặt cọc</MenuItem>
              <MenuItem value="UNPAID">Chưa thanh toán</MenuItem>
              <MenuItem value="FAILED">Thanh toán thất bại</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell}>Booking ID</TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Service Name
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Optional Service Name
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Pet Name
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Full Name
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Booking Date
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Start Time
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  End Time
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  End Date
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Total Amount
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Booking Status
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Booking Status Paid
                </TableCell>
                <TableCell align="center" className={styles.tableCell}>
                  Detail
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell align="center">{row.bookinId}</TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">
                    {row.optionalServiceName}
                  </TableCell>
                  <TableCell align="center">{row.petName}</TableCell>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{row.bookingDate}</TableCell>
                  <TableCell align="center">{row.startTime}</TableCell>
                  <TableCell align="center">{row.endTime}</TableCell>
                  <TableCell align="center">{row.endDate}</TableCell>
                  <TableCell align="center">{row.totalAmount}</TableCell>
                  <TableCell align="center">{row.bookingStatus}</TableCell>
                  <TableCell align="center">{row.bookingStatusPaid}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/managebooking/${row.bookinId}`)}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pagination}>
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

export default ManageBooking;
