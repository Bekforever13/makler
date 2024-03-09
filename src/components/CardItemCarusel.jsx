import { IoIosArrowForward } from "react-icons/io"; 
import { IoIosArrowBack } from "react-icons/io"; 
import { Carousel, IconButton } from '@material-tailwind/react'
import React from 'react'

const CardItemCarusel = () => {
    return (
        <Carousel
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
            prevArrow={({ handlePrev }) => (
                <IconButton
                    size="sm"
                    onClick={handlePrev}
                    className="!absolute bg-opacity-20 top-2/4 left-4 -translate-y-2/4 text-[20px] rounded-full"
                >

                    <IoIosArrowBack />
                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton
                    size="sm"
                    onClick={handleNext}
                    className="!absolute bg-opacity-20 top-2/4 !right-4 -translate-y-2/4 text-[20px] rounded-full"
                >
                    <IoIosArrowForward />
                </IconButton>
            )}
        >
            <img
                src="https://cdn-p.cian.site/images/kvartira-moskva-staropetrovskiy-proezd-2044151766-1.jpg"
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <img
                src="https://cdn-p.cian.site/images/kvartira-moskva-staropetrovskiy-proezd-2044151765-1.jpg"
                alt="image 2"
                className="h-full w-full object-cover"
            />
            <img
                src="https://cdn-p.cian.site/images/kvartira-moskva-staropetrovskiy-proezd-2044151781-1.jpg"
                alt="image 3"
                className="h-full w-full object-cover"
            />
            <img
                src="https://cdn-p.cian.site/images/kvartira-moskva-staropetrovskiy-proezd-2044144169-1.jpg"
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <img
                src="https://cdn-p.cian.site/images/kvartira-moskva-staropetrovskiy-proezd-2044151778-1.jpg"
                alt="image 2"
                className="h-full w-full object-cover"
            />
        </Carousel>
    )
}

export default CardItemCarusel
