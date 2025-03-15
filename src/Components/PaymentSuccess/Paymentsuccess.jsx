import styles from "./Paymentsuccess.module.scss";
import { useNavigate } from "react-router-dom";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
export default function Paymentsuccess() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.paymentsuccess}>
          <div className={styles.content}>
            <h1>Đặt lịch thành công</h1>
            <p>Cảm ơn bạn rất nhiều vì đã sử dụng dịch vụ</p>
            <button onClick={() => navigate("/request")}>Quay lại</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
