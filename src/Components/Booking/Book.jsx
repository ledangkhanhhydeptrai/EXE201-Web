import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Book.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import axios from "axios";
import Loading from "../Loading/Loading";

const Book = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [pets, setPets] = useState([]);
  const [isSelectPetPopupOpen, setIsSelectPetPopupOpen] = useState(false);
  const [isCreatePetPopupOpen, setIsCreatePetPopupOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    paymentMethod: "",
    date: "",
    startTime: "08:30:00",
    endTime: "10:30:00",
  });
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://bookingpetservice.onrender.com/api/service/v1/getAllServiceIsActive"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setServices(data.data);
      } else {
        setServices([]);
        console.warn("Dữ liệu không hợp lệ:", data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách dịch vụ:", error);
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  // Lấy danh sách phương thức thanh toán
  useEffect(() => {
    fetch(
      "https://bookingpetservice.onrender.com/api/payment/v1/getAllPaymentMethod"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setPaymentMethods(data.data);
        } else {
          setPaymentMethods([]);
        }
      })
      .catch((err) =>
        console.error("Lỗi lấy danh sách phương thức thanh toán:", err)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.service ||
      !formData.paymentMethod ||
      !formData.date ||
      !selectedPet.petId
    ) {
      alert("Vui lòng chọn đầy đủ thông tin!");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("jwt");
      if (!token) {
        alert("Bạn chưa đăng nhập! Vui lòng đăng nhập lại");
        return;
      }
      const response = await axios.post(
        "https://bookingpetservice.onrender.com/api/booking/v1/bookingByUser",
        {
          localDate: formData.date,
          startTime: formData.startTime || "08:30:00",
          endTime: formData.endTime || "10:30:00",
          petId: selectedPet.petId,
          serviceId: formData.service,
          optionalServiceId: formData.optionalService || null,
          paymentId: formData.paymentMethod
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Response từ server:", response);
      if (response.status >= 300) {
        throw new Error("Đặt lịch thất bại, vui lòng thử lại!");
      }

      if (!response.data || !response.data.data) {
        throw new Error("Dữ liệu phản hồi không hợp lệ từ máy chủ.");
      }

      console.log("Navigating with booking data:", response.data.data);
      navigate("/booksuccess", { state: { bookingData: response.data.data } });
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      if (error.response) {
        const apiError =
          error.response.data?.message || "Lỗi không xác định từ API.";
        alert(apiError);
      } else {
        alert(error.message || "Đặt lịch thất bại!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPet = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("jwt");

      if (!token) {
        console.error("Lỗi: Không tìm thấy token JWT!");
        alert("Bạn chưa đăng nhập! Vui lòng đăng nhập lại.");
        return;
      }

      const response = await axios.get(
        "https://bookingpetservice.onrender.com/api/pets/v1/getPetListOfUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          timeout: 5000
        }
      );

      const data = response.data.data;
      setPets(data);
      setIsSelectPetPopupOpen(true);
    } catch (error) {
      console.error(
        "Lỗi khi lấy danh sách thú cưng:",
        error.response ? error.response.data : error.message
      );

      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
      } else if (error.response?.status === 500) {
        alert("Lỗi server! Vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className={styles.app}>
            <Header />
            <div className={styles.imagetitle}>
              <h2 className={styles.title}>ĐẶT LỊCH</h2>
              <main className={styles.bookingForm}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.serviceGroup}>
                    <h3>Dịch vụ</h3>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={styles.dropdown}
                    >
                      <option value="">Chọn dịch vụ</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.serviceId}>
                          {service.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.paymentGroup}>
                    <h3>Phương thức thanh toán</h3>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className={styles.dropdown}
                      required
                    >
                      <option value="">Chọn phương thức thanh toán</option>
                      {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.paymentMethodName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.dateGroup}>
                    Ngày đặt lịch:
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className={styles.petbutton}
                      onClick={handleSelectPet}
                    >
                      Chọn thú cưng trong danh sách của bạn
                    </button>
                    {isSelectPetPopupOpen && (
                      <div className={styles.popup}>
                        <h3>Chọn thú cưng</h3>
                        <ul className={styles.petList}>
                          {pets.length > 0 ? (
                            pets.map((pet, index) => (
                              <li
                                key={index}
                                className={styles.petItem}
                                onClick={() => setSelectedPet(pet)}
                              >
                                <img
                                  src={pet.imagePetBase64}
                                  alt={pet.petName}
                                  className={styles.petImage}
                                />
                                <div>
                                  <h4>{pet.petName}</h4>
                                  <p>Id: {pet.petId}</p>
                                  <p>Tuổi: {pet.age} năm</p>
                                  <p>Giới tính: {pet.petGenderEnum}</p>
                                  <p>Loại: {pet.petTypeEnum}</p>
                                  <p>Ghi chú: {pet.notes}</p>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li>Hiện bạn chưa có thú cưng nào</li>
                          )}
                        </ul>
                        {selectedPet && (
                          <div
                            className={styles.overlay}
                            onClick={() => setIsSelectPetPopupOpen(false)}
                          >
                            <div
                              className={styles.popup}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <h3>Thú cưng đã chọn:</h3>
                              <img
                                src={selectedPet.imagePetBase64}
                                alt={selectedPet.petName}
                                className={styles.petImage}
                              />
                              <p>
                                <strong>Id:</strong> {selectedPet.petId}
                              </p>
                              <p>
                                <strong>Tên:</strong> {selectedPet.petName}
                              </p>
                              <p>
                                <strong>Tuổi:</strong> {selectedPet.age} năm
                              </p>
                              <p>
                                <strong>Giới tính:</strong>{" "}
                                {selectedPet.petGenderEnum}
                              </p>
                              <p>
                                <strong>Loại:</strong> {selectedPet.petTypeEnum}
                              </p>
                              <div className={styles.buttonGroup}>
                                <button
                                  className={styles.cancelBtn}
                                  onClick={() => setSelectedPet(null)}
                                >
                                  Hủy chọn
                                </button>
                                <button
                                  className={styles.closeBtn}
                                  onClick={() => setIsSelectPetPopupOpen(false)}
                                >
                                  Đóng
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        <button onClick={() => setIsSelectPetPopupOpen(false)}>
                          Đóng
                        </button>
                      </div>
                    )}
                    {isCreatePetPopupOpen && (
                      <div className={styles.popup}>
                        <h3>Bạn chưa có thú cưng</h3>
                        <button onClick={() => navigate("/create-pet")}>
                          Tạo thú cưng ngay
                        </button>
                        <button onClick={() => setIsCreatePetPopupOpen(false)}>
                          Đóng
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      onClick={() => navigate("/booksuccess")}
                    >
                      Quay lại
                    </button>
                    <button type="submit">Đặt lịch</button>
                  </div>
                </form>
              </main>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
