import styles from "./ManagePet.module.scss";
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

export default function ManagePet() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookingpetservice.onrender.com/api/pets/v1/getPetListOfUser`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status >= 200 && response.status < 300) {
          setData(response.data.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.container}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="pet table">
            <TableHead>
              <TableRow className={styles.tableHeader}>
                <TableCell className={styles.headerCell}>Pet Id</TableCell>
                <TableCell className={styles.headerCell} align="center">
                  Pet Name
                </TableCell>
                <TableCell className={styles.headerCell} align="center">
                  Pet Type Enum
                </TableCell>
                <TableCell className={styles.headerCell} align="center">
                  Pet Gender Enum
                </TableCell>
                <TableCell className={styles.headerCell} align="center">
                  Image
                </TableCell>
                <TableCell className={styles.headerCell} align="center">
                  Notes
                </TableCell>
                <TableCell className={styles.headerCell} align="center">
                  Age
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell className={styles.cell}>{row.petId}</TableCell>
                  <TableCell className={styles.cell} align="center">
                    {row.petName}
                  </TableCell>
                  <TableCell className={styles.cell} align="center">
                    {row.petTypeEnum}
                  </TableCell>
                  <TableCell className={styles.cell} align="center">
                    {row.petGenderEnum}
                  </TableCell>
                  <TableCell className={styles.cell} align="center">
                    <img
                      className={styles.petImage}
                      src={row.imagePetBase64}
                      alt="Pet"
                    />
                  </TableCell>
                  <TableCell className={styles.cell} align="center">
                    {row.notes}
                  </TableCell>
                  <TableCell className={styles.cell} align="center">
                    {row.age}
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
