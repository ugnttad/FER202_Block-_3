import { Carousel } from 'react-bootstrap'

export default function HeroCarousel() {
    const slides = [
        { src: '/images/banner1.jpg', title: 'Guardian Of The Galaxy', caption: 'Epic space battles across the galaxy.' },
        { src: '/images/banner2.jpg', title: 'Time Traveler', caption: 'Bend time — at a price.' },
        { src: '/images/banner3.jpg', title: 'Hidden Truth', caption: 'A conspiracy waiting to be uncovered.' },
    ]

    return (
        <Carousel className="mb-4" pause="hover">
            {slides.map((s, i) => (
                <Carousel.Item key={i}>
                    <img className="d-block w-100 hero-img" src={s.src} alt={s.title} />
                    <Carousel.Caption className="bg-dark bg-opacity-50 rounded-3 p-2">
                        <h5 className="mb-1">{s.title}</h5>
                        <p className="mb-0">{s.caption}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}