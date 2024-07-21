import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NotificationTable from "../../components/Tables/NotificationTable";
import styles from "./styles.module.scss";

const Home = () => {
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
      const slides = document.getElementsByClassName("mySlides");
      if (slides.length === 0) {
        setTimeout(showSlides, 100); // Thử lại sau 100ms nếu không tìm thấy slides
        return;
      }

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 3000); // Đổi 3000 thành thời gian chuyển đổi ảnh mong muốn (ms)
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className="slideshow-container">
        <div className="mySlides fadess">
          <img
            src="https://portal.ptit.edu.vn/wp-content/uploads/2024/03/z5221772708690_1b3af49441c33793124ff602190b7034.jpg"
            style={{ width: '100%' }}
            alt=""
          />
        </div>
        <div className="mySlides fadess">
          <img
            src="https://portal.ptit.edu.vn/wp-content/uploads/2023/09/z4727356595434_0910ce05e1f4be61c4c50282f09203ff.jpg"
            style={{ width: '100%' }}
            alt=""
          />
        </div>
        <div className="mySlides fadess">
          <img
            src="https://portal.ptit.edu.vn/wp-content/uploads/2024/04/4f34714a23078d59d416-1024x432.jpg"
            style={{ width: '100%' }}
            alt=""
          />
        </div>
        <div className="mySlides fadess">
          <img
            src="https://portal.ptit.edu.vn/wp-content/uploads/2023/09/z4727356595434_0910ce05e1f4be61c4c50282f09203ff.jpg"
            style={{ width: '100%' }}
            alt=""
          />
        </div>
      </div>
      <div className={styles.head}>
        <h1>Thông báo từ phòng giáo vụ</h1>
      </div>
      <NotificationTable notifications={notifications} />
    </div>
  );
};

export default Home;
