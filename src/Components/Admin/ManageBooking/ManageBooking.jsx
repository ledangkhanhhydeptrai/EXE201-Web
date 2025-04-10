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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import styles from "./ManageBooking.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../HeaderAdmin/Header";
import { UilBookmark } from "@iconscout/react-unicons";
const ManageBooking = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [bookDate, setBookDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("INPROGRESS");
  const [bookingStatusPaid, setBookingStatusPaid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  console.log("Selected", selectedBookingId);
  console.log("Booking Status", bookingStatus);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (id) => {
    setSelectedBookingId(id);
    setBookingStatus(""); // Reset trạng thái nếu cần
    setOpen(true);
  };
  const itemsPerPage = 10;
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  // bảng admin tất cả chuyển sang tiếng việt
  // active thì đổi true thành đang hoạt động, false thì không hoạt động
  //
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
    if (!bookDate && !bookingStatus && !bookingStatusPaid) {
      fetchAllBookings();
      return;
    }

    const params = {};
    if (bookDate) params.bookingDate = bookDate;
    if (bookingStatus) params.bookingStatus = bookingStatus;
    if (bookingStatusPaid) params.bookingStatusPaid = bookingStatusPaid;

    console.log("🔥 Params lọc booking gửi đi:", params);

    try {
      const response = await axios.get(
        `${API_URL}/booking/v1/getBookingByAdmiByDropdown`,
        { params }
      );
      const bookings = response.data.data || [];
      const filtered = bookings.filter((booking) => {
        const matchDate = bookDate
          ? booking.bookingDate?.startsWith(bookDate)
          : true;
        const matchStatus = bookingStatus
          ? booking.bookingStatus === bookingStatus
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
  }, [API_URL, bookDate, bookingStatus, bookingStatusPaid, fetchAllBookings]);
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

    console.log("Selected bookingId:", selectedBookingId);
    console.log("Booking Status:", bookingStatus);

    const url = `${API_URL}/booking/v1/setBookingStatusForAdminAndStaff`;
    const params = {
      bookingId: selectedBookingId,
      bookingStatus: bookingStatus
    };

    console.log("Gửi request đến:", url);
    console.log("Với params:", params);

    try {
      const response = await axios.put(
        url,
        null, // PUT request không có body, chỉ dùng params
        {
          params
        }
      );

      console.log("Cập nhật thành công:", response.data.data);
      console.log("Trạng thái trả về:", response.data.data.bookingStatus);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.container}>
        <div className={styles.filters}>
          <TextField
            label="Ngày đặt chỗ"
            type="date"
            value={bookDate}
            onChange={(e) => {
              console.log("Ngày vừa chọn:", e.target.value);
              setBookDate(e.target.value);
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
                  Tên Dịch Vụ
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Tên Dịch Vụ Phụ
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Tên Thú Cưng
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Tên Đầy Đủ
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Ngày Đặt Chỗ
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
                  Trạng thái đặt chỗ đã thanh toán
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
                currentData.map((row, index) => (
                  <TableRow key={index} className={styles.tableRow}>
                    <TableCell align="center">{row.bookinId}</TableCell>
                    <TableCell align="center">{row.serviceName}</TableCell>
                    <TableCell align="center">
                      {row.optinalServiceName || "Không có dịch vụ phụ"}
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
                        onClick={() =>
                          navigate(`/managebooking/${row.bookinId}`)
                        }
                        sx={{ fontSize: "0.75rem", width: "85px" }} // chỉnh cỡ chữ nhỏ hơn
                      >
                        Chi tiết
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
                ))
              )}
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

export default ManageBooking;
