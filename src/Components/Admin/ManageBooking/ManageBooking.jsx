import styles from "./ManageBooking.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../HeaderAdmin/Header";
import {
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

export default function ManageBooking() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
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

    fetchData();
  });
  /* Làm nút detail */
  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.container}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell}>bookingId</TableCell>
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
                  userName
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  phone
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  address
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  userAvatar
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  serviceName
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  price
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  serviceDescription
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  imageService
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  petName
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  petTypeEnum
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  petGenderEnum
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  petImage
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  age
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  notes
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  paymentMethodEnum
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  createAt
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.userName} className={styles.tableRow}>
                  <TableCell component="th" scope="row" align="center">
                    {row.bookinId}
                  </TableCell>
                  <TableCell align="center">{row.bookingDate}</TableCell>
                  <TableCell align="center">{row.bookingStatus}</TableCell>
                  <TableCell align="center">{row.bookingStatusPaid}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.userAvatar}</TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.serviceDescription}</TableCell>
                  <TableCell align="center">
                    <img
                      src={row.imageService}
                      alt=""
                      style={{ width: "90%" }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.petName}</TableCell>
                  <TableCell align="center">{row.petTypeEnum}</TableCell>
                  <TableCell align="center">{row.petGenderEnum}</TableCell>
                  <TableCell align="center">
                    <img src={row.petImage} alt="" style={{ width: "90%" }} />
                  </TableCell>
                  <TableCell align="center">{row.age}</TableCell>
                  <TableCell align="center">{row.notes}</TableCell>
                  <TableCell align="center">{row.paymentMethodEnum}</TableCell>
                  <TableCell align="center">{row.createAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
