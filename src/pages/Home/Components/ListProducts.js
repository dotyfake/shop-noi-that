import { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid, Autoplay } from 'swiper';
import 'swiper/scss';
import 'swiper/css/grid';
import 'swiper/scss/navigation';
import 'swiper/scss/navigation';
import { Product, ListEmpty } from '~/components';
import { useViewport } from '~/hooks/hooks';
import { useSelector } from 'react-redux';

const ListProducts = ({ typeList, nameList, row, autoplay, delay, loop, navigate, sale }) => {
    const [products, setProducts] = useState([]);
    const viewPort = useViewport();
    const isTablet = viewPort.width <= 900;

    const allProducts = useSelector((state) => state.products.allProducts);

    const filter = (type) => {
        const filterProducts = allProducts.filter((item, i) => item.status.includes(type));
        setProducts(filterProducts);
    };

    const filterType = (type) => {
        const filterProducts = allProducts.filter((item, i) => item.typeCategory === type);
        setProducts(filterProducts);
    };

    const filterSale = () => {
        const filterProducts = allProducts.filter((item, i) => item.sale > 0);
        setProducts(filterProducts);
    };

    useEffect(() => {
        if (typeList) {
            filter(typeList);
        } else if (nameList) {
            filterType(nameList);
        } else if (sale) {
            filterSale();
        }
    }, [allProducts]);
    return (
        <div className={nameList ? 'no-wide' : 'wide'}>
            <Wrapper>
                {allProducts.length > 0 ? (
                    <Swiper
                        className="wrapper"
                        navigation={nameList ? false : true}
                        loop={loop}
                        autoplay={
                            autoplay
                                ? {
                                      delay: delay,
                                      disableOnInteraction: false,
                                  }
                                : {}
                        }
                        // style={{ width: isMobile && '270px' }}
                        grid={{
                            rows: row,
                            fill: 'row',
                        }}
                        breakpoints={{
                            100: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            740: {
                                slidesPerView: nameList ? 2 : 3,
                                spaceBetween: nameList ? 10 : 20,
                            },
                            1100: {
                                slidesPerView: nameList ? 3 : 4,
                                spaceBetween: nameList ? 20 : 42,
                            },
                        }}
                        modules={[Navigation, Grid, Autoplay]}
                    >
                        {products.length > 0 &&
                            products.splice(0, 16).map((product, i) => (
                                <SwiperSlide key={i}>
                                    <Product product={product} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                ) : (
                    <ListEmpty />
                )}
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.section`
    .wrapper[div] {
        padding: 0 30;
    }

    .swiper {
        cursor: grab;
        .swiper-button-next,
        .swiper-button-prev {
            visibility: hidden;
        }

        &:hover .swiper-button-next {
            visibility: visible;
        }
        &:hover .swiper-button-prev {
            visibility: visible;
        }
    }

    .no-wide {
    }
`;

export default memo(ListProducts);
