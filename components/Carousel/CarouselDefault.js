import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const CarouselDefault = ({ imageList }) => {
    return (
        <div className="image__carousel">
            <Carousel>
                {
                    imageList?.map((img, index) => {
                        return (
                            <div key={index}>
                                <img src={img} alt="image1" />
                                <p className="legend">Image 1</p>
                            </div>
                        );
                    })
                }
            </Carousel>
            <style jsx>{`
                .image__carousel {
                    max-width: 60%;
                    /* max-height: 60%; */
                }
                @media screen and (max-width: 700px) {
                    .image__carousel {
                        max-width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}


export default CarouselDefault;