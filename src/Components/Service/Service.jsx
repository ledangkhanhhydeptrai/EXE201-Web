import styles from "./Service.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
const Service = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/service/v1/getAllServiceIsActive`
      );
      if (response.status >= 200 && response.status < 300) {
        setData(response.data.data);
      } else {
        throw new Error(`HTTP Status:${response.status}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const fetchDataOptional = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${API_URL}/OptionalService/v1/getAllOptionalServiceIsActive`
      );
      if (response.status >= 200 && response.status < 300) {
        setData1(response.data.data);
      } else {
        throw new Error(`HTTP Status:${response.status}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchDataOptional();
  }, []);
  // thêm một cái dịch vụ phụ
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className={styles.app}>
            <Header />
            <main>
              <section className={styles.intro}>
                <h1>Chăm sóc và Petwalking</h1>
                <p>
                  Dịch vụ chăm sóc thú cưng bao gồm dịch vụ dắt chó đi dạo hằng
                  ngày, dịch vụ chăm sóc qua đêm, dịch vụ chăm sóc ngày lễ.
                  Ngoài ra, còn hỗ trợ vòng gửi tạm trong thời gian dài, lưu
                  trú, hoặc khi chủ bận rộn, công tác dài ngày
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
                  {data.map((service) => (
                    <div
                      className={styles.serviceCard}
                      key={service.serviceId}
                      onClick={() => navigate(`/service/${service.serviceId}`)}
                    >
                      <img
                        src={service.imageServiceBase64}
                        alt={service.title}
                      />
                      <div className={styles.serviceInfo}>
                        <h3>{service.serviceName}</h3>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className={styles.services1}>
                <h2>Chúng tôi còn thêm những dịch vụ khác</h2>
                <div className={styles.servicesList1}>
                  {data1.map((service) => (
                    <div
                      className={styles.serviceCard1}
                      key={service.serviceId1}
                      onClick={() =>
                        navigate(`/detailservice/${service.serviceId}`)
                      }
                    >
                      <img
                        src={service.imageServiceBase64}
                        alt={service.title}
                      />
                      <div className={styles.serviceInfo1}>
                        <h3>{service.serviceName}</h3>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Service;
