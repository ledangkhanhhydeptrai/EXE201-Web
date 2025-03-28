import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import styles from "./ManageUser1.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar1 from "../Sidebar/Sidebar1";
import Header1 from "../HeaderAdmin/Header1";

export default function ManageUser1() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookingpetservice.onrender.com/api/user/getAllAccount`
        );

        if (response.status >= 200 && response.status < 300) {
          console.log("API Response:", response.data);
          setData(response.data.data.sort((a, b) => a.userId - b.userId));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidebar1 />
      <Header1 />
      <div className={styles.container}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell}>User ID</TableCell>
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
                    {row.userId}
                  </TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
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
