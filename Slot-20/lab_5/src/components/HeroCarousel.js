import React from "react";
import { Carousel, Form } from "react-bootstrap";

export default function HeroCarousel({ autoplay = true }) {
    const [auto, setAuto] = React.useState(autoplay);
    const banners = ["/images/banner1.jpg", "/images/banner2.jpg", "/images/banner3.jpg"];
    return (
        <>
            <div style={{ borderRadius: 28, overflow: "hidden", boxShadow: "0 8px 30px #0001", maxWidth: 1200, margin: "0 auto 40px" }}>
                <Carousel controls indicators interval={auto ? 3000 : null} pause={auto ? "hover" : false}>
                    {banners.map((src, i) => (
                        <Carousel.Item key={i} style={{ height: 370, background: "#f8f8f5" }}>
                            <img src={src} alt={`Banner ${i + 1}`} className="d-block w-100 h-100" style={{ objectFit: "cover" }} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <div className="d-flex justify-content-end" style={{ maxWidth: 1200, margin: "-20px auto 10px" }}>
                <Form.Check type="switch" id="autoplay" label="Autoplay" checked={auto} onChange={() => setAuto(a => !a)} />
            </div>
        </>
    );
}
