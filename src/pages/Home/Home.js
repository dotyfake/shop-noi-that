import styled from 'styled-components';
import { Slider, Banner, ListProducts, CategoryProducts } from './Components';
import { TitleList } from '~/components';

const Home = () => {
    return (
        <Wrapper>
            <Slider />
            <TitleList title="Sản phẩm bán chạy" />
            <ListProducts typeList="Hot" autoplay delay={5000} loop />
            <TitleList title="Sản phẩm mới" />
            <ListProducts typeList="New" autoplay delay={8000} row={2} />
            <TitleList title="Đang khuyến mãi" />
            <ListProducts autoplay delay={7000} loop sale />
            <Banner />
            <CategoryProducts />
        </Wrapper>
    );
};

const Wrapper = styled.main`
    margin-top: var(--margin-top);
`;

export default Home;
