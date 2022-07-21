import { tagsName } from '~/functions/category';
import styled from 'styled-components';
import { Grid } from '@nextui-org/react';
import ListProducts from './ListProducts';
import { TitleList } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '~/store';
import { memo } from 'react';

const CategoryProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.allProducts);

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

    const goToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className="wide">
            <Wrapper>
                {tagsName.map((item, i) => (
                    <div className={`category category-${i}`} key={i}>
                        <TitleList
                            title={item.name}
                            onClick={() => {
                                navigate('/products');
                                handleFilterByCategory(item.name);
                                goToTop();
                            }}
                        />
                        <Grid.Container gap={2} justify="center" className="container">
                            <Grid xs={12} md={2.5} className="list-category">
                                <ul className="list">
                                    {item.children.map((child, i) => (
                                        <li
                                            className="item"
                                            key={i}
                                            onClick={() => {
                                                navigate('/products');
                                                handleFilterByName(child);
                                                goToTop();
                                            }}
                                        >
                                            {child}
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                            <Grid xs={12} md={9.5}>
                                <div className="slide-products">
                                    <ListProducts nameList={item.name} row={2} loop />
                                </div>
                            </Grid>
                        </Grid.Container>
                    </div>
                ))}
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.div`
    .category-0 {
        display: none;
    }
    .container {
        .list-category {
            background-color: #f5f5f5;
            padding: 10px;

            .list {
                .item {
                    font-size: 1.8rem;
                    background-color: var(--primary);
                    color: var(--white);
                    margin-bottom: 10px;
                    padding: 5px;
                    position: relative;
                    cursor: pointer;

                    &::before {
                        content: '';
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 20px 14px 20px 0;
                        border-color: transparent var(--primary) transparent transparent;
                        position: absolute;
                        left: -14px;
                        top: 0px;
                    }
                }
            }
        }

        .swiper {
            padding: 0;
        }
    }

    .slide-products {
        width: 100%;
    }
`;

export default memo(CategoryProducts);
