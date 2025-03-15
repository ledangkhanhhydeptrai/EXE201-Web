// import Header from "../../Header/Header";
// import styles from "./Feed.module.scss";
// import search from "../../../public/search.svg";
// import dog from "../../../public/dog.svg";
// import cat from "../../../public/cat.svg";
// import foot from "../../../public/foot.svg";
// import shelter from "../../../public/shelter.svg";
// import arrow from "../../../public/arrow.svg";
// import footanimal from "../../../public/footanimal.svg";
// import footanimals from "../../../public/footanimalbrown.svg";
// import Footer from "../../Footer/Footer";
// import dogbrown from "../../../public/dogbrown.svg";
// import QA from "../../../public/QA.svg";
// import img1 from "../../assets/z6369576577552_580c166308f131b50539ffac55113167.jpg";
// import img2 from "../../assets/z6369579379219_19344e3e8b774dcdbe30ce846ff63bf0.jpg";
// import img3 from "../../assets/z6369587109001_d8a3c65448176c2f7c57b10dabebe472.jpg";
// import img4 from "../../assets/z6369603496112_b2386d9586f03d25133668b65ecf4c7f.jpg";
// import img5 from "../../assets/z6369605711050_806f6c19110d56571bd187c40e56a8f8.jpg";
// import img6 from "../../assets/z6369635997684_faf48a38e2c0842a94e7e13aac09c17f.jpg";
// import img7 from "../../assets/z6369640038292_24bf7f4869e9d627abbc624f0a2cf641.jpg";
// import img8 from "../../assets/z6369644025055_c7905ce5b5a5d9cf42ecfd22dcbade4e.jpg";
// import img9 from "../../assets/z6369656003481_fa6ef963f69229a89a281ef8fe7a4d96.jpg";
// import img10 from "../../assets/z6369659849397_49d81dc65a920a086071deaa12bb1fa9.jpg";
// import img11 from "../../assets/z6369662867291_f577206a184c0663b8d639075ba8e477.jpg";
// import img12 from "../../assets/z6369668695038_5ca7966e22fbeec289e8e1e508368fb6.jpg";
// import img13 from "../../assets/z6369670694904_0b6bba2e9f1704339b78754d84046cc7.jpg";
// import img14 from "../../assets/z6369674257599_96eb650eb493c92d630bc499281adb06.jpg";
// import img15 from "../../assets/z6369677144510_38d9c48d3890c7ffcab34a410dc201af.jpg";
// import img16 from "../../assets/z6369681169531_a2a012448d0a3e703bc82a0d36b239fc.jpg";
// import img17 from "../../assets/z6369685307927_6324a49e0f3253c85c701d963dcd3285.jpg";
// import img18 from "../../assets/z6369687916156_5a5b078514810277cd6e2bb95840e5f5.jpg";
// import img19 from "../../assets/z6369691010714_3f1bfb203a596e4f780355b85b06844d.jpg";
// import img20 from "../../assets/z6369693856631_4d600120022df42c627585b8bb2140c9.jpg";
// import img21 from "../../assets/z6369696578657_bbe3c75f290db61f4d54c6b1060ccfda.jpg";
// import img22 from "../../assets/z6369700505573_a8e2fc963b7064308c4442da8ecc11fd.jpg";
// export default function Feed() {
//   return (
//     <div className="container-fluid">
//       <div className={styles.app}>
//         <Header />
//         <div className={styles.main}>
//           <div className={styles.mainImage}>
//             <img src={img1} alt="Hug Animal" />
//           </div>
//           <div className={styles.Typeinput}>
//             <input type="text" placeholder="Tìm kiếm thú cưng bạn muốn..." />
//             <img src={search} alt="" className={styles.searchIcon} />
//           </div>
//           <div className={styles.title}>
//             <p className={styles.friendly}>Tìm người bạn thân mới của bạn</p>
//             <p className={styles.friendaccess}>
//               Duyệt qua các vật nuôi từ mạng lưới hơn 14.500 nơi trú ẩn và cứu
//               hộ của chúng tôi.
//             </p>
//           </div>
//           <div className={styles.cardContainer}>
//             <div className={styles.card}>
//               <div className={styles.dogicon}>
//                 <img src={dog} alt="" />
//                 <p>Dog</p>
//               </div>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.dogicon}>
//                 <img src={cat} alt="" />
//                 <p>Cat</p>
//               </div>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.dogicon}>
//                 <img src={foot} alt="" />
//                 <p>Other Animals</p>
//               </div>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.dogicon}>
//                 <img src={shelter} alt="" />
//                 <p>Shelters & Rescues</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.petnear}>
//           <p>
//             Những bạn pet gần đây <img src={arrow} alt="" />
//           </p>
//           <div className={styles.cardContainer}>
//             <div className={styles.card}>
//               <div className={styles.imageContainer}>
//                 <img src={img2} alt="Pet" />
//                 <div className={styles.heart}>❤️</div>
//               </div>
//               <p className={styles.littlepeanut}>Little Peanut</p>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.imageContainer}>
//                 <img src={img3} alt="" />
//                 <div className={styles.heart}>❤️</div>
//               </div>
//               <p className={styles.shirley}>Shirley</p>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.imageContainer}>
//                 {" "}
//                 <img src={img4} alt="" />
//                 <div className={styles.heart}>❤️</div>
//               </div>
//               <p className={styles.jax}>Jax</p>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.imageContainer}>
//                 <img src={img5} alt="" />
//                 <div className={styles.heart}>❤️</div>
//               </div>
//               <p className={styles.simba}>Simba</p>
//             </div>
//             <div className={styles.card1}>
//               <img src={footanimal} alt="" />
//               <p>2822 pet khác có sẵn trên AdoptPet</p>
//               <div className={styles.continue}>
//                 <p>Xem tiếp</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.informationpet}>
//           <div className={styles.information}>
//             <div className={styles.imagepet}>
//               <img src={img6} alt="" />
//               <div className={styles.nameimage}>
//                 <p>Kiti</p>
//               </div>
//               <div className={styles.imageprofile}>
//                 <p style={{ marginLeft: "-15px" }}>Giới tính: Đực</p>
//                 <p>Độ tuổi: Sơ sinh</p>
//                 <p>Tiêm phòng: Có</p>
//               </div>
//             </div>
//             <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
//             <button className={styles.nhannuoi}>Nhận nuôi</button>
//           </div>
//           <div className={styles.information}>
//             <div className={styles.imagepet}>
//               <img src={img7} alt="" />
//               <div className={styles.nameimage}>
//                 <p>Doo</p>
//               </div>
//               <div className={styles.imageprofile}>
//                 <p style={{ marginLeft: "-15px" }}>Giới tính: Đực</p>
//                 <p style={{ marginLeft: "39px" }}>Độ tuổi: Trưởng thành</p>
//                 <p>Tiêm phòng: Có</p>
//               </div>
//             </div>
//             <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
//             <button className={styles.nhannuoi}>Nhận nuôi</button>
//           </div>
//           <div className={styles.information}>
//             <div className={styles.imagepet}>
//               <img src={img8} alt="" />
//               <div className={styles.nameimage}>
//                 <p>Sun</p>
//               </div>
//               <div className={styles.imageprofile}>
//                 <p style={{ marginLeft: "-15px" }}>Giới tính: Đực</p>
//                 <p style={{ marginLeft: "39px" }}>Độ tuổi: Trưởng thành</p>
//                 <p>Tiêm phòng: Có</p>
//               </div>
//             </div>
//             <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
//             <button className={styles.nhannuoi}>Nhận nuôi</button>
//           </div>
//         </div>
//         <div className={styles.informationpet1}>
//           <div className={styles.information}>
//             <div className={styles.imagepet}>
//               <img src={img9} alt="" />
//               <div className={styles.nameimage}>
//                 <p>Ten</p>
//               </div>
//               <div className={styles.imageprofile}>
//                 <p style={{ marginLeft: "-15px" }}>Giới tính: Cái</p>
//                 <p>Độ tuổi: Sơ sinh</p>
//                 <p>Tiêm phòng: Có</p>
//               </div>
//             </div>
//             <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
//             <button className={styles.nhannuoi}>Nhận nuôi</button>
//           </div>
//           <div className={styles.information}>
//             <div className={styles.imagepet}>
//               <img src={img10} alt="" />
//               <div className={styles.nameimage}>
//                 <p>Tun</p>
//               </div>
//               <div className={styles.imageprofile}>
//                 <p style={{ marginLeft: "-15px" }}>Giới tính: Cái</p>
//                 <p>Độ tuổi: Sơ sinh</p>
//                 <p>Tiêm phòng: Có</p>
//               </div>
//             </div>
//             <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
//             <button className={styles.nhannuoi}>Nhận nuôi</button>
//           </div>
//           <div className={styles.information}>
//             <div className={styles.imagepet}>
//               <img src={img11} alt="" />
//               <div className={styles.nameimage}>
//                 <p>Don</p>
//               </div>
//               <div className={styles.imageprofile}>
//                 <p style={{ marginLeft: "-15px" }}>Giới tính: Cái</p>
//                 <p style={{ marginLeft: "39px" }}>Độ tuổi: Trưởng thành</p>
//                 <p>Tiêm phòng: Có</p>
//               </div>
//             </div>
//             <button className={styles.nhannuoithu}>Nhận nuôi thử</button>
//             <button className={styles.nhannuoi}>Nhận nuôi</button>
//           </div>
//         </div>
//         <div className={styles.suggest}>
//           <p>Bạn đang có ý định nhận nuôi một bé thú cưng?</p>
//           <div className={styles.imagesuggest}>
//             <div className={styles.title}>
//               <img src={footanimals} alt="" />
//               <p>Lưu ý cho người mới nhận nuôi</p>
//               <p className={styles.nametitle}>
//                 Thực hiện quá trình nhận pet áp dụng một cách suôn sẻ nhất có
//                 thể.
//               </p>
//               <button>Tìm hiểu thêm</button>
//             </div>
//             <div className={styles.title}>
//               <img src={dogbrown} alt="" />
//               <p>
//                 Một chú chó được tính bằng bao nhiêu tuổi theo tuổi của con
//                 người?
//               </p>
//               <p className={styles.nametitle} style={{ fontSize: "8px" }}>
//                 Học cách chuyển đổi tuổi chó sang tuổi người chỉ để vui, và
//                 ngược lại. Cuối cùng hãy trả lời xem con chó của bạn bao nhiêu
//                 tuổi!
//               </p>
//               <button style={{ marginTop: "9px" }}>Tìm hiểu thêm</button>
//             </div>
//             <div className={styles.title}>
//               <img src={QA} alt="" />
//               <p>Giải đáp</p>
//               <p
//                 className={styles.nametitle}
//                 style={{ fontSize: "16px", width: "98%" }}
//               >
//                 Nhận câu trả lời cho tất cả những câu hỏi mà bạn chưa nghĩ đến
//                 khi nhận pet?.
//               </p>
//               <button>Tìm hiểu thêm</button>
//             </div>
//           </div>
//         </div>
//         <div className={styles.process}>
//           <div className={styles.left}>
//             <h2>Quy trình nhận nuôi</h2>
//             <p>
//               Trước khi quyết định nhận nuôi bé chó hay mèo nào, bạn hãy tự hỏi
//               bản thân rằng mình đã sẵn sàng để chịu trách nhiệm cả đời cho bé
//               chưa, cả về tài chính, nơi ở cũng như tinh thần. Việc nhận nuôi
//               cần được sự đồng thuận lớn từ bản thân bạn cũng như gia đình và
//               những người liên quan. Xin cân nhắc kỹ trước khi liên hệ với chúng
//               tôi về việc nhận nuôi.
//             </p>
//             <div className={styles.imageContainer}>
//               <img src={img12} alt="Dog" />
//               <img src={img13} alt="Cat" />
//             </div>
//           </div>
//           <div className={styles.right}>
//             <img src={img14} alt="" />
//             <div className={styles.mainImage}>
//               <h3>Điều kiện nhận nuôi</h3>
//               <ul>
//                 <li>Tài chính tự chủ và ổn định.</li>
//                 <li>Chỗ ở cố định, ưu tiên tại TPHCM.</li>
//                 <li>Cam kết tiêm phòng và triệt sản.</li>
//               </ul>
//               <h4>Bạn đã sẵn sàng? Hãy thực hiện các bước sau đây nhé:</h4>
//               <ol>
//                 <li>
//                   Tìm hiểu về thú cưng bạn muốn nhận nuôi trên trang web A dopt
//                   a pet?.
//                 </li>
//                 <li>
//                   Liên hệ với Tình nguyện viên phụ trách bé để tìm hiểu thêm về
//                   bé.
//                 </li>
//                 <li>Tham gia phỏng vấn nhận nuôi.</li>
//                 <li>
//                   Chuẩn bị cơ sở vật chất, ký giấy tờ nhận nuôi và đóng tiền vía
//                   để đón bé về.
//                 </li>
//                 <li>
//                   Thường xuyên cập nhật về tình hình của bé, đặc biệt là khi có
//                   sự cố để được tư vấn kịp thời.
//                 </li>
//               </ol>
//             </div>
//             <div className={styles.imageRight}>
//               <img src={img15} alt="Cat" className={styles.firstimage} />
//               <img src={img16} alt="Cat" className={styles.secondimage} />
//             </div>
//           </div>
//         </div>
//         <div className={styles.petnear}>
//           <p>
//             Những bạn pet gần đây <img src={arrow} alt="" />
//           </p>
//           <div className={styles.cardContainer}>
//             <div className={styles.card}>
//               <div className={styles.imageContainer}>
//                 <img src={img17} alt="Pet" />
//                 <div className={styles.heart}>❤️</div>
//               </div>
//               <p
//                 className={styles.littlepeanut}
//                 style={{ width: "15.5%", marginLeft: "-1px", fontSize: "17px" }}
//               >
//                 Mr
//               </p>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.imageContainer}>
//                 <img src={img18} alt="" />
//                 <div className={styles.heart}>❤️</div>
//               </div>
//               <p
//                 className={styles.shirley}
//                 style={{ width: "15.5%", marginLeft: "-1px", fontSize: "17px" }}
//               >
//                 Sam
//               </p>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.imageContainer}>
//                 {" "}
//                 <img src={img19} alt="" />
//                 <div className={styles.heart}>❤️</div>
//               </div>
//               <p
//                 className={styles.jax}
//                 style={{ width: "15.5%", marginLeft: "-1px", fontSize: "17px" }}
//               >
//                 Little Peanut
//               </p>
//             </div>
//             <div className={styles.card}>
//               <div className={styles.imageContainer}>
//                 <img src={img20} alt="" />
//                 <div className={styles.heart}>❤️</div>
//               </div>
//               <p
//                 className={styles.simba}
//                 style={{ width: "15.5%", marginLeft: "-1px", fontSize: "17px" }}
//               >
//                 Roxie California
//               </p>
//             </div>
//             <div className={styles.card1}>
//               <img src={footanimal} alt="" />
//               <p>2822 pet khác có sẵn trên AdoptPet</p>
//               <div className={styles.continue}>
//                 <p>Xem tiếp</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.cardfooter}>
//           <img src={img21} alt="" />
//           <div className={styles.borderimage}>
//             <img src={img21} alt="" />
//           </div>
//           <div className={styles.bordercard}>
//             <p className={styles.post}>Bài viết về nhận nuôi chó</p>
//             <p className={styles.findout}>
//               Tìm hiểu thêm về cách chăm sóc chú chó mới của bạn
//             </p>
//             <p className={styles.readmore}>ĐỌC THÊM</p>
//           </div>
//         </div>
//         <div className={styles.cardfooter1}>
//           <img src={img22} alt="" />
//           <div className={styles.borderimage}>
//             <img src={img22} alt="" />
//           </div>
//           <div className={styles.bordercard}>
//             <p className={styles.post}>Bài viết về việc nhận nuôi mèo</p>
//             <p className={styles.findout}>
//               Những hiểu biết hữu ích về những điều có thể mong đợi.
//             </p>
//             <p className={styles.readmore}>ĐỌC THÊM</p>
//           </div>
//         </div>
//         <div style={{ marginLeft: "10px", marginTop: "50px" }}>
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Feed.module.scss";
import Header from "../../Header/Header";
import { Button } from "@mui/material";

