import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid, Autoplay } from 'swiper';
import 'swiper/scss';
import 'swiper/css/grid';
import 'swiper/scss/navigation';
import 'swiper/scss/navigation';
import { useSelector } from 'react-redux/es/exports';
import { Product } from '~/components';
import { convertData } from '~/functions/functions';

const ListFilter = () => {
    const listProducts = useSelector((state) => state.products.products);
    const listConvert = convertData(listProducts).slice(0, 20);
    return (
        <div className="wide">
            <Wrapper>
                <Swiper
                    className="wrapper"
                    loop
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    // style={{ width: isMobile && '270px' }}
                    grid={{
                        rows: 2,
                        fill: 'row',
                    }}
                    breakpoints={{
                        100: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        740: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1100: {
                            slidesPerView: 4,
                            spaceBetween: 42,
                        },
                    }}
                    modules={[Navigation, Grid, Autoplay]}
                >
                    {listConvert.length > 0 &&
                        listConvert.map((product, i) => (
                            <SwiperSlide key={i}>
                                <Product product={product} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.section`
    .swiper {
        padding: var(--padding-item-bottom);
    }
`;

export default ListFilter;
