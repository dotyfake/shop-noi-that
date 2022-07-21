import styled from 'styled-components';
import images from '~/assets/images';
import { Grid } from '@nextui-org/react';
import { FaAward, FaStore, FaTruck } from 'react-icons/fa';

const bannerList = [
    { title: 'Chất lượng cao', desc: 'Quy trình sản xuất đạt tiêu chuẩn, sản phẩm chất lượng cao!', icon: <FaAward /> },
    { title: 'Miễn phí giao hàng', desc: 'Áp dụng cho khách hàng trong tỉnh.', icon: <FaTruck /> },
    { title: 'Mua hàng 24/7', desc: 'Mở cửa tất cả các ngày trong tuần!', icon: <FaStore /> },
];
const Banner = () => {
    return (
        <Wrapper>
            <div
                className="bg"
                style={{
                    background: `linear-gradient(rgba(63,63,63,0.5),rgba(63,63,63,0.8)),url(${images.s2}) no-repeat center/ cover`,
                }}
            >
                <Grid.Container gap={2} justify="center">
                    {bannerList.map((item, i) => (
                        <Grid xs={12} sm={4} key={i}>
                            <div className="banner-item">
                                <div>
                                    {item.icon}
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid.Container>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    margin: 40px 0;

    .banner-item {
        width: 300px;
        margin: 0 auto;
        text-align: center;
        color: var(--white);
        height: 170px;
        position: relative;

        & > div {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        svg {
            font-size: 4rem;
        }

        h3 {
            margin-bottom: 5px;
        }
        p {
            margin: 0;
        }
    }
`;

export default Banner;
