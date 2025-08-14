import React from "react";
import { Container, Carousel } from "react-bootstrap";
import "./CarouselHero.css";

class CarouselHero extends React.PureComponent {
  render() {
    return (
      <Container className="mb-4">
        <Carousel
          className="hero-carousel shadow-sm rounded-3"
          interval={6000}
          indicators={false}
          fade
        >
          <Carousel.Item className="hero-slide">
            <img
              className="hero-img d-block w-100"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
              alt="slide1"
            />
            <Carousel.Caption className="hero-caption">
              <h3>Món ngon mỗi ngày</h3>
              <p>Khám phá công thức đa dạng từ Á đến Âu.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item className="hero-slide">
            <img
              className="hero-img d-block w-100"
              src="https://bizweb.dktcdn.net/100/339/225/files/thuc-an-nhanh.jpg?v=1627638748869"
              alt="slide2"
              loading="lazy"
            />
            <Carousel.Caption className="hero-caption">
              <h3>Chuẩn bị nhanh gọn</h3>
              <p>Chọn theo thời gian chuẩn bị & nấu nướng.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item className="hero-slide">
            <img
              className="hero-img d-block w-100"
              src="https://www.trungnguyenhealing.com/resources/uploads/Cam%20nang/10%20n%C6%B0%E1%BB%9Bc%20c%C3%B3%20%C4%91%E1%BB%93%20%C4%83n%20ngon%20nh%E1%BA%A5t/6_Food_panda.jpg"
              alt="slide3"
              loading="lazy"
            />
            <Carousel.Caption className="hero-caption">
              <h3>Lưu công thức yêu thích</h3>
              <p>Nhấn ♡ để thêm vào danh sách Favourite.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}

export default CarouselHero;
