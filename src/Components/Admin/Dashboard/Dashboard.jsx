import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Dashboard.module.scss";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [localDate, setLocalDate] = useState("");
  const [bookingStatusPaid, setBookingStatusPaid] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();
  const handleStatus = (booking) => {
    switch (booking) {
      case "PAIDALL":
        return "Thanh toán toàn bộ";
      case "UNPAID":
        return "Chưa thanh toán";
      case "DEPOSIT":
        return "Đặt cọc";
      case "FAILED":
        return "Thanh toán thất bại";
      default:
        return "Không xác định";
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/transaction/v1/GetAllTransaction`
      );
      if (response.status >= 200 && response.status < 300) {
        const sortedData = response.data.data.sort((a, b) => a.id - b.id);
        setData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [API_URL]);
  const filteredData = useCallback(async () => {
    const params = {};
    if (localDate) params.localDate = localDate;
    if (bookingStatusPaid) params.bookingStatusPaid = bookingStatusPaid;

    try {
      const response = await axios.get(
        `${API_URL}/transaction/v1/GetTransactionDropdown`,
        { params }
      );
      const bookings = response.data.data || [];
      const filtered = bookings.filter((booking) => {
        const matchDate = localDate
          ? booking.transactionDateTime.includes(localDate)
          : true;
        const matchStatus = bookingStatusPaid
          ? booking.status === bookingStatusPaid
          : true;
        return matchDate && matchStatus;
      });
      setData(filtered);
      setNoData(filtered.length === 0);
      if (filtered.length > 0) {
        console.log("Không có dữ liệu phù hợp");
      }
    } catch (error) {
      console.error("Lỗi khi lọc danh sách booking:", error);
    }
  }, [API_URL, localDate, bookingStatusPaid]);
  useEffect(() => {
    const getData = async () => {
      if (!bookingStatusPaid && !localDate) {
        await fetchData();
      } else {
        await filteredData();
      }
    };
    getData();
  }, [bookingStatusPaid, localDate, filteredData]);

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
            value={localDate}
            onChange={(e) => {
              console.log("Ngày vừa chọn:", e.target.value);
              setLocalDate(e.target.value);
            }}
            className={styles.datePicker}
            InputLabelProps={{ shrink: true }}
          />
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
                <TableCell className={styles.tableCell} align="center">
                  Id
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Amount
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Amount Paid
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Amount Remaining
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Status
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  account Number
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Description
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Transaction Date Time
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Order Code
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noData ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
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
                  <TableRow
                    key={index}
                    className={styles.tableRow}
                    onClick={() => navigate(`/dashboard/${row.id}`)}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">{row.amountPaid}</TableCell>
                    <TableCell align="center">{row.amountRemaining}</TableCell>
                    <TableCell align="center">
                      {handleStatus(row.status)}
                    </TableCell>
                    <TableCell align="center">{row.accountNumber}</TableCell>
                    <TableCell align="center">
                      {handleStatus(row.description)}
                    </TableCell>
                    <TableCell align="center">
                      {row.transactionDateTime}
                    </TableCell>
                    <TableCell align="center">{row.orderCode}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pagination}>
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)} // Tổng số trang
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </div>
      </div>
    </>
  );
}
