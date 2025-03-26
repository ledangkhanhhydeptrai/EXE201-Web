import { useEffect, useState } from "react";
import Header from "../../Header/Header";
import styles from "./Booking.module.scss";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
const Booking = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookingpetservice.onrender.com/api/booking/v1/getAllBookingByUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.status >= 200 && response.status < 300) {
          console.log("API Response:", response.data);
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.container}>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table} aria-label="user table">
              <TableHead>
                <TableRow className={styles.tableHead}>
                  <TableCell className={styles.tableCell}>bookingId</TableCell>
                  <TableCell className={styles.tableCell} align="center">
                    serviceName
                  </TableCell>
                  <TableCell className={styles.tableCell} align="center">
                    petName
                  </TableCell>
                  <TableCell className={styles.tableCell} align="center">
                    fullName
                  </TableCell>
                  <TableCell className={styles.tableCell} align="center">
                    bookingDate
                  </TableCell>
                  <TableCell className={styles.tableCell} align="center">
                    bookingStatus
                  </TableCell>
                  <TableCell className={styles.tableCell} align="center">
                    bookingStatusPaid
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index} className={styles.tableRow}>
                    <TableCell component="th" scope="row" align="center">
                      {row.bookinId}
                    </TableCell>
                    <TableCell align="center">{row.serviceName}</TableCell>
                    <TableCell align="center">{row.petName}</TableCell>
                    <TableCell align="center">{row.fullName}</TableCell>
                    <TableCell align="center">{row.bookingDate}</TableCell>
                    <TableCell align="center">{row.bookingStatus}</TableCell>
                    <TableCell align="center">
                      {row.bookingStatusPaid}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Booking;
