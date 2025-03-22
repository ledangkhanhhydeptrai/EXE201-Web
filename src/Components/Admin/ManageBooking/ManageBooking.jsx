import styles from "./ManageBooking.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../HeaderAdmin/Header";
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
export default function ManageBooking() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://bookingpetservice.onrender.com/api/booking/v1/getAllBookingByAmind`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
  });
  return (
    <>
      <Sidebar />
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "50px"
        }}
      >
        <Button variant="contained" color="primary">
          Create
        </Button>
      </div>

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
                <TableCell className={styles.tableCell} align="center">
                  Update
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Delete
                </TableCell>
                <TableCell align="center" className={styles.tableCell}>
                  Detail
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
                  <TableCell align="center">{row.bookingStatusPaid}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary">
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary">
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/managebooking/${row.bookinId}`)} // ✅ Thay thế đúng ID
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
