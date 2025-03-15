import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./ManageUser.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookingpetservice.onrender.com/api/user/getAllAccount`
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
  }, []);

  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.container}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell}>Username</TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Email
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Phone
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Address
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Status
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Avatar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.userName} className={styles.tableRow}>
                  <TableCell component="th" scope="row" align="center">
                    {row.userName}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">
                    <span
                      className={
                        row.active ? styles.activeStatus : styles.bannedStatus
                      }
                    >
                      {row.active ? "Đang hoạt động" : "Bị cấm"}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={row.avatarBase64}
                      alt="Avatar"
                      className={styles.avatar}
                    />
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
