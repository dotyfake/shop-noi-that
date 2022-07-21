import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { actions } from '~/store';
import { tagsName } from '~/functions/category';

const Filter = () => {
    const [selected, setSelected] = useState('');
    const dispatch = useDispatch();
    const state = useSelector((state) => state.products);
    const { allProducts, keyProducts, products } = state;
    const currentIndex = tagsName.findIndex((item) => item.name === keyProducts);

    let newProducts = [];
    const cloneProducts = [...products];
    while (cloneProducts.length) {
        const spliceProducts = [cloneProducts.splice(0, 18)];
        newProducts.push(spliceProducts);
    }

    const handleFilterByName = (name) => {
        const results = allProducts.filter((product) => product.type === name);
        dispatch(actions.setProducts(results));
        dispatch(actions.setTitleProducts(name));
    };

    const handleFilterByCategory = (name) => {
        const results = allProducts.filter((product) => product.typeCategory === name);
        dispatch(actions.setProducts(results));
        dispatch(actions.setTitleProducts(name));
    };

    return (
        <div className="wide">
            <Wrapper>
                <Swiper
                    className="slides"
                    modules={[Navigation, Autoplay]}
                    initialSlide={1}
                    breakpoints={{
                        100: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        650: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1100: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {tagsName.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className={slide.name === keyProducts ? 'slide active' : 'slide'}
                                onClick={() => {
                                    dispatch(actions.setKeyProducts(slide.name));
                                    handleFilterByCategory(slide.name);

                                    if (slide.name === 'Tất cả sản phẩm') {
                                        dispatch(actions.setProducts(allProducts));
                                        dispatch(actions.setTitleProducts('Tất cả sản phẩm'));
                                    }
                                }}
                            >
                                <span>{slide.name}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {!(keyProducts === 'Tất cả sản phẩm') && (
                    <div className="select">
                        <select
                            className="select-box"
                            value={selected}
                            onChange={(e) => {
                                setSelected(e.target.value);
                                handleFilterByName(e.target.value);
                            }}
                        >
                            {tagsName[currentIndex].children.map((item, i) => (
                                <option value={item} key={i} className="select-item">
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.div`
    .slide {
        height: 50px;
        background-color: var(--primary);
        color: var(--white);
        font-size: 1.8rem;
        transform: skew(-10deg);
        box-sizing: border-box;
        text-align: center;
        position: relative;
        cursor: pointer;
        span {
            display: block;
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        &.active {
            background-color: var(--highlight);
        }
    }
    .select {
        display: flex;
        justify-content: flex-end;
        margin-top: 14px;
        .select-box {
            background-color: var(--second);
            border: none;
            outline: none;
            padding: 5px;
            font-size: 1.6rem;
            font-weight: 500;
            color: var(--white);
            text-align: center;
            .select-item {
            }
        }
    }
`;

export default memo(Filter);
