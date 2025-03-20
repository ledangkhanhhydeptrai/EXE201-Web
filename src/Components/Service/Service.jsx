import styles from "./Service.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
const Service = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://bookingpetservice.onrender.com/api/service/v1/getAllServiceIsActive`
      );
      if (response.status >= 200 && response.status < 300) {
        setData(response.data.data);
      } else {
        throw new Error(`HTTP Status:${response.status}`);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <main>
          <section className={styles.intro}>
            <h1>Chăm sóc và Petwalking</h1>
            <p>
              Dịch vụ chăm sóc thú cưng bao gồm dịch vụ dắt chó đi dạo hằng
              ngày, dịch vụ chăm sóc qua đêm, dịch vụ chăm sóc ngày lễ. Ngoài
              ra, còn hỗ trợ vòng gửi tạm trong thời gian dài, lưu trú, hoặc khi
              chủ bận rộn, công tác dài ngày
            </p>
            <button
              className={styles.bookNow}
              onClick={() => navigate("/booking")}
            >
              Book now
            </button>
          </section>
          <section className={styles.services}>
            <h2>Dịch vụ của chúng tôi</h2>
            <div className={styles.servicesList}>
              {data.map((service, index) => (
                <div className={styles.serviceCard} key={index}>
                  <img src={service.imageServiceBase64} alt={service.title} />
                  <div className={styles.serviceInfo}>
                    <h3>{service.serviceName}</h3>
                    <p>{service.description}</p>
                    {/* <button
                      className={`${styles.bookNow} ${
                        styles[service.buttonColor]
                      }`}
                      onClick={() => navigate("/booking")}
                    >
                      Book now
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Service;
