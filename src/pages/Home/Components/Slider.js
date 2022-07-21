import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useViewport, useDebounce } from '~/hooks/hooks';

import 'swiper/css';
import 'swiper/css/pagination';
import images from '~/assets/images';

const sliders = [
    {
        title: 'Uy tín - Chất lượng - Tận tâm',
        desc: 'Uy tín - Chất lượng - Tận tâm là tiêu chí hàng đầu chúng tôi đặt ra để phát triển bền vững và là nơi xứng đáng để quý khách gửi gắm niềm tin!',
        url: images.s1,
    },
    {
        title: 'Phong phú sản phẩm mẫu mã',
        desc: 'Đa dạng các sản phẩm nội thất, phong phú về mẫu mã, thiết kế hiện đại, mang đến sự lựa chọn tốt nhất, phù hợp nhất cho ngôi nhà của bạn!',
        url: images.s3,
    },
    {
        title: 'Gia công tại xưởng',
        desc: 'Quý khách có thể lựa chọn từ mẫu mã, kích thước, chất liệu, màu sắc cho nội thất. Đặc biệt là chế độ bảo hành miễn phí tại Nội thất Sơn La',
        url: images.s2,
    },
];
const Slider = () => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 650;
    return (
        <Wrapper>
            <div className="slider">
                <Swiper
                    style={{ padding: 0 }}
                    className="slides"
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false,
                    }}
                >
                    {sliders.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div className="slide" style={{ background: `url(${slide.url})  no-repeat center/ cover` }}>
                                <div className="content">
                                    <h2 style={{ marginBottom: isMobile ? 0 : '10px' }}>{slide.title}</h2>
                                    <p
                                        style={{
                                            padding: isMobile ? '0 10px' : '0 60px',
                                        }}
                                    >
                                        {slide.desc}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .slides {
        width: 100vw;
        position: relative;

        .slide {
            height: var(--slider-height);
            cursor: grab;
        }

        .swiper-pagination-bullet {
            width: 50px;
            height: 12px;
            border-radius: 1px;
            background-color: var(--primary);
            transform: skew(-45deg);
        }
    }

    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        color: var(--primary);
        transform: translate(-50%, -50%) skew(-5deg);
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            text-transform: uppercase;
            font-size: 2.5rem;
            padding: 0 10px;
            text-align: center;
        }

        p {
            color: var(--black);
            font-size: 1.6rem;
            padding: 0 10px;
            text-align: center;
        }
    }
`;

export default Slider;