export default function Feed() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("jwt");
  const [petId, setPetId] = useState(0);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petGender, setPetGender] = useState("");
  const [imagePetBase64, setImagePetBase64] = useState(null);
  const [note, setNote] = useState("");
  const [petAge, setPetAge] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bookingpetservice.onrender.com/api/pets/v1/getPetListOfUser",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status >= 200 && response.status < 300) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
    };

    if (token) {
      fetchData();
    } else {
      console.warn("JWT token không tồn tại!");
    }
  }, [token]);
  const formData = new FormData();
  formData.append("petName", petName);
  formData.append("petType", petType);
  formData.append("petGender", petGender);
  formData.append("file", imagePetBase64);
  formData.append("note", note);
  formData.append("petAge", petAge);
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://bookingpetservice.onrender.com/api/pets/v1/createPet",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setData([...data, response.data.data]);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Lỗi tạo thú cưng:", error);
    }
  };
  const UpdateFeed = async (pet) => {
    setSelectedPet(pet);
    setPetName(pet?.petName);
    setPetType(pet?.petType);
    setPetGender(pet?.petGender);
    setImagePetBase64(null);
    setNote(pet?.notes);
    setPetAge(pet?.petAges);
    setPetId(pet?.petId);
    setShowUpdateForm(true);
  };

  // const handleUpdate = async (event) => {
  //   event.preventDefault();

  //   if (!selectedPet?.petId) {
  //     alert("❌ Lỗi: Không tìm thấy ID thú cưng!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("petName", petName);
  //   formData.append("petTypeEnum", petType);
  //   formData.append("petGenderEnum", petGender);
  //   formData.append("notes", note);
  //   formData.append("ages", petAge);

  //   // 🛑 Kiểm tra nếu người dùng đã chọn file ảnh mới
  //   if (imagePetBase64 instanceof File && imagePetBase64.name) {
  //     formData.append("imagePet", imagePetBase64);
  //   } else {
  //     console.warn(
  //       "⚠️ Không có file hoặc file không hợp lệ, gửi request không có ảnh."
  //     );
  //   }

  //   try {
  //     console.log("📤 Sending Data:", Object.fromEntries(formData.entries()));

  //     const response = await axios.put(
  //       `https://bookingpetservice.onrender.com/api/pets/v1/updatePet/${selectedPet?.petId}`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status >= 200 && response.status < 300) {
  //       alert("✅ Cập nhật thú cưng thành công!");
  //       setShowUpdateForm(false);
  //     }
  //   } catch (error) {
  //     console.error("🚨 Lỗi khi cập nhật dịch vụ:", error);
  //     console.error("🔴 Response Data:", error.response?.data);

  //     alert(
  //       `❌ Lỗi cập nhật: ${error.response?.data?.message || "Có lỗi xảy ra!"}`
  //     );
  //   }
  // };
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!selectedPet?.petId) {
      alert("❌ Lỗi: Không tìm thấy ID thú cưng!");
      return;
    }

    const formData = new FormData();
    formData.append("petId", petId);
    formData.append("petName", petName);
    formData.append("petTypeEnum", petType);
    formData.append("petGenderEnum", petGender);
    formData.append("notes", note);
    formData.append("ages", petAge);
    // 🛑 Kiểm tra nếu người dùng đã chọn file ảnh mới
    if (imagePetBase64) {
      formData.append("imagePet", imagePetBase64);
    } else {
      console.warn("⚠️ Không có file ảnh, gửi request không có ảnh.");
    }

    // 📝 Kiểm tra dữ liệu gửi đi
    console.log("📤 FormData Gửi đi:");
    for (let [key, value] of formData.entries()) {
      console.log(`📝 ${key}:`, value);
    }

    try {
      console.log("📤 Sending Data:", Object.fromEntries(formData.entries()));

      const response = await axios.put(
        `https://bookingpetservice.onrender.com/api/pets/v1/updatePet/${selectedPet?.petId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("✅ Cập nhật thú cưng thành công!");
        setShowUpdateForm(false);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi cập nhật dịch vụ:", error);
      console.error("🔴 Response Data:", error.response?.data);

      alert(
        `❌ Lỗi cập nhật: ${error.response?.data?.message || "Có lỗi xảy ra!"}`
      );
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Nhận Nuôi Thú Cưng</h1>
      <div className={styles.petsList}>
        {data?.map((pet, index) => (
          <div
            key={pet?.petId || index}
            className={`${styles.petCard} ${
              selectedPet?.petId === pet?.petId ? styles.selected : ""
            }`}
            onClick={() => setSelectedPet(pet)}
          >
            <img
              src={pet?.imagePetBase64}
              alt={pet?.petName}
              className={styles.petImage}
            />
            <h3>{pet?.petName}</h3>
            <p>
              {pet?.petTypeEnum} - {pet?.age} tháng - {pet?.petGenderEnum}
            </p>
          </div>
        ))}
      </div>

      {selectedPet && (
        <div className={styles.petDetail}>
          <h2>Thông tin chi tiết</h2>
          <p>
            <strong>Tên:</strong> {selectedPet?.petName}
          </p>
          <p>
            <strong>Loại:</strong> {selectedPet?.petTypeEnum}
          </p>
          <p>
            <strong>Giới tính:</strong> {selectedPet?.petGenderEnum}
          </p>
          <p>
            <strong>Tuổi:</strong> {selectedPet?.age} tháng
          </p>
          <button className={styles.adoptButton}>Nhận Nuôi</button>
        </div>
      )}
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        onClick={() => setShowForm(true)}
      >
        + Create
      </Button>

      {showForm && (
        <div className={styles.formContainer} key={data?.petName}>
          <h2 className={styles.title}>Thêm Thú Cưng</h2>
          <div className={styles.group}>
            <input
              className={styles.input}
              type="text"
              placeholder="Tên thú cưng"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />

            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
            >
              <option value="">Chọn loại thú cưng</option>
              <option value="DOG">Chó</option>
              <option value="CAT">Mèo</option>
            </select>

            <select
              value={petGender}
              onChange={(e) => setPetGender(e.target.value)}
            >
              <option value="">Chọn giới tính</option>
              <option value="MALE">Đực</option>
              <option value="FEMALE">Cái</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImagePetBase64(file);
                } else {
                  setImagePetBase64(null);
                }
              }}
            />

            <input
              type="text"
              placeholder="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <input
              type="number"
              placeholder="Tuổi (tháng)"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
            />

            <Button onClick={handleCreate}>Tạo</Button>
            <Button onClick={() => setShowForm(false)}>Hủy</Button>
          </div>
        </div>
      )}
      {showUpdateForm && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Cập Nhật Thú Cưng</h2>
            <input
              type="number"
              placeholder="Nhập ID"
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tên thú cưng"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />

            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
            >
              <option value="DOG">Chó</option>
              <option value="CAT">Mèo</option>
            </select>

            <select
              value={petGender}
              onChange={(e) => setPetGender(e.target.value)}
            >
              <option value="MALE">Đực</option>
              <option value="FEMALE">Cái</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => setImagePetBase64(reader.result);
                }
              }}
            />

            <input
              type="text"
              placeholder="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <input
              type="number"
              placeholder="Tuổi (tháng)"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
            />

            <button onClick={handleUpdate}>Cập Nhật</button>
            <button onClick={() => setShowUpdateForm(false)}>Hủy</button>
          </div>
        </div>
      )}
      {selectedPet && (
        <div className={styles.petDetail}>
          <h2>Thông tin chi tiết</h2>
          <p>
            <strong>Tên:</strong> {selectedPet?.petName}
          </p>
          <p>
            <strong>Loại:</strong> {selectedPet?.petTypeEnum}
          </p>
          <p>
            <strong>Giới tính:</strong> {selectedPet?.petGenderEnum}
          </p>
          <p>
            <strong>Tuổi:</strong> {selectedPet?.age} tháng
          </p>
          <button className={styles.adoptButton}>Nhận Nuôi</button>
          <button
            className={styles.updateButton}
            onClick={() => UpdateFeed(selectedPet)}
          >
            Cập Nhật
          </button>
        </div>
      )}
    </div>
  );
}
