import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const DashboardBy = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [detail, setDetail] = useState(null); // ← đã fix chỗ này

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/transaction/v1/GetTransactionDetail/${id}`,
          {
            params: {
              id: id
            }
          }
        );
        console.log("Dữ liệu giao dịch:", response.data);
        setDetail(response.data.data); // ← đã fix chỗ này
      } catch (error) {
        console.error(
          "Lỗi khi gọi API:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="container-fluid">
        <div className={styles.detailWrapper}>
          <h2 className={styles.heading}>Chi tiết giao dịch #{id}</h2>
          {detail ? (
            <div className={styles.detailCard}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Tên dịch vụ:</span>
                <span className={styles.value}>{detail.serviceName}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Giá:</span>
                <span className={styles.value}>{detail.price} VND</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Ảnh dịch vụ:</span>
                <img
                  src={detail.imageServiceBase64}
                  alt="Dịch vụ"
                  className={styles.image}
                />
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Dịch vụ bổ sung:</span>
                <span className={styles.value}>
                  {detail.optionalServiceName}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Giá dịch vụ bổ sung:</span>
                <span className={styles.value}>
                  {detail.optionalServicePrice} VND
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Ảnh dịch vụ bổ sung:</span>
                <img
                  src={detail.optinalServiceImage}
                  alt="Dịch vụ bổ sung"
                  className={styles.image}
                />
              </div>
            </div>
          ) : (
            <p className={styles.loading}>Đang tải chi tiết giao dịch...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardBy;
