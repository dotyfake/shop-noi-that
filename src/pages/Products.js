import styled from 'styled-components';
import { Filter, Product, EmptyProduct } from '~/components';
import { Grid, Pagination } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Home } from '~/pages';
import { useEffect, useState } from 'react';
import { actions } from '~/store';

const Products = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.products);
    const { products, titleProducts, allProducts } = state;
    const [listProducts, setListProducts] = useState([]);

    let newProducts = [];
    const cloneProducts = [...products];
    while (cloneProducts.length) {
        const spliceProducts = [cloneProducts.splice(0, 24)];
        newProducts.push(spliceProducts);
    }

    useEffect(() => {
        if (newProducts.length > 0) {
            setListProducts(newProducts[0][0]);
        }
    }, [products]);

    return (
        <div className="wide">
            <Wrapper>
                <div className="link-tree">
                    <Link to="/" element={<Home />}>
                        Trang chủ
                    </Link>
                    / Sản phẩm
                </div>
                <Filter />
                <h3 className="title">
                    {titleProducts} có {products.length} sản phẩm.
                </h3>
                <Grid.Container gap={2} justify="center">
                    {listProducts.map((product, i) => (
                        <Grid xs={6} sm={3} key={i}>
                            <div className="banner-item">
                                <Product product={product} />
                            </div>
                        </Grid>
                    ))}
                </Grid.Container>
                <div className="pagination">
                    <Pagination
                        size={'xl'}
                        total={newProducts.length}
                        page={1}
                        onChange={(page) => {
                            setListProducts(newProducts[page - 1][0]);
                            window.scrollTo(0, 155);
                        }}
                    />
                </div>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.div`
    margin-top: var(--margin-top);
    min-height: 100vh;

    .title {
        text-align: center;
        color: var(--second);
    }

    .link-tree {
        margin-bottom: 14px;
        a {
            color: var(--primary);
            margin-right: 5px;
            font-weight: 600;
        }
    }

    .pagination {
        display: flex;
        justify-content: center;
        margin: 20px;
    }
`;

export default Products;
