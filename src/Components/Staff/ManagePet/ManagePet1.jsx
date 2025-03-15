import axios from "axios";
import styles from "./ManagePet1.module.scss";
import { useEffect, useState } from "react";
import Sidebar1 from "../Sidebar/Sidebar1";
import Header1 from "../HeaderAdmin/Header1";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
const ManagePet1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookingpetservice.onrender.com/api/service/v1/getAllServiceIsActive`
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
      <Sidebar1 />
      <Header1 />
      <div className={styles.container}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell}>Service ID</TableCell>
                <TableCell className={styles.tableCell}>Service Name</TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Description
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Price
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Image
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.serviceId} className={styles.tableRow}>
                  <TableCell component="th" scope="row" align="center">
                    {row.serviceId}
                  </TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <img
                      src={row.imageServiceBase64}
                      alt=""
                      className={styles.avatar}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={
                        row.active ? styles.activeStatus : styles.bannedStatus
                      }
                    >
                      {row.active ? "Đang hoạt động" : "Bị cấm"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default ManagePet1;
