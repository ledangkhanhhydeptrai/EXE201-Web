// import { useNavigate } from "react-router-dom";
// import styles from "./Book.module.scss";
// import { useEffect, useState } from "react";
// import Header from "../../Header/Header";
// import Footer from "../../Footer/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { setBookingInfo } from "../../redux/bookingSlice";
// import axios from "axios";
// const services = [
//   "Đặt chỗ hàng ngày",
//   "Chăm sóc qua đêm",
//   "Chăm sóc trong những ngày lễ"
// ];
// const Book = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState("Chọn dịch vụ");
//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const selectService = (service) => {
//     setSelected(service);
//     setIsOpen(false);
//   };
//   // const [formData, setFormData] = useState({
//   //   name: "",
//   //   email: "",
//   //   phone: "",
//   //   service: "",
//   //   date: "",
//   //   time: ""
//   // });
//   const bookingData = useSelector((state) => state.booking);
//   const [formData, setFormData] = useState({
//     service: "",
//     paymentMethod: "",
//     date: ""
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(
//         `https://bookingpetservice.onrender.com/api/payment/v1/getAllPaymentMethod`
//       );
//       if (response.status >= 200 && response.status < 300) {
//         setFormData(response.data.data);
//       } else {
//         throw new Error(`HTTP Status:${response.status}`);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Dữ liệu đặt lịch:", formData);
//     navigate("/payment");
//   };
//   return (
//     <div className="container-fluid">
//       <div className={styles.app}>
//         <Header />
//         <div className={styles.imagetitle}>
//           <h2 className={styles.title}>ĐẶT LỊCH</h2>
//           <main className={styles.bookingForm}>
//             <form onSubmit={handleSubmit} className={styles.form}>
//               <div className={styles.serviceGroup}>
//                 <h3>Dịch vụ</h3>
//                 <select
//                   name="service"
//                   value={formData.service}
//                   onChange={handleChange}
//                   className={styles.dropdown}
//                 >
//                   <option value="">Chọn dịch vụ</option>
//                   <option value="dailyCare">Đặt chỗ hàng ngày</option>
//                   <option value="overnightCare">Chăm sóc qua đêm</option>
//                   <option value="holidayCare">
//                     Chăm sóc trong những ngày lễ
//                   </option>
//                 </select>
//               </div>
//               <div className={styles.paymentGroup}>
//                 <h3>Phương thức thanh toán</h3>
//                 <select
//                   name="paymentMethod"
//                   value={formData.paymentMethod}
//                   onChange={handleChange}
//                   className={styles.dropdown}
//                   required
//                 >
//                   <option value="">Thanh toán trước 50%</option>
//                   <option value="cash">Trả thẳng</option>
//                 </select>
//               </div>
//               <div className={styles.dateGroup}>
//                 Ngày:
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                 />
//                 <button className={styles.petbutton}>
//                   Chọn thú cưng trong danh sách của bạn
//                 </button>
//               </div>
//               <div className={styles.buttonGroup}>
//                 <button type="button" onClick={() => navigate("/")}>
//                   Quay lại
//                 </button>
//                 <button type="submit">Đặt lịch</button>
//               </div>
//             </form>
//           </main>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Book;
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Book.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import axios from "axios";

const Book = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [pets, setPets] = useState([]);
  const [isSelectPetPopupOpen, setIsSelectPetPopupOpen] = useState(false);
  const [isCreatePetPopupOpen, setIsCreatePetPopupOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    paymentMethod: "",
    date: ""
  });

  // Lấy danh sách dịch vụ
  useEffect(() => {
    fetch(
      "https://bookingpetservice.onrender.com/api/service/v1/getAllServiceIsActive"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setServices(data.data); // Lấy danh sách từ data.data
        } else {
          setServices([]);
        }
      })
      .catch((err) => console.error("Lỗi lấy danh sách dịch vụ:", err));
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

    const bookingData = new FormData();
    bookingData.append("serviceId", formData.service);
    bookingData.append("paymentId", formData.paymentMethod);
    bookingData.append("petId", selectedPet.petId);
    bookingData.append("localDate", formData.date);

    console.log("petId", bookingData.get("petId"));


    bookingData.forEach(e => {
      console.log(e.toString())
    });

    try {
      const response = await axios.post(
        "https://bookingpetservice.onrender.com/api/booking/v1/bookingByUser",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data" // Remove this if not necessary

          },
        }
      );

      const data = await response.data.data

      if (response.status >= 300) {
        throw new Error(data.message || "Đặt lịch thất bại, vui lòng thử lại!");
      }

      console.log("Navigating with booking data:", data);
      navigate("/booksuccess", { state: { bookingData: data } });
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      alert(error.message || "Đặt lịch thất bại!");
    }
  };

  const handleSelectPet = async () => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        console.error("Lỗi: Không tìm thấy token JWT!");
        alert("Bạn chưa đăng nhập! Vui lòng đăng nhập lại.");
        return;
      }

      console.log("Token JWT gửi đi:", token);

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

      console.log("Response từ server:", response.data);

      const data = response.data;
      if (data.data.length > 0) {
        setPets(data.data);
        setIsSelectPetPopupOpen(true);
      } else {
        setIsCreatePetPopupOpen(true);
      }
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
    }
  };

  return (
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
                Ngày:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <button className={styles.petbutton} onClick={handleSelectPet}>
                  Chọn thú cưng trong danh sách của bạn
                </button>
                {isSelectPetPopupOpen && (
                  <div className={styles.popup}>
                    <h3>Chọn thú cưng</h3>
                    <ul className={styles.petList}>
                      {pets.map((pet, index) => (
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
                      ))}
                    </ul>
                    {selectedPet && (
                      <div className={styles.selectedPet}>
                        <h3>Thú cưng đã chọn:</h3>
                        <img
                          src={selectedPet.imagePetBase64}
                          alt={selectedPet.petName}
                          style={{ width: "50%" }}
                        />
                        <p>Id: {selectedPet.petId}</p>
                        <p>Tên: {selectedPet.petName}</p>
                        <p>Tuổi: {selectedPet.age} năm</p>
                        <p>Giới tính: {selectedPet.petGenderEnum}</p>
                        <p>Loại: {selectedPet.petTypeEnum}</p>
                        <button onClick={() => setSelectedPet(null)}>
                          Hủy chọn
                        </button>
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
                <button type="button" onClick={() => navigate("/booksuccess")}>
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
  );
};

export default Book;
