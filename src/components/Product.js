import React from 'react';
import { Card, Col, Row, Text } from '@nextui-org/react';
import styled from 'styled-components';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { actions } from '~/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useViewport } from '~/hooks/hooks';
import Immix from 'react-imgix';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const viewPort = useViewport();
    const isTablet = viewPort.width <= 900;
    const goToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <LazyLoadComponent useIntersectionObserver threshold={200}>
            <Wrapper>
                <div
                    onClick={() => {
                        dispatch(actions.setProduct(product));
                        navigate('/productPage');
                        localStorage.setItem('product', JSON.stringify(product));
                        goToTop();
                    }}
                    className="product"
                >
                    {product.sale > 0 && <span class="sale">{`-${product.sale}%`}</span>}

                    <Card
                        css={{
                            w: '100%',
                            h: 'var(--product-height)',
                            borderRadius: 0,
                        }}
                    >
                        {isTablet && <Card.Header css={{ textAlign: 'center' }}>{product.name}</Card.Header>}
                        <Card.Body css={{ p: 0 }} className="product-body">
                            <Card.Image
                                className="product-img"
                                src={product.image[0]}
                                showSkeleton
                                width="100%"
                                height="80%"
                                objectFit="cover"
                                alt={`Nội thất Sơn La, ${product.name}`}
                            />
                        </Card.Body>
                        <Card.Footer
                            className="product-footer"
                            isBlurred
                            css={{
                                position: 'absolute',
                                bgBlur: '#ffffff66',
                                borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                                bottom: 0,
                                zIndex: 1,
                                height: '22%',
                                p: 0,
                            }}
                        >
                            <Row css={{ textAlign: 'center', h: '100%' }}>
                                {product.price === 0 && (
                                    <Col css={{ margin: 'auto 0' }}>
                                        <Text color="var(--black)" size={15}>
                                            Liên hệ
                                        </Text>
                                        <Text color="var(--primary)" size={15} css={{ fontWeight: 600 }}>
                                            039.928.8889
                                        </Text>
                                    </Col>
                                )}
                                {product.price > 0 && (
                                    <Col css={{ margin: 'auto 0' }}>
                                        {product.sale > 0 && (
                                            <Text
                                                color="var(--black)"
                                                size={14}
                                                css={{ textDecorationLine: 'line-through' }}
                                            >
                                                {product.price.toLocaleString()} vnđ
                                            </Text>
                                        )}
                                        <Text color="var(--primary)" size={16} css={{ fontWeight: 600 }}>
                                            {product.newPrice.toLocaleString()} vnđ
                                        </Text>
                                    </Col>
                                )}
                                {!isTablet && (
                                    <Col css={{ margin: 'auto 0', p: '0 5px' }}>
                                        <Text color="var(--black)" size={16} css={{ height: '100%', fontWeight: 600 }}>
                                            {product.name}
                                        </Text>
                                    </Col>
                                )}
                            </Row>
                        </Card.Footer>
                    </Card>
                </div>
            </Wrapper>
        </LazyLoadComponent>
    );
};

const Wrapper = styled.div`
    box-shadow: 0px 0px 8px rgba(2px, 0, 0, 0.4);
    height: 95%;
    cursor: pointer;
    .product-body {
        overflow: hidden;
    }

    .product-img {
        transition: all 0.5s;
    }
    &:hover .product-img {
        transform: scale(1.07);
        filter: brightness(0.85);
    }
    &:hover .product-footer {
        transform: scale(1.02);
        filter: brightness(1.02);
    }

    .product {
        position: relative;
    }

    .sale {
        position: absolute;
        top: 10px;
        right: 7px;
        display: inline-block;
        background: #ef5350;
        color: white;
        height: 3rem;
        width: 3rem;
        text-align: center;
        vertical-align: middle;
        font-size: 1.2rem;
        line-height: 3rem;
        z-index: 10;
        animation: beat 1s ease infinite alternate;
        &:before,
        &:after {
            content: '';
            position: absolute;
            background: inherit;
            height: inherit;
            width: inherit;
            top: 0;
            left: 0;
            z-index: -1;
            transform: rotate(30deg);
        }
        &:after {
            transform: rotate(60deg);
        }
    }

    @keyframes beat {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.1);
        }
    }

    @media (max-width: 1280px) {
        .wide {
            width: 92vw;
        }
        .sale {
            top: 38px;
        }
    }
`;
export default Product;
