import styled from 'styled-components';
import { Grid } from '@nextui-org/react';
import { FaFacebook, FaRegGem, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import images from '~/assets/images';
const Footer = () => {
    return (
        <div className="wide">
            <Wrapper>
                <Grid.Container gap={0} justify="center">
                    <Grid xs={12} sm={4} className="brand item">
                        <img src={images.logo} alt="" />
                        <p>
                            Xưởng Nội thất Gỗ Công Nghiệp • Đóng mới bọc lại bàn ghế Sofa • Theo yêu cầu. Đảm bảo giá cả
                            hợp lý - bảo hành chất lượng tuyệt đối.
                        </p>
                        <a href="https://fb.com/noithatsonla">
                            {' '}
                            <FaFacebook /> fb.com/noithatsonla
                        </a>
                        <a href="https://noithatsonla.com/">
                            {' '}
                            <FaRegGem /> noithatsonla.com{' '}
                        </a>
                    </Grid>
                    <Grid xs={12} sm={4} className="about item">
                        <h3>Liên hệ</h3>
                        <p>
                            <FaMapMarkerAlt />{' '}
                            <span>Số 281, Đường Lê Duẩn, Phường Chiềng Sinh, TP.Sơn La, Tỉnh Sơn La</span>
                        </p>
                        <p>
                            <FaPhoneAlt /> <span>039 928 8889</span>
                        </p>
                        <p>
                            <AiOutlineMail /> <span>noithatsonla281@gmail.com</span>
                        </p>
                        <iframe
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d451.4474720889688!2d103.95363735334178!3d21.294923842782946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd8d46d493f620ed!2zTuG7mWkgVGjhuqV0IFPGoW4gTGE!5e0!3m2!1svi!2s!4v1657087847878!5m2!1svi!2s"
                            width="300"
                            height="110"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Grid>
                    <Grid xs={12} sm={4} className="fb item">
                        <iframe
                            title="page"
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnoithatsonla%2F&tabs&width=300&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=768469081247705"
                            width="300"
                            height="120"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                        <iframe
                            className="like"
                            title="like"
                            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fnoithatsonla%2F&width=450&layout=standard&action=like&size=large&share=true&height=35&appId=5147914965295677"
                            width="300"
                            height="35"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                    </Grid>
                </Grid.Container>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.footer`
    margin-top: 40px;

    .item {
        flex-direction: column;
        border-top: 3px solid #f5f5f5;
        padding: var(--padding-item-bottom);
    }

    svg {
        fill: var(--primary);
        transform: translateY(4px);
        font-size: 2rem;
    }
    .brand {
        img {
            margin: 0 auto;
            width: 160px;
        }
    }
    .about {
        iframe {
            margin: 0 auto;
        }

        p {
            margin: 5px 0;
        }

        h3 {
            text-align: center;
            color: var(--second);
        }
    }
    .fb {
        align-items: center;
        justify-content: center;

        .like {
            margin-top: 12px;
        }
    }
`;
export default Footer;
