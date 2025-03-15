import { useState } from "react";
import Header from "../../Header/Header";
import styles from "./Matching.module.scss";
import { UilArrowRight, UilHeart } from "@iconscout/react-unicons";
import svg1 from "../../../public/symbol.svg";
import svg2 from "../../../public/symbol1.svg";
import svg3 from "../../../public/symbol2.svg";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/z6225784962116_c2a6ef383a2e2990a1a6939c35c35a4b.jpg";
import img2 from "../../assets/z6369555366664_423c56063ea1cb137370542d00fd7479.jpg";
import img3 from "../../assets/z6369565714984_b388852cba9cba911d07baf40acb607a.jpg";
import img4 from "../../assets/z6369571039943_37cdf947105fe12009dd1b3525dd412c.jpg";
import img5 from "../../assets/z6369750887939_290ff825fadd6ffdf5f4a20b2f561020.jpg";
export default function Matching() {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dropdownMenu1, setDropdownMenu1] = useState(false);
  const [selectedBreed1, setSelectedBreed1] = useState("");
  const [dropdownMenu2, setDropdownMenu2] = useState(false);
  const [selectedBreed2, setSelectedBreed2] = useState("");
  const [liked, setLiked] = useState(false);
  const [liked1, setLiked1] = useState(false);
  const [liked2, setLiked2] = useState(false);
  const [liked3, setLiked3] = useState(false);
  const navigate = useNavigate();
  const toggleDropdownMenu = () => {
    setDropdownMenu(!dropdownMenu);
  };
  const handleSelectBreed = (breed) => {
    setSelectedBreed(breed);
    setDropdownMenu(false);
  };
  const toggleDropdownMenu1 = () => {
    setDropdownMenu1(!dropdownMenu1);
  };
  const handleSelectBreed1 = (breed) => {
    setSelectedBreed1(breed);
    setDropdownMenu1(false);
  };
  const toggleDropdownMenu2 = () => {
    setDropdownMenu2(!dropdownMenu2);
  };
  const handleSelectBreed2 = (breed) => {
    setSelectedBreed2(breed);
    setDropdownMenu2(false);
  };
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.brand}>
          <img src={img5} alt="Hug Pet" />
          <div className={styles.title}>
            <h1>Adopt Me !</h1>
            <p className={styles.findpet}>Tìm thú cưng hoặc ghép đôi</p>
            <p className={styles.typepet}>Loại thú cưng</p>
            <div className={styles.petTypes}>
              <p>Chó</p>
              <p>Mèo</p>
              <p>Khác</p>
            </div>
            <div className={styles.formGroup} onClick={toggleDropdownMenu}>
              <label htmlFor="">Chủng loài</label>
              <div className={styles.arrow} />
              <input
                type="text"
                placeholder="Chọn từ danh sách"
                value={selectedBreed}
              />
            </div>
            {dropdownMenu && (
              <ul className={styles.dropdownMenu}>
                {["Husky", "Poodle", "Corgi"].map((breed) => (
                  <li key={breed} onClick={() => handleSelectBreed(breed)}>
                    {breed}
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.formGroup1}>
              <label htmlFor="">Thành phố/Tỉnh thành</label>
              <input type="text" placeholder="Chọn địa điểm của bạn..." />
            </div>
            <button>
              Bắt đầu tìm kiếm <UilArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <p>
            Khởi động một hành trình mới cùng Ghép Đôi duy nhất chỉ có tại Adopt
            Pet
          </p>
          <div className={styles.findmatching}>
            <img src={svg1} alt="" />
            <p className={styles.searchmatching}>Bắt đầu tìm kiếm ghép đôi</p>
            <p className={styles.matchingaccess}>
              Duyệt qua mạng lưới rộng lớn các nơi trú ẩn và cứu hộ của chúng
              tôi để tìm thú cưng lý tưởng cho bạn.
            </p>
          </div>
          <div className={styles.findmatching1}>
            <img src={svg2} alt="" />
            <p className={styles.searchmatching}>Sẵn sàng gặp pet</p>
            <p className={styles.matchingaccess}>
              Xem thông tin chi tiết về nơi trú ẩn trực tiếp trên trang hồ sơ
              vật nuôi và nhận gợi ý về những câu hỏi cần hỏi khi bạn đến thăm.
            </p>
          </div>
          <div className={styles.findmatching2}>
            <img src={svg3} alt="" />
            <p className={styles.searchmatching}>Hoàn tất việc nhận nuôi</p>
            <p className={styles.matchingaccess}>
              Hãy chuẩn bị đón thú cưng mới về nhà. Sử dụng danh sách kiểm tra
              nhận nuôi của chúng tôi để biết mẹo chăm sóc thành viên mới trong
              gia đình bạn.
            </p>
          </div>
          <button
            className={styles.ghepdoi}
            onClick={() => navigate("/profilematch")}
          >
            Ghép đôi
          </button>
        </div>
        <div className={styles.formmatching}>
          <img src={img1} alt="" />
        </div>
        <div className={styles.formmatching1}>
          <img src={img2} alt="" />
        </div>
        <h1
          className={styles.titleghepdoi}
          onClick={() => navigate("/profilematch")}
        >
          Ghép Đôi
        </h1>
        <div className={styles.formmatching2}>
          <label htmlFor="">Chủng loài</label>
          <div className={styles.arrow} onClick={toggleDropdownMenu1} />
          <br />
          <input
            type="text"
            placeholder="Chọn chủng loại"
            value={selectedBreed1}
            onClick={toggleDropdownMenu1}
          />
          {dropdownMenu1 && (
            <ul className={styles.dropdownMenu}>
              {["Chó", "Mèo", "Khác"].map((breed) => (
                <li key={breed} onClick={() => handleSelectBreed1(breed)}>
                  {breed}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.formmatching3} onClick={toggleDropdownMenu2}>
          <label htmlFor="">Giới tính</label>
          <div className={styles.arrow} />
          <br />
          <input
            type="text"
            placeholder="Chọn giới tính"
            value={selectedBreed2}
          />
          {dropdownMenu2 && (
            <ul className={styles.dropdownMenu}>
              {["Đực", "Cái"].map((breed) => (
                <li key={breed} onClick={() => handleSelectBreed2(breed)}>
                  {breed}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.container}>
          <p className={styles.title}>Tính cách:</p>
          <div className={styles.radioGrid}>
            <div>
              <input type="radio" id="vui-ve" name="personality" />
              <label htmlFor="vui-ve">Vui vẻ</label>
            </div>
            <div>
              <input type="radio" id="to-mo" name="personality" />
              <label htmlFor="to-mo">Tò Mò</label>
            </div>
            <div>
              <input type="radio" id="nang-dong" name="personality" />
              <label htmlFor="nang-dong">Năng Động</label>
            </div>
            <div>
              <input type="radio" id="tram-tinh" name="personality" />
              <label htmlFor="tram-tinh">Trầm Tính</label>
            </div>
            <div>
              <input type="radio" id="nhut-nhat" name="personality" />
              <label htmlFor="nhut-nhat">Nhút Nhát</label>
            </div>
            <div>
              <input type="radio" id="am-ap" name="personality" />
              <label htmlFor="am-ap">Ấm Áp</label>
            </div>
            <div>
              <input type="radio" id="bao-ve" name="personality" />
              <label htmlFor="bao-ve">Bảo Vệ</label>
            </div>
            <div>
              <input type="radio" id="than-thien" name="personality" />
              <label htmlFor="than-thien">Thân Thiện</label>
            </div>
          </div>
        </div>
        <div className={styles.buttontotal}>
          <button className={styles.buttondelete}>Xóa</button>
          <button
            className={styles.buttonmatching}
            onClick={() => navigate("/profilematch")}
          >
            Ghép đôi
          </button>
        </div>
        <div className={styles.formmatching4}>
          <img src={img3} alt="" />
        </div>
        <div className={styles.adoptablepet}>
          <p>Adoptable Pets</p>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div
                className={`${styles.heartIcon} ${liked ? styles.liked : ""}`}
                onClick={() => setLiked(!liked)}
              >
                <UilHeart size="24" />
              </div>
              <img
                className={styles.cardImage}
                src="https://cdn.eva.vn/upload/3-2022/images/2022-08-26/image7-1661495595-967-width1180height800.jpg"
                alt="Card Image"
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>OREO</h3>
                <p className={styles.cardDescription}>
                  Male • American Staffordshire T…
                </p>
                <p className={styles.location}>Los Angeles, CA</p>
              </div>
            </div>
            <div className={styles.card}>
              <div
                className={`${styles.heartIcon} ${liked1 ? styles.liked : ""}`}
                onClick={() => setLiked1(!liked1)}
              >
                <UilHeart size="24" />
              </div>
              <img
                className={styles.cardImage}
                src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Yen_Bai_-_dogs_-_P1390010.JPG"
                alt="Card Image"
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>JACK SPARROW</h3>
                <p className={styles.cardDescription}>
                  Male • American Staffordshire T…
                </p>
                <p className={styles.location}>Los Angeles, CA</p>
              </div>
            </div>
            <div className={styles.card}>
              <div
                className={`${styles.heartIcon} ${liked2 ? styles.liked : ""}`}
                onClick={() => setLiked2(!liked2)}
              >
                <UilHeart size="24" />
              </div>
              <img
                className={styles.cardImage}
                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/6/30/816260/Cho-1.jpg"
                alt="Card Image"
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>REY</h3>
                <p className={styles.cardDescription}>
                  Female • German Shepherd Dog
                </p>
                <p className={styles.location}>Los Angeles, CA</p>
              </div>
            </div>
            <div className={styles.card}>
              <div
                className={`${styles.heartIcon} ${liked3 ? styles.liked : ""}`}
                onClick={() => setLiked3(!liked3)}
              >
                <UilHeart size="24" />
              </div>
              <img
                className={styles.cardImage}
                src="https://fagopet.vn/storage/v7/ch/v7che47zyux8lz9vxk918t4ok0nn_phoi-giong-cho-phoc-soc.webp"
                alt="Card Image"
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>DJ</h3>
                <p className={styles.cardDescription}>Female • Mixed Breed</p>
                <p className={styles.location}>Los Angeles, CA</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.meetplace}>
          <p className={styles.placeonly}>
            AdoptPet: Không chỉ là một nơi nhận nuôi
          </p>
          <p className={styles.placeonly1}>
            Tại AdoptPet, chúng tôi không chỉ là một dịch vụ nhận nuôi thú cưng
            - chúng tôi là một nhóm những người yêu động vật tận tâm tạo nên
            những mối quan hệ lâu dài. Với nhiều năm kinh nghiệm trong lĩnh vực
            chăm sóc và phúc lợi thú cưng, chúng tôi hiểu được tính cách và nhu
            cầu riêng biệt của từng loài động vật trong sự chăm sóc của chúng
            tôi.
          </p>
          <button className={styles.findus}>
            Tìm hiểu thêm về chúng tôi →
          </button>
        </div>
        <div className={styles.imagefamily}>
          <img src={img4} alt="Image Family" />
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}
