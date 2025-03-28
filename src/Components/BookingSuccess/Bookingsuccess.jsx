import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Booksuccess.module.scss";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { Tag } from "antd";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  const [isLoading, setIsLoading] = useState(false);
  const createOrder = async () => {
    const bookingFormData = new FormData();
    bookingFormData.append("bookingId", bookingData.bookinId);

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://bookingpetservice.onrender.com/api/payment/checkOut",
        bookingFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data", // Remove this if not necessary
          },
        }
      );
      // Handle the response if needed

      const checkOutUrl = response?.data?.data?.checkOutUrl;
      if (!checkOutUrl) {
        alert("Hệ thống thanh toán hiện đang không hoạt động");
      } else {
        window.location.href = checkOutUrl; // Redirect to checkOutUrl
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsLoading(false);
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 200,
            }}
          >
            <div className={styles.container}>
              <img
                src="https://cdn.dribbble.com/userupload/41915938/file/original-c881a1d5e0351f10837b4640b17f2a29.gif"
                style={{ width: "30%", height: "auto" }}
              />
              <h3 style={{ marginBottom: 24, color: "green" }}>
                Đặt lịch thành công
              </h3>
              <div>
                <p>
                  <strong>Mã đặt lịch:</strong> {bookingData?.bookinId}
                </p>
                <p>
                  <strong>Tên dịch vụ:</strong> {bookingData?.serviceName}
                </p>
                <p>
                  <strong>Dịch vụ phụ:</strong>{" "}
                  {bookingData?.optinalServiceName ?? "Không có"}
                </p>
                <p>
                  <strong>Người đặt:</strong> {bookingData?.fullName}
                </p>
                <p>
                  <strong>Ngày đặt:</strong> {bookingData?.bookingDate}
                </p>
                <p>
                  <strong>Thời gian bắt đầu:</strong> {bookingData?.startTime}
                </p>
                <p>
                  <strong>Thời gian kết thúc:</strong> {bookingData?.endTime}
                </p>
                <p>
                  <strong style={{ marginRight: 6 }}>Trạng thái:</strong>
                  <Tag color="warning">{bookingData?.bookingStatus}</Tag>
                </p>
              </div>

              <div className={styles.buttonGroup}>
                <button className={styles.buttonPay} onClick={createOrder}>
                  Thanh toán
                </button>
                <span className={styles.buttonGap}> </span>
                <button className={styles.button} onClick={() => navigate("/")}>
                  Hủy thanh toán
                </button>
              </div>
            </div>
          </div>

          <div style={{ width: "82%", marginTop: "50px", marginLeft: "10px" }}>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default BookingSuccess;
