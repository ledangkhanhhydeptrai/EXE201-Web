import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider
} from "@mui/material";
import Header from "../../Header/Header";
import styles from "./UserDetail.module.scss";
import Footer from "../../Footer/Footer";
import Loading from "../Loading/Loading";

const UserDetail = () => {
  const { bookinId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const getPaymentStatus = (method) => {
    switch (method) {
      case "UNPAID":
        return "Chưa thanh toán";
      case "PAIDALL":
        return "Thanh toán toàn bộ";
      case "DEPOSIT":
        return "Đặt cọc";
      case "FAILED":
        return "Thanh toán thất bại";
    }
  };
  const getBookingStatus = (method) => {
    switch (method) {
      case "PENDING":
        return "Đang diễn ra";
      case "NOTYET":
        return "Chưa diễn ra";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
    }
  };
  const handlePayment = async () => {
    if (
      data?.bookingStatus !== "NOTYET" ||
      data?.bookingStatusPaid !== "UNPAID"
    ) {
      alert(
        "Chỉ có thể thanh toán khi dịch vụ chưa diễn ra và chưa thanh toán"
      );
      return;
    }

    const bookingFormData = new FormData();
    bookingFormData.append("bookingId", data.bookinId);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/payment/checkOut`,
        bookingFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      );

      const checkOutUrl = response?.data?.data?.checkOutUrl;
      if (!checkOutUrl) {
        alert("Hệ thống thanh toán hiện đang không hoạt động");
      } else {
        window.location.href = checkOutUrl;
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/booking/v1/getBookingDetailByIdByUser/${bookinId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [bookinId]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className={styles.app}>
            <Header />
            <Container className={styles.container} sx={{ mt: 4 }}>
              <Card sx={{ maxWidth: 700, mx: "auto", p: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Thông tin chi tiết
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={3}>
                    {/* Cột 1 */}
                    <Grid item xs={5}>
                      <Typography variant="body1">
                        <strong>ID:</strong> {data?.bookinId}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Ngày đặt:</strong> {data?.bookingDate}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Trạng thái:</strong>{" "}
                        {getBookingStatus(data?.bookingStatus)}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Thanh toán:</strong>{" "}
                        {getPaymentStatus(data?.bookingStatusPaid)}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Khách hàng:</strong> {data?.fullName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>SĐT:</strong> {data?.phone}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Địa chỉ:</strong> {data?.address}
                      </Typography>
                    </Grid>

                    {/* Cột 2 */}
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Dịch vụ:</strong> {data?.serviceName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Giá:</strong> {data?.price} VNĐ
                      </Typography>
                      <Typography variant="body1">
                        <strong>Mô tả:</strong> {data?.serviceDescription}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Hình ảnh:</strong>{" "}
                        <img
                          src={data?.imageService}
                          alt=""
                          style={{
                            width: "200px",
                            height: "auto",
                            borderRadius: "8px",
                            marginTop: "5px"
                          }}
                        />
                      </Typography>
                      <Typography variant="body1">
                        <strong>Dịch vụ phụ:</strong> {data?.optinalServiceName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Giá dịch vụ phụ:</strong>{" "}
                        {data?.optianlServiceprice}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Miêu tả dịch vụ phụ:</strong>{" "}
                        {data?.optinalServiceDescription}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Hình ảnh dịch vụ phụ:</strong>{" "}
                        <img
                          src={data?.optinalImageService}
                          alt=""
                          style={{
                            width: "200px",
                            height: "auto",
                            borderRadius: "8px",
                            marginTop: "5px"
                          }}
                        />
                      </Typography>
                      <Typography variant="body1">
                        <strong>Tên thú cưng:</strong>
                        {data?.petName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Loại thú cưng:</strong>
                        {data?.petTypeEnum}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Giới tính thú cưng:</strong>
                        {data?.petGenderEnum}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Hình ảnh thú cưng:</strong>
                        <img
                          src={data?.petImage}
                          alt=""
                          style={{
                            width: "200px",
                            height: "auto",
                            borderRadius: "8px",
                            marginTop: "5px"
                          }}
                        />
                      </Typography>
                      <Typography variant="body1">
                        <strong>Tuổi thú cưng:</strong>
                        {data?.age}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Ghi chú:</strong>
                        {data?.notes}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Phương thức thanh toán:</strong>{" "}
                        {data?.paymentMethodEnum}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Ngày tạo:</strong> {data?.createAt}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Giờ bắt đầu:</strong> {data?.startTime}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Giờ kết thúc:</strong> {data?.endTime}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Ngày kết thúc:</strong> {data?.endDate}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Tổng cộng:</strong> {data?.totalAmount}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  {/* Avatar */}
                  {data?.userAvatar && (
                    <Grid container justifyContent="center">
                      <Avatar
                        src={data?.userAvatar}
                        sx={{ width: 80, height: 80 }}
                      />
                    </Grid>
                  )}

                  {/* Nút quay lại */}
                  <Grid container justifyContent="center" sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(-1)}
                    >
                      Quay Lại
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePayment}
                    >
                      Thanh toán
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Container>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default UserDetail;
