import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Home, Products } from '~/pages';
import { useSelector } from 'react-redux';
import { Grid, Table, Modal, Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import axios from 'axios';
import { convertData } from '~/functions/functions';
import { Product, CommentFB } from '~/components';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import images from '~/assets/images';
import { Helmet } from 'react-helmet';

const ProductPage = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState();
    const [related, setRelated] = useState([]);
    const currentProduct = useSelector((state) => state.products.product);
    const [showImage, setShowImage] = useState('');
    const showModal = (url) => setShowImage(url);
    const closeModalImage = () => {
        setShowImage('');
    };

    useEffect(() => {
        axios
            .post('/.netlify/functions/relatedProducts', {
                productsKey: currentProduct.type,
            })
            .then((res) => {
                const data = convertData(res.data.results);
                setRelated(data);
            });
    }, [currentProduct]);
    return (
        <div className="wide">
            <Helmet>
                <title>{currentProduct.name} Nội thất Sơn La</title>
                <meta name="author" content="Doty" />
                <meta property="og:image" content="https://telegra.ph/file/f015e64832b210727ef4f.png" />
                <meta name="keywords" content="nội thất, nội thất sơn la, Thi công Nội Thất, bọc lại bàn ghế Sofa" />
                <meta
                    property="og:description"
                    content="Nội thất Sơn La - Xưởng Sản xuất - Thi công Nội Thất Gỗ Công Nghiệp - Đóng mới bọc lại bàn ghế Sofa - Theo yêu cầu. Đảm bảo giá cả hợp lý - bảo hành chất lượng tuyệt đối."
                />
                <meta name="description" content={currentProduct.desc} />
            </Helmet>
            <Wrapper>
                <div className="link-tree">
                    <Link to="/" element={<Home />}>
                        Trang chủ
                    </Link>
                    /
                    <Link to="/products" element={<Products />}>
                        Sản phẩm
                    </Link>
                    / {currentProduct.name}
                </div>
                <main>
                    <Grid.Container className="product">
                        <Grid sm={6} md={6} xs={12} className="gallery">
                            <Swiper
                                loop
                                navigation
                                modules={[Navigation, Thumbs]}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                className="slider-images"
                            >
                                {currentProduct.image.map((item, i) => (
                                    <SwiperSlide key={i} onClick={() => showModal(item)}>
                                        <img src={item} alt="images" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                modules={[Navigation, Thumbs]}
                                breakpoints={{
                                    100: {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                    },
                                    1100: {
                                        slidesPerView: 4,
                                        spaceBetween: 14,
                                    },
                                }}
                                className="slider-thumbs"
                            >
                                {currentProduct.image.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <img src={item} alt="images" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Grid>
                        <Grid sm={6} md={6} xs={12} className="info">
                            <h1>{currentProduct.name}</h1>
                            <p>{currentProduct.desc}</p>
                            <p>
                                {currentProduct.price > 0 && (
                                    <span style={{ fontWeight: 600 }}>
                                        Giá: {currentProduct.newPrice.toLocaleString()} vnđ
                                    </span>
                                )}
                                {currentProduct.sale > 0 && (
                                    <span
                                        style={{
                                            textDecorationLine: 'line-through',
                                            fontSize: '1.4rem',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        {currentProduct.price.toLocaleString()} vnđ{' '}
                                    </span>
                                )}
                            </p>
                            {/* <ul>
                                <li>- Đảm bảo giá cả hợp lý.</li>
                                <li>- Bảo hành chất lượng tuyệt đối.</li>
                            </ul> */}
                            <p>Liên hệ: 039.928.8889</p>
                            <p>Cửa hàng mở cửa 24/7</p>
                            <Table
                                aria-label="Example static collection table"
                                css={{
                                    height: 'auto',
                                    minWidth: '100%',
                                }}
                                selectionMode="single"
                            >
                                <Table.Header>
                                    <Table.Column>TÊN</Table.Column>
                                    <Table.Column>MÔ TẢ</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {currentProduct.name !== 0 && (
                                        <Table.Row key={1}>
                                            <Table.Cell>Tên sản phẩm</Table.Cell>
                                            <Table.Cell>{currentProduct.name}</Table.Cell>
                                        </Table.Row>
                                    )}
                                    {currentProduct.type !== 0 && (
                                        <Table.Row key={2}>
                                            <Table.Cell>Loại sản phẩm</Table.Cell>
                                            <Table.Cell>{currentProduct.type}</Table.Cell>
                                        </Table.Row>
                                    )}
                                    {currentProduct.material !== 0 && (
                                        <Table.Row key={3}>
                                            <Table.Cell>Chất liệu</Table.Cell>
                                            <Table.Cell>{currentProduct.material}</Table.Cell>
                                        </Table.Row>
                                    )}
                                    {currentProduct.insurance !== 0 && (
                                        <Table.Row key={4}>
                                            <Table.Cell>Bảo hành</Table.Cell>
                                            <Table.Cell>{currentProduct.insurance}</Table.Cell>
                                        </Table.Row>
                                    )}
                                    {currentProduct.size !== 0 && (
                                        <Table.Row key={5}>
                                            <Table.Cell>Kích thước</Table.Cell>
                                            <Table.Cell>{currentProduct.size}</Table.Cell>
                                        </Table.Row>
                                    )}
                                    {currentProduct.color !== 0 && (
                                        <Table.Row key={6}>
                                            <Table.Cell>Màu sắc</Table.Cell>
                                            <Table.Cell>{currentProduct.color}</Table.Cell>
                                        </Table.Row>
                                    )}
                                    {currentProduct.origin !== 0 && (
                                        <Table.Row key={7}>
                                            <Table.Cell>Xuất sứ</Table.Cell>
                                            <Table.Cell>{currentProduct.origin}</Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </Grid>
                    </Grid.Container>
                    <h2>Sản phẩm cùng loại</h2>
                    <div className="related-products">
                        <Swiper
                            navigation
                            loop
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
                                    slidesPerView: 3,
                                    spaceBetween: 42,
                                },
                            }}
                            modules={[Navigation]}
                        >
                            {related.length > 0 &&
                                related.map((product, i) => (
                                    <SwiperSlide key={i}>
                                        <Product product={product} />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </main>
                <CommentFB />
            </Wrapper>
            <Modal noPadding open={showImage} onClose={closeModalImage} className="modal-image" width="900px">
                <Modal.Body>
                    <Image showSkeleton src={showImage} width={'100%'} height={'100%'} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

const Wrapper = styled.div`
    margin-top: var(--margin-top);
    min-height: 80vh;

    h2 {
        color: var(--second);
    }

    .link-tree {
        a {
            font-weight: 500;
            margin: 0 10px;
            transition: all 0.3s;

            &:hover {
                color: var(--primary);
            }

            &:first-child {
                color: var(--primary);
                font-weight: 600;
            }
        }
    }

    .product {
        margin: 10px 0;
    }
    .gallery {
        position: relative;
        flex-direction: column;
        justify-content: flex-start;

        .slider-images {
            width: 100%;
            height: var(--slider-image-height);
            padding: 0;

            .swiper-slide {
                overflow: hidden;
                position: relative;
                cursor: pointer;
                img {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .slider-thumbs {
            width: 100%;
            height: 120px;
            padding: 0;
            border: 10px solid var(--white);

            .swiper-slide {
                cursor: pointer;
            }
            img {
                height: 100%;
                width: 100%;
            }
        }
    }

    .info {
        padding: 0 20px;
        flex-direction: column;
        h1 {
            text-align: center;
            margin-top: 0;
        }
    }

    .modal-image {
    }
`;

export default ProductPage;
