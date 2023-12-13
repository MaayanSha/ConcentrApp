import slide1 from '../images/slides/1.png';
import slide2 from '../images/slides/2.png';
import slide3 from '../images/slides/3.png';
import slide4 from '../images/slides/4.png';
import slide5 from '../images/slides/5.png';
import './about.css'
import {useEffect, useState} from "react";

function Slideshow() {
    const slides = [slide1, slide2, slide3, slide4, slide5];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
        }, 5000);
        return () => clearInterval(interval);
    })
    return (
        <div className="slideshow">
            <div className="slideshowSlider" style={{ transform: `translate3d(${-currentSlide * 100}%, 0, 0)` }}>
                    {slides.map((slide, index) => (
                        <div key={index} className="slide">
                            <img src={slide} alt="img"/>
                        </div>
                    ))}
        </div>
            <div className="slideshowDots">
                {slides.map((_, idx) => (
                    <div key={idx} className={`slideshowDot${currentSlide === idx ? " active" : ""}`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
export default Slideshow;