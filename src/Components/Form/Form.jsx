import { useNavigate } from "react-router-dom";
import styles from "./Form.module.scss";
export default function Form() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <h2 className={styles.title}>Đăng ký nhận nuôi thú cưng</h2>
            <button className={styles.sectionTitle}>Thông tin cá nhân</button>

            <form className={styles.form}>
              <input type="text" placeholder="Họ và tên" />
              <input type="text" placeholder="Số điện thoại" />
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Thu nhập hàng tháng" />
              <input type="text" placeholder="Kinh nghiệm nuôi thú cưng" />
              <input type="text" placeholder="Lý do muốn nhận nuôi" />
            </form>

            <div className={styles.buttons}>
              <button className={styles.backButton}>Quay lại</button>
              <button
                className={styles.nextButton}
                onClick={() => navigate("/test")}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
