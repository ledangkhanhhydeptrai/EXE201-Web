import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.scss";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
// import { useSelector } from "react-redux";
import img1 from "../../assets/z6369729728230_e8c41ef4eee0656cce15b51d35cbad4c.jpg";
const Payment = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sendInvoice, setSendInvoice] = useState(false);
  const qrValue =
    "https://s3-alpha-sig.figma.com/img/49fd/a7b9/8dc83ec0d0139aeb17cc97013f408226?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OzgCgK8TTEaYxmc1chnvCRaBlpRJSvPXd6TA0ugNmuTDIzqOV1dG0gONEbmMoEw-rv-YdRgGU92Ne0Qnj8z4uNDuTv0wHkiZrgLWofQyEYq2bvZMZvulQzsJ-mkYviuIrV~Fxc-MNzFH6Q2qP~cibmLqjd1lrfs940OlLK6Poq~brAsUMuxZkVMHGNcj-3pdwTj0MXlf9VVQ7haq-vB4WLwUqZleTAA-h9BAtHll~4G56sbVK2hXHuUMwkmnsKQG7ScNRYayL4mQhApAoxmxCRFO-mm~BihugbMIvoGU9l~vF891cxKGgwFh9LYM5Vj0QlkdinCIi73~V5AoMVIpQw__";
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleInvoiceToggle = (value) => {
    setSendInvoice(value);
  };
  const handleComplete = () => {
    navigate("/request");
  };
  // const bookingData = useSelector((state) => state.booking);
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        {/* <div className={styles.paymentContainer}>
          <h2>Thông tin đặt lịch</h2>
          <p>
            <strong>Họ và tên:</strong> {bookingData.name}
          </p>
          <p>
            <strong>Email:</strong> {bookingData.email}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {bookingData.phone}
          </p>
          <p>
            <strong>Dịch vụ:</strong> {bookingData.service}
          </p>
          <p>
            <strong>Ngày:</strong> {bookingData.date}
          </p>
          <p>
            <strong>Thời gian:</strong> {bookingData.time}
          </p>
        </div> */}
        <div className={styles.paymentPage}>
          <h1 className={styles.title}>Thanh toán</h1>
          <p className={styles.subtitle}>
            Yêu cầu thanh toán trước ít nhất 50% chi phí dịch vụ
          </p>
          <div className={styles.paymentBox}>
            <div className={styles.section}>
              <h2>Thanh toán qua ngân hàng</h2>
              <div className={styles.newImage} />
              <div className={styles.bankInfo}>
                <p>Tên tài khoản: Dịch vụ thú cưng Adopt a pet</p>
                <p>Số tài khoản: 1002300000</p>

                <div className={styles.bankname}>
                  <img src={img1} alt="QR Code" />
                </div>
              </div>
              <div className={styles.paymentMethods}>
                <div className={styles.method}>
                  <h1>Thanh toán qua momo</h1>
                  <img
                    src="data:image/png;base64,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"
                    alt="Momo"
                  />
                  <p>Số điện thoại Momo: 123456789</p>
                </div>
                <div className={styles.method1}>
                  <h1>Thanh toán qua ViettelPay</h1>
                  <img
                    src="https://viettelmoney.vn/wp-content/uploads/2023/04/vnpayqr-ha-1-300x300.jpg"
                    alt="ViettelPay"
                  />
                  <p>Số tài khoản ViettelPay: 9704123456789</p>
                </div>
              </div>
              <div className={styles.invoice}>
                <p>Bạn muốn gửi hóa đơn qua email không?</p>
                <div className={styles.options}>
                  <button
                    className={`${styles.optionButton} ${
                      sendInvoice ? styles.active : ""
                    }`}
                    onClick={() => handleInvoiceToggle(true)}
                  >
                    Có
                  </button>
                  <button
                    className={`${styles.optionButton} ${
                      !sendInvoice ? styles.active : ""
                    }`}
                    onClick={() => handleInvoiceToggle(false)}
                  >
                    Không
                  </button>
                </div>
                {sendInvoice && (
                  <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={handleEmailChange}
                    className={styles.emailInput}
                  />
                )}
              </div>
              <div className={styles.qrContainer}>
                <span className={styles.label}>Mã QR:</span>
                <QRCodeCanvas
                  value={qrValue}
                  size={228}
                  className={styles.qrCode}
                />
              </div>
            </div>
          </div>
          <div className={styles.newImage1} />
          <div className={styles.section1}>
            <h2>Thanh toán trực tiếp</h2>
            <p>
              Thanh toán trực tiếp tại Adopt a pet để chúng tôi có thể tư vấn
              một cách tốt nhất!
            </p>
          </div>
          <div className={styles.actionsButton}>
            <button
              className={styles.backButton}
              onClick={() => navigate("/booking")}
            >
              Quay lại
            </button>
            <button className={styles.completeButton} onClick={handleComplete}>
              Hoàn thành
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Payment;
