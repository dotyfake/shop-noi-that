import { useEffect } from 'react';
import Header from '~/layout/Header/Header';
import Container from '~/layout/Container/Container';
import Footer from '~/layout/Footer/Footer';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import styled from 'styled-components';
import { useViewport } from '~/hooks/hooks';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { actions } from '~/store';
import { convertData } from '~/functions/functions';
import { Helmet } from 'react-helmet';
import images from '~/assets/images';

function App() {
    const viewPort = useViewport();
    const isTablet = viewPort.width <= 900;
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/.netlify/functions/products').then((res) => {
            const data = convertData(res.data);
            dispatch(actions.setAllProducts(data));
        });
    }, []);

    return (
        <WrapperApp className={isTablet ? 'tablet' : 'app'}>
            <Helmet>
                <meta property="og:image" content={`${images.about}`} />
            </Helmet>
            <Header />
            <Container />
            <Footer />
            <MessengerCustomerChat pageId="116667839130696" appId="768469081247705" />
        </WrapperApp>
    );
}

const WrapperApp = styled.div`
    overflow-x: hidden;
`;

export default App;
