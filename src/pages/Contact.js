import styled from 'styled-components';
import images from '~/assets/images';
import { Helmet } from 'react-helmet';
const Contact = () => {
    return (
        <div className="wide">
            <Wrapper>
                <Helmet>
                    <title>
                        Nội thất Sơn La - Xưởng Sản xuất - Thi công Nội Thất Gỗ Công Nghiệp - Đóng mới bọc lại bàn ghế
                        Sofa theo yêu cầu
                    </title>
                    <meta name="author" content="Doty" />
                    <meta property="og:image" content="https://telegra.ph/file/f015e64832b210727ef4f.png" />
                    <meta
                        name="keywords"
                        content="nội thất, nội thất sơn la, Thi công Nội Thất, bọc lại bàn ghế Sofa"
                    />
                    <meta
                        property="og:description"
                        content="Nội thất Sơn La - Xưởng Sản xuất - Thi công Nội Thất Gỗ Công Nghiệp - Đóng mới bọc lại bàn ghế Sofa - Theo yêu cầu. Đảm bảo giá cả hợp lý - bảo hành chất lượng tuyệt đối."
                    />
                    <meta
                        name="description"
                        content="Nội thất Sơn La - Xưởng Sản xuất - Thi công Nội Thất Gỗ Công Nghiệp - Đóng mới bọc lại bàn ghế Sofa - Theo yêu cầu. Đảm bảo giá cả hợp lý - bảo hành chất lượng tuyệt đối."
                    />
                </Helmet>
                <h1>NỘI THẤT SƠN LA</h1>
                <div className="row">
                    <div className="col">NỘI THẤT GỖ CÔNG NGHIỆP</div>
                    <div className="col">ĐẶT HÀNG THEO YÊU CẦU</div>
                </div>
                <div className="row">
                    <div className="col">NHẬN TƯ VẤN</div>
                    <div className="col">THIẾT KẾ LẮP ĐẶT</div>
                    <div className="col">LẮP ĐẶT NỘI THẤT</div>
                    <div className="col">BÀN GHẾ SOFA</div>
                </div>
                <img src={images.about} alt="" className="about-img" />
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.div`
    margin-top: var(--margin-top);
    h1 {
        text-align: center;
        color: var(--second);
    }

    .about-img {
        width: 100%;
    }

    .row {
        display: flex;
        justify-content: center;
        .col {
            background-color: var(--primary);
            color: var(--white);
            padding: 10px;
            margin: 10px;
            font-weight: 600;
            text-align: center;
            /* transform: skew(-10deg); */
        }
    }
`;
export default Contact;
