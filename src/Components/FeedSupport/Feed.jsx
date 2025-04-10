import Header from "../../Header/Header";
import styles from "./Feed.module.scss";
import search from "../../../public/search.svg";
import dog from "../../../public/dog.svg";
import cat from "../../../public/cat.svg";
import foot from "../../../public/foot.svg";
import shelter from "../../../public/shelter.svg";
import arrow from "../../../public/arrow.svg";
import footanimal from "../../../public/footanimal.svg";
import footanimals from "../../../public/footanimalbrown.svg";
import Footer from "../../Footer/Footer";
import dogbrown from "../../../public/dogbrown.svg";
import QA from "../../../public/QA.svg";
import img1 from "../../assets/z6369576577552_580c166308f131b50539ffac55113167.jpg";
import img2 from "../../assets/z6369579379219_19344e3e8b774dcdbe30ce846ff63bf0.jpg";
import img3 from "../../assets/z6369587109001_d8a3c65448176c2f7c57b10dabebe472.jpg";
import img4 from "../../assets/z6369603496112_b2386d9586f03d25133668b65ecf4c7f.jpg";
import img5 from "../../assets/z6369605711050_806f6c19110d56571bd187c40e56a8f8.jpg";
import img6 from "../../assets/z6369635997684_faf48a38e2c0842a94e7e13aac09c17f.jpg";
import img7 from "../../assets/z6369640038292_24bf7f4869e9d627abbc624f0a2cf641.jpg";
import img8 from "../../assets/z6369644025055_c7905ce5b5a5d9cf42ecfd22dcbade4e.jpg";
import img9 from "../../assets/z6369656003481_fa6ef963f69229a89a281ef8fe7a4d96.jpg";
import img10 from "../../assets/z6369659849397_49d81dc65a920a086071deaa12bb1fa9.jpg";
import img11 from "../../assets/z6369662867291_f577206a184c0663b8d639075ba8e477.jpg";
import img12 from "../../assets/z6369668695038_5ca7966e22fbeec289e8e1e508368fb6.jpg";
import img13 from "../../assets/z6369670694904_0b6bba2e9f1704339b78754d84046cc7.jpg";
import img14 from "../../assets/z6369674257599_96eb650eb493c92d630bc499281adb06.jpg";
import img15 from "../../assets/z6369677144510_38d9c48d3890c7ffcab34a410dc201af.jpg";
import img16 from "../../assets/z6369681169531_a2a012448d0a3e703bc82a0d36b239fc.jpg";
import img17 from "../../assets/z6369685307927_6324a49e0f3253c85c701d963dcd3285.jpg";
import img18 from "../../assets/z6369687916156_5a5b078514810277cd6e2bb95840e5f5.jpg";
import img19 from "../../assets/z6369691010714_3f1bfb203a596e4f780355b85b06844d.jpg";
import img20 from "../../assets/z6369693856631_4d600120022df42c627585b8bb2140c9.jpg";
import img21 from "../../assets/z6369696578657_bbe3c75f290db61f4d54c6b1060ccfda.jpg";
import img22 from "../../assets/z6369700505573_a8e2fc963b7064308c4442da8ecc11fd.jpg";
export default function Feed() {
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.main}>
          <div className={styles.mainImage}>
            <img src={img1} alt="Hug Animal" />
          </div>
          <div className={styles.Typeinput}>
            <input type="text" placeholder="Tìm kiếm thú cưng bạn muốn..." />
            <img src={search} alt="" className={styles.searchIcon} />
          </div>
          <div className={styles.title}>
            <p className={styles.friendly}>Tìm người bạn thân mới của bạn</p>
            <p className={styles.friendaccess}>
              Duyệt qua các vật nuôi từ mạng lưới hơn 14.500 nơi trú ẩn và cứu
              hộ của chúng tôi.
            </p>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.dogicon}>
                <img src={dog} alt="" />
                <p>Chó</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.dogicon}>
                <img src={cat} alt="" />
                <p>Mèo</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.dogicon}>
                <img src={foot} alt="" />
                <p>Động vật khác</p>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.dogicon}>
                <img src={shelter} alt="" />
                <p>Nơi ở và cứu hộ</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.petnear}>
          <p>
            Những bạn pet gần đây <img src={arrow} alt="" />
          </p>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={img2} alt="Pet" />
                <div className={styles.heart}>❤️</div>
              </div>
              <p className={styles.littlepeanut}>MiuMiu</p>
            </div>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={img3} alt="" />
                <div className={styles.heart}>❤️</div>
              </div>
              <p className={styles.shirley}>Ken</p>
            </div>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                {" "}
                <img src={img4} alt="" />
                <div className={styles.heart}>❤️</div>
              </div>
              <p className={styles.jax}>Rô</p>
            </div>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={img5} alt="" />
                <div className={styles.heart}>❤️</div>
              </div>
              <p className={styles.simba}>So</p>
            </div>
            <div className={styles.card1}>
              <img src={footanimal} alt="" />
              <p>2822 pet khác có sẵn trên AdoptPet</p>
              <div className={styles.continue}>
                <p>Xem tiếp</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.informationpet}>
          <div className={styles.information}>
            <div className={styles.imagepet}>
              <img src={img6} alt="" />
              <div className={styles.nameimage}>
                <p>Kiti</p>
              </div>
              <div className={styles.imageprofile}>
                <p style={{ marginLeft: "-15px" }}>Giới tính: Đực</p>
                <p>Độ tuổi: Sơ sinh</p>
                <p>Tiêm phòng: Có</p>
              </div>
            </div>
            <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
            <button className={styles.nhannuoi}>Nhận nuôi</button>
          </div>
          <div className={styles.information}>
            <div className={styles.imagepet}>
              <img src={img7} alt="" />
              <div className={styles.nameimage}>
                <p>Doo</p>
              </div>
              <div className={styles.imageprofile}>
                <p style={{ marginLeft: "-15px" }}>Giới tính: Đực</p>
                <p style={{ marginLeft: "39px" }}>Độ tuổi: Trưởng thành</p>
                <p>Tiêm phòng: Có</p>
              </div>
            </div>
            <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
            <button className={styles.nhannuoi}>Nhận nuôi</button>
          </div>
          <div className={styles.information}>
            <div className={styles.imagepet}>
              <img src={img8} alt="" />
              <div className={styles.nameimage}>
                <p>Sun</p>
              </div>
              <div className={styles.imageprofile}>
                <p style={{ marginLeft: "-15px" }}>Giới tính: Đực</p>
                <p style={{ marginLeft: "39px" }}>Độ tuổi: Trưởng thành</p>
                <p>Tiêm phòng: Có</p>
              </div>
            </div>
            <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
            <button className={styles.nhannuoi}>Nhận nuôi</button>
          </div>
        </div>
        <div className={styles.informationpet1}>
          <div className={styles.information}>
            <div className={styles.imagepet}>
              <img src={img9} alt="" />
              <div className={styles.nameimage}>
                <p>Ten</p>
              </div>
              <div className={styles.imageprofile}>
                <p style={{ marginLeft: "-15px" }}>Giới tính: Cái</p>
                <p>Độ tuổi: Sơ sinh</p>
                <p>Tiêm phòng: Có</p>
              </div>
            </div>
            <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
            <button className={styles.nhannuoi}>Nhận nuôi</button>
          </div>
          <div className={styles.information}>
            <div className={styles.imagepet}>
              <img src={img10} alt="" />
              <div className={styles.nameimage}>
                <p>Tun</p>
              </div>
              <div className={styles.imageprofile}>
                <p style={{ marginLeft: "-15px" }}>Giới tính: Cái</p>
                <p>Độ tuổi: Sơ sinh</p>
                <p>Tiêm phòng: Có</p>
              </div>
            </div>
            <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
            <button className={styles.nhannuoi}>Nhận nuôi</button>
          </div>
          <div className={styles.information}>
            <div className={styles.imagepet}>
              <img src={img11} alt="" />
              <div className={styles.nameimage}>
                <p>Don</p>
              </div>
              <div className={styles.imageprofile}>
                <p style={{ marginLeft: "-15px" }}>Giới tính: Cái</p>
                <p style={{ marginLeft: "39px" }}>Độ tuổi: Trưởng thành</p>
                <p>Tiêm phòng: Có</p>
              </div>
            </div>
            <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
            <button className={styles.nhannuoi}>Nhận nuôi</button>
          </div>
        </div>
        <div className={styles.suggest}>
          <p>Bạn đang có ý định nhận nuôi một bé thú cưng?</p>
          <div className={styles.imagesuggest}>
            <div className={styles.title}>
              <img src={footanimals} alt="" />
              <p>Lưu ý cho người mới nhận nuôi</p>
              <p className={styles.nametitle}>
                Thực hiện quá trình nhận pet áp dụng một cách suôn sẻ nhất có
                thể.
              </p>
              <button>Tìm hiểu thêm</button>
            </div>
            <div className={styles.title}>
              <img src={dogbrown} alt="" />
              <p>
                Một chú chó được tính bằng bao nhiêu tuổi theo tuổi của con
                người?
              </p>
              <p className={styles.nametitle} style={{ fontSize: "8px" }}>
                Học cách chuyển đổi tuổi chó sang tuổi người chỉ để vui, và
                ngược lại. Cuối cùng hãy trả lời xem con chó của bạn bao nhiêu
                tuổi!
              </p>
              <button style={{ marginTop: "9px" }}>Tìm hiểu thêm</button>
            </div>
            <div className={styles.title}>
              <img src={QA} alt="" />
              <p>Giải đáp</p>
              <p
                className={styles.nametitle}
                style={{ fontSize: "16px", width: "98%" }}
              >
                Nhận câu trả lời cho tất cả những câu hỏi mà bạn chưa nghĩ đến
                khi nhận pet?.
              </p>
              <button>Tìm hiểu thêm</button>
            </div>
          </div>
        </div>
        <div className={styles.process}>
          <div className={styles.left}>
            <h2>Quy trình nhận nuôi</h2>
            <p>
              Trước khi quyết định nhận nuôi bé chó hay mèo nào, bạn hãy tự hỏi
              bản thân rằng mình đã sẵn sàng để chịu trách nhiệm cả đời cho bé
              chưa, cả về tài chính, nơi ở cũng như tinh thần. Việc nhận nuôi
              cần được sự đồng thuận lớn từ bản thân bạn cũng như gia đình và
              những người liên quan. Xin cân nhắc kỹ trước khi liên hệ với chúng
              tôi về việc nhận nuôi.
            </p>
            <div className={styles.imageContainer}>
              <img src={img12} alt="Dog" />
              <img src={img13} alt="Cat" />
            </div>
          </div>
          <div className={styles.right}>
            <img src={img14} alt="" />
            <div className={styles.mainImage}>
              <h3>Điều kiện nhận nuôi</h3>
              <ul>
                <li>Tài chính tự chủ và ổn định.</li>
                <li>Chỗ ở cố định, ưu tiên tại TPHCM.</li>
                <li>Cam kết tiêm phòng và triệt sản.</li>
              </ul>
              <h4>Bạn đã sẵn sàng? Hãy thực hiện các bước sau đây nhé:</h4>
              <ol>
                <li>
                  Tìm hiểu về thú cưng bạn muốn nhận nuôi trên trang web A dopt
                  a pet?.
                </li>
                <li>
                  Liên hệ với Tình nguyện viên phụ trách bé để tìm hiểu thêm về
                  bé.
                </li>
                <li>Tham gia phỏng vấn nhận nuôi.</li>
                <li>
                  Chuẩn bị cơ sở vật chất, ký giấy tờ nhận nuôi và đóng tiền vía
                  để đón bé về.
                </li>
                <li>
                  Thường xuyên cập nhật về tình hình của bé, đặc biệt là khi có
                  sự cố để được tư vấn kịp thời.
                </li>
              </ol>
            </div>
            <div className={styles.imageRight}>
              <img src={img15} alt="Cat" className={styles.firstimage} />
              <img src={img16} alt="Cat" className={styles.secondimage} />
            </div>
          </div>
        </div>
        <div className={styles.petnear}>
          <p>
            Những bạn pet gần đây <img src={arrow} alt="" />
          </p>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={img17} alt="Pet" />
                <div className={styles.heart}>❤️</div>
              </div>
              <p
                className={styles.littlepeanut}
                style={{ width: "15.5%", marginLeft: "-1px", fontSize: "17px" }}
              >
                Đen
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={img18} alt="" />
                <div className={styles.heart}>❤️</div>
              </div>
              <p
                className={styles.shirley}
                style={{ width: "15.5%", marginLeft: "-1px", fontSize: "17px" }}
              >
                Đốm
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                {" "}
                <img src={img19} alt="" />
                <div className={styles.heart}>❤️</div>
              </div>
              <p
                className={styles.jax}
                style={{ width: "15.5%", marginLeft: "-1px", fontSize: "17px" }}
              >
                Mực
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={img20} alt="" />
                <div className={styles.heart}>❤️</div>
              </div>
              <p
                className={styles.simba}
                style={{ width: "15.5%", marginLeft: "-1px", fontSize: "17px" }}
              >
                Ki
              </p>
            </div>
            <div className={styles.card1}>
              <img src={footanimal} alt="" />
              <p>2822 pet khác có sẵn trên AdoptPet</p>
              <div className={styles.continue}>
                <p>Xem tiếp</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cardfooter}>
          <img src={img21} alt="" />
          <div className={styles.borderimage}>
            <img src={img21} alt="" />
          </div>
          <div className={styles.bordercard}>
            <p className={styles.post}>Bài viết về nhận nuôi chó</p>
            <p className={styles.findout}>
              Tìm hiểu thêm về cách chăm sóc chú chó mới của bạn
            </p>
            <p className={styles.readmore}>ĐỌC THÊM</p>
          </div>
        </div>
        <div className={styles.cardfooter1}>
          <img src={img22} alt="" />
          <div className={styles.borderimage}>
            <img src={img22} alt="" />
          </div>
          <div className={styles.bordercard}>
            <p className={styles.post}>Bài viết về việc nhận nuôi mèo</p>
            <p className={styles.findout}>
              Những hiểu biết hữu ích về những điều có thể mong đợi.
            </p>
            <p className={styles.readmore}>ĐỌC THÊM</p>
          </div>
        </div>
        <div style={{ marginLeft: "10px", marginTop: "50px" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Feed.module.scss";
// import Header from "../../Header/Header";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Footer from "../../Footer/Footer";
// /* Danh sách thú cưng của bạn copy trang feed qua trang managepetUser
//    Trang danh sách thú cưng đổi thành cái nhận nuôi
// */
// export default function Feed() {
//   const [selectedPet] = useState(null);
//   const [data, setData] = useState([]);
//   const token = localStorage.getItem("jwt");
//   const [petName, setPetName] = useState("");
//   const [petType, setPetType] = useState("");
//   const [petGender, setPetGender] = useState("");
//   const [file, setFile] = useState(null);
//   const [note, setNote] = useState("");
//   const [petAge, setPetAge] = useState(0);
//   const [showForm, setShowForm] = useState(false);
//   const isLoggedIn = Boolean(localStorage.getItem("jwt"));
//   const [openPopUp, setOpenPopUp] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const navigate = useNavigate();
//   const handleClick = async () => {
//     if (isLoggedIn) {
//       setShowForm(true);
//     } else {
//       setOpenPopUp(true);
//     }
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://bookingpetservice.onrender.com/api/pets/v1/getPetListOfUser",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );
//         if (response.status >= 200 && response.status < 300) {
//           setData(response.data.data);
//         }
//         console.log("API Response:", response.data.data);
//       } catch (error) {
//         console.error("Lỗi tải dữ liệu:", error);
//       }
//     };

//     if (token) {
//       fetchData();
//     } else {
//       console.warn("JWT token không tồn tại!");
//     }
//     console.log("JWT Token:", token);
//   }, [token]);
//   const formData = new FormData();
//   formData.append("petName", petName);
//   formData.append("petType", petType);
//   formData.append("petGender", petGender);
//   formData.append("file", file);
//   formData.append("note", note);
//   formData.append("petAge", petAge);
//   const handleCreate = async () => {
//     try {
//       const response = await axios.post(
//         "https://bookingpetservice.onrender.com/api/pets/v1/createPet",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data"
//           }
//         }
//       );

//       if (response.status >= 200 && response.status < 300) {
//         setData([...data, response.data.data]);
//         setShowForm(false);
//       }
//     } catch (error) {
//       console.error("Lỗi tạo thú cưng:", error);
//     }
//   };
//   const date = new Date().toDateString();
//   return (
//     <div className={styles.container}>
//       <Header />
//       <h1 className={styles.title}>Danh sách thú cưng của bạn</h1>
//       <Box
//         sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
//       >
//         <Button variant="contained" onClick={handleClick}>
//           + Create
//         </Button>
//       </Box>
//       <div className={styles.petsList}>
//         {data?.map((pet, index) => (
//           <div
//             key={pet?.petId || index}
//             className={`${styles.petCard} ${
//               selectedPet?.petId === pet?.petId ? styles.selected : ""
//             }`}
//             onClick={() => navigate(`/pet/${pet.petId}`)}
//           >
//             <img
//               src={pet?.imagePetBase64}
//               alt={pet?.petName}
//               className={styles.petImage}
//             />
//             <h3>{pet?.petName}</h3>
//             <p>
//               {pet?.petType} - {pet?.age} tháng - {pet?.petGender}
//             </p>
//           </div>
//         ))}
//       </div>
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Thông tin chi tiết</DialogTitle>
//         <DialogContent>
//           <p>
//             <strong>Tên:</strong> {selectedPet?.petName}
//           </p>
//           <p>
//             <strong>Loại:</strong> {selectedPet?.petTypeEnum}
//           </p>
//           <p>
//             <strong>Giới tính:</strong> {selectedPet?.petGenderEnum}
//           </p>
//           <p>
//             <strong>Tuổi:</strong> {selectedPet?.age} tháng
//           </p>
//           <p>{date}</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
//           <Button variant="contained" color="primary">
//             Nhận Nuôi
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openPopUp} onClose={() => setOpenPopUp(false)}>
//         <DialogTitle>Thông báo</DialogTitle>
//         <DialogContent>Bạn cần đăng nhập mới tạo được thú cưng!</DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPopUp(false)} color="primary">
//             Đóng
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={showForm} onClose={() => setShowForm(false)}>
//         <DialogTitle>Tạo Thú Cưng</DialogTitle>
//         <DialogContent className={styles["popup-container"]}>
//           <input
//             type="text"
//             placeholder="Tên thú cưng"
//             value={petName}
//             onChange={(e) => setPetName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Loại thú cưng"
//             value={petType}
//             onChange={(e) => setPetType(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Giới tính"
//             value={petGender}
//             onChange={(e) => setPetGender(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Tuổi"
//             value={petAge}
//             onChange={(e) => setPetAge(e.target.value)}
//           />
//           <input
//             type="file"
//             className={styles["file-input"]}
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <textarea
//             placeholder="Ghi chú"
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions className={styles["dialog-actions"]}>
//           <Button
//             className={styles["cancel-button"]}
//             onClick={() => setShowForm(false)}
//           >
//             Hủy
//           </Button>
//           <Button className={styles["create-button"]} onClick={handleCreate}>
//             Xác nhận
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <div style={{ marginLeft: "-10px", textAlign: "left" }}>
//         <Footer />
//       </div>
//     </div>
//   );
// }
