import { useNavigate } from "react-router-dom";
import styles from "./Request.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
const Request = () => {
  const navigate = useNavigate();
  const bookingDetails = {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    service: "Dịch vụ chăm sóc qua đêm",
    subService: "Chăm sóc hộ",
    price: "200.000 VND",
    date: "20/11/2024",
    time: "20h00"
  };
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <div className={styles.bookingconfirmation}>
            <div className={styles.confirmationcard}>
              <div className={styles.cardheader}>Đặt lịch thành công</div>
              <div className={styles.cardbody}>
                <div>
                  <strong>Tên của bạn:</strong> {bookingDetails.name}
                </div>
                <div>
                  <strong>Số điện thoại của bạn:</strong> {bookingDetails.phone}
                </div>
                <div>
                  <strong>Dịch vụ:</strong> {bookingDetails.service}
                </div>
                <div>
                  <strong>Chi tiết dịch vụ:</strong> {bookingDetails.subService}
                </div>
                <div>
                  <strong>Giá:</strong> {bookingDetails.price}
                </div>
                <div>
                  <strong>Ngày hẹn:</strong> {bookingDetails.date}
                </div>
                <div>
                  <strong>Thời gian:</strong> {bookingDetails.time}
                </div>
              </div>
              <div className={styles.cardfooter}>*Thông tin đã điền</div>
            </div>
            <div className={styles.cardactions}>
              <button
                className={styles.btnsecondary}
                onClick={() => navigate("/payment")}
              >
                Quay lại
              </button>
              <button
                className={styles.btnprimary}
                onClick={() => navigate("/success")}
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Request;
