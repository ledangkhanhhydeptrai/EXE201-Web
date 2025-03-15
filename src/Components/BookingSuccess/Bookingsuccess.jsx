import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Booksuccess.module.scss";
import axios from "axios";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  const createOrder = async () => {
    const bookingFormData = new FormData();
    bookingFormData.append("bookingId", bookingData.bookinId);
    
    try {
      const response = await axios.post("https://bookingpetservice.onrender.com/api/payment/checkOut", bookingFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "multipart/form-data" // Remove this if not necessary
        }
      });
      // Handle the response if needed

      const checkOutUrl = response?.data?.data?.checkOutUrl;
      console.log(response);
      if (!checkOutUrl) {
        alert("Hệ thống thanh toán hiện đang không hoạt động")
      } else {
        window.location.href = checkOutUrl; // Redirect to checkOutUrl
      }

    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  if (!bookingData) {
    return (
      <div className={styles.container}>
        <h2>Không có dữ liệu đặt lịch</h2>
        <button className={styles.button} onClick={() => navigate("/")}>
          Quay về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>🎉 Đặt lịch thành công! Xin tiến hành thanh toán 🎉</h2>
      <p><strong>Mã đặt lịch:</strong> {bookingData?.bookinId}</p>
      <p><strong>Người đặt:</strong> {bookingData?.userName}</p>
      <p><strong>Dịch vụ:</strong> {bookingData?.serviceName}</p>
      <p><strong>Ngày đặt:</strong> {bookingData?.bookingDate}</p>
      <p><strong>Trạng thái:</strong> {bookingData?.bookingStatus}</p>
      <p><strong>Giá:</strong> {bookingData?.price.toLocaleString()} VND</p>
      <img src={bookingData?.imageService} alt="Dịch vụ" className={styles.image} />

      <div className={styles.buttonGroup}>
        <button className={styles.buttonPay} onClick={createOrder}>
          Thanh toán
        </button>
        <span className={styles.buttonGap}>   </span>
        <button className={styles.button} onClick={() => navigate("/")}>
          Hủy thanh toán
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;