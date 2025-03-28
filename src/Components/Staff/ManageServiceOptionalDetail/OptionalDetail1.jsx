import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./OptionalDetail.module.scss";
import Header1 from "../HeaderAdmin/Header1";
import Sidebar1 from "../Sidebar/Sidebar1";

const OptionalDetail1 = () => {
  const { serviceId } = useParams();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://bookingpetservice.onrender.com/api/OptionalService/v1/getOptionalServiceByIdIsActive/${serviceId}`
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
  }, [serviceId]);

  return (
    <>
      <Header1 />
      <Sidebar1 />
      <div className={styles.app}>
        {data ? (
          <div className={styles.card}>
            <img src={data.imageServiceBase64} alt={data.serviceName} />
            <p>
              <strong>{data.serviceName}</strong>
            </p>
            <p>{data.description}</p>
            <p className={styles.price}>{data.price} VND</p>
            <a href="/manage-service" className={styles.button}>
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

export default OptionalDetail1;
