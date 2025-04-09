import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ManageServiceDetail.module.scss";
import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";

const ManageServiceDetail = () => {
  const { serviceId } = useParams();
  const [data, setData] = useState(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/manage-service");
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/service/v1/getServiceByIdIsActive/${serviceId}`
      );
      if (response.status >= 200 && response.status < 300) {
        setData(response.data.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, serviceId]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className={styles.app}>
        {data ? (
          <div className={styles.card}>
            <img src={data.imageServiceBase64} alt={data.serviceName} />
            <p>
              <strong>{data.serviceName}</strong>
            </p>
            <p>{data.description}</p>
            <p className={styles.price}>{data.price} VND</p>
            <a onClick={handleClick} className={styles.button}>
              Quay lại
            </a>
          </div>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
    </>
  );
};

export default ManageServiceDetail;
