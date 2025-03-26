/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "@mui/material"; 
import styles from "./ManageBooking.module.scss";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar1 from "../Sidebar/Sidebar1";
import Header1 from "../HeaderAdmin/Header1";

export default function ManageBooking1() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
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
      case "DEPOSIT":
        return "Đặt cọc";
      case "FAILED":
        return "Thanh toán thất bại";
      case "UNPAID":
        return "Chưa thanh toán";
      case "PAIDALL":
        return "Thanh toán toàn bộ";
      default:
        return "Chưa xác định";
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://bookingpetservice.onrender.com/api/booking/v1/getAllBookingByAmind`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("API Response:", response.data.data);
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <Sidebar1 />
      <Header1 />
      <div className={styles.container}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell}>Booking ID</TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Service Name
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
                  Booking Status
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Payment Status
                </TableCell>
                <TableCell align="center" className={styles.tableCell}>
                  Detail
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell component="th" scope="row" align="center">
                    {row.bookinId}
                  </TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">{row.petName}</TableCell>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{row.bookingDate}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
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
