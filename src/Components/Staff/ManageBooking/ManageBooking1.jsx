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
  Button,
  Pagination,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions
} from "@mui/material";
import styles from "./ManageBooking.module.scss";
import Sidebar1 from "../Sidebar/Sidebar1";
import Header1 from "../HeaderAdmin/Header1";
import { UilBookmark } from "@iconscout/react-unicons";
const ManageBooking1 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  // const [bookingStatus, setBookingStatus] = useState("");
  // const [bookingStatusPaid, setBookingStatusPaid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("INPROGRESS");
  const [open, setOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const itemsPerPage = 10;
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (id) => {
    setSelectedBookingId(id);
    setBookingStatus(""); // Reset trạng thái nếu cần
    setOpen(true);
  };
  const getBookingStatus = (status) => {
    switch (status) {
      case "NOTYET":
        return "Chưa diễn ra";
      case "INPROGRESS":
        return "Đang diễn ra";
      case "PENDING":
        return "Đang chờ";
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
  const fetchAllBookings = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/booking/v1/getAllBookingByAmind`
      );
      setData(response.data.data.sort((a, b) => a.serviceId - b.serviceId));
      setCurrentData(response.data.data.slice(0, itemsPerPage));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách booking:", error);
    }
  };
  const fetchFilteredBookings = useCallback(async () => {
    if (!bookingDate) {
      fetchAllBookings();
      return;
    }
    try {
      const response = await axios.get(
        `${API_URL}/booking/v1/getBookingByStaffByDropdown`,
        {
          params: {
            bookDate: bookingDate || "2025-03-28"
          }
        }
      );
      setData(response.data.data);
      setCurrentData(response.data.data.slice(0, itemsPerPage));
    } catch (error) {
      console.error("Lỗi khi lọc danh sách booking:", error);
    }
  }, [bookingDate]);

  useEffect(() => {
    fetchAllBookings();
  }, []);
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    setCurrentData(paginatedData);
  }, [currentPage, data]);
  const handleUpdate = async () => {
    if (!selectedBookingId || !bookingStatus) {
      console.warn("Thiếu bookingId hoặc bookingStatus");
      return;
    }

    const url = `${API_URL}/booking/v1/setBookingStatusForAdminAndStaff`;
    const params = {
      bookingId: selectedBookingId,
      bookingStatus: bookingStatus
    };

    try {
      const response = await axios.put(url, null, { params });

      const updatedBooking = response?.data?.data;

      if (!updatedBooking || !updatedBooking.bookingStatus) {
        alert("Lỗi: Không nhận được trạng thái từ server.");
        console.error("Phản hồi không hợp lệ:", response.data);
        return;
      }

      if (updatedBooking.bookingStatus !== bookingStatus) {
        alert(
          `Lỗi: Trạng thái trả về (${updatedBooking.bookingStatus}) không khớp với trạng thái gửi lên (${bookingStatus}).`
        );
        return;
      }

      alert("Cập nhật trạng thái thành công!");
      handleClose();
      window.location.reload();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Đã xảy ra lỗi không xác định khi cập nhật.";

      console.error("Lỗi khi cập nhật:", message);
      alert(message);
    }
  };
  return (
    <>
      <Sidebar1 />
      <Header1 />
      <div className={styles.container}>
        <div className={styles.filters}>
          <TextField
            label="Ngày đặt chỗ"
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className={styles.datePicker}
            InputLabelProps={{ shrink: true }}
          />
          {/* <FormControl className={styles.select}>
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
          </FormControl> */}
          <div className={styles.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchFilteredBookings}
              className={styles.filterButton}
            >
              Lọc
            </Button>
          </div>
        </div>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell}>Booking ID</TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Tên dịch vụ
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Tên dịch vụ phụ{" "}
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Tên thú cưng
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Tên đầy đủ
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Ngày đặt lịch
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Thời gian bắt đầu
                </TableCell>
                {/* <TableCell className={styles.tableCell} align="center">
                  Thời gian kết thúc
                </TableCell> */}
                <TableCell className={styles.tableCell} align="center">
                  Ngày kết thúc
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Tổng tiền
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Trạng thái đặt lịch
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Trạng thái đặt lịch thanh toán
                </TableCell>
                <TableCell align="center" className={styles.tableCell}>
                  Chi tiết
                </TableCell>
                <TableCell align="center" className={styles.tableCell}>
                  Cập nhật
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell align="center">{row.bookinId}</TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">
                    {row.optinalServiceName || "Không có"}
                  </TableCell>
                  <TableCell align="center">{row.petName}</TableCell>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{row.bookingDate}</TableCell>
                  <TableCell align="center">{row.startTime}</TableCell>
                  {/* <TableCell align="center">{row.endTime}</TableCell> */}
                  <TableCell align="center">{row.endDate}</TableCell>
                  <TableCell align="center">{row.totalAmmount}</TableCell>
                  <TableCell align="center">
                    {getBookingStatus(row.bookingStatus)}
                  </TableCell>
                  <TableCell align="center">
                    {getBookingStatusPaid(row.bookingStatusPaid)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/managebooking/${row.bookinId}`)}
                    >
                      Detail
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ fontSize: "0.75rem", width: "95px" }} // chỉnh cỡ chữ nhỏ hơn
                      onClick={() => handleOpen(row.bookinId)}
                    >
                      Cập nhật
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Cập nhật trạng thái Booking</DialogTitle>
          <DialogContent>
            <div className={styles.bookingInfo}>
              <UilBookmark className={styles.icon} />
              <span className={styles.label}>Booking ID:</span>
              <span className={styles.id}>{selectedBookingId}</span>
            </div>
            <FormControl fullWidth>
              <InputLabel id="booking-status-label">Trạng thái</InputLabel>
              <Select
                value={bookingStatus}
                onChange={(e) => {
                  console.log("Selected:", e.target.value);
                  setBookingStatus(e.target.value);
                }}
                label="Trạng thái"
              >
                <MenuItem value="INPROGRESS">Đang diễn ra</MenuItem>
                <MenuItem value="COMPLETED">Hoàn thành</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
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

export default ManageBooking1;
