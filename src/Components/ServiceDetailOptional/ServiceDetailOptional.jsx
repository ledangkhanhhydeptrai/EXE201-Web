import { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import styles from "./ServiceDetailOptional.module.scss";
import Header from "../../Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const ServiceDetailOptional = () => {
  const [data, setData] = useState(null);
  const { serviceId } = useParams();
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/OptionalService/v1/getOptionalServiceByIdIsActive/${serviceId}`
      );

      if (response.status >= 200 && response.status < 300) {
        setData(response.data.data);
      } else {
        throw new Error(`HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("API Fetch Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [serviceId]);

  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        {data ? (
          <div className={styles.mainTitle}>
            <img src={data.imageServiceBase64} alt={data.serviceName} />
            <p>
              <strong>{data.serviceName}</strong>
            </p>
            <p>{data.description}</p>
            <p className={styles.price}>{data.price} VND</p>
            <a href="/booking" className={styles.button}>
              Đặt ngay
            </a>
          </div>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetailOptional;
