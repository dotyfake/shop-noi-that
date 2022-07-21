import styled from 'styled-components';
import { Loading, Collapse } from '@nextui-org/react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { useDispatch, useSelector } from 'react-redux';
import { removeVietnameseTones } from '~/functions/functions';
import { BiUpArrow } from 'react-icons/bi';

import images from '~/assets/images';
import { useViewport, useDebounce } from '~/hooks/hooks';
import { tagsName } from '~/functions/category';
import { actions } from '~/store';

const navItems = [
    { name: 'TRANG CHỦ', path: '/' },
    { name: 'SẢN PHẨM', path: '/products' },
    { name: 'GIỚI THIỆU', path: '/contact' },
];

const Header = () => {
    const [minimize, setMinimize] = useState();
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [boxSearchValue, setBoxSearchValue] = useState([]);
    const [loading, setLoading] = useState(false);
    const debounce = useDebounce(searchValue, 500);
    const [goTop, setGoTop] = useState(false);
    const state = useSelector((state) => state.products);
    const { allProducts, titleProducts } = state;

    const viewPort = useViewport();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isMobile = viewPort.width <= 650;

    const hide = () => {
        setVisible(false);
    };

    const goToTop = () => {
        window.scroll(0, 0);
    };

    const handleKeyChild = (child) => {
        const results = allProducts.filter((product) => product.type === child);
        dispatch(actions.setProducts(results));
        dispatch(actions.setTitleProducts(child));
    };

    useEffect(() => {
        if (searchValue.length > 2 && debounce) {
            const searchResults = allProducts.filter((product) =>
                removeVietnameseTones(product.name)
                    .toLowerCase()
                    .includes(removeVietnameseTones(searchValue).toLowerCase()),
            );
            setBoxSearchValue(searchResults);
            setVisible(true);
        }
        setLoading(false);
    }, [debounce]);

    useEffect(() => {
        if ((boxSearchValue.length > 0) + visible > 1) {
            setLoading(false);
        }
    }, [boxSearchValue, visible, loading]);

    useEffect(() => {
        const handleMinimize = () => {
            setMinimize(window.scrollY > 0);
        };
        const handleGoTop = () => {
            setGoTop(window.scrollY > 1000);
        };
        window.addEventListener('scroll', handleMinimize);
        window.addEventListener('scroll', handleGoTop);

        return () => {
            window.removeEventListener('scroll', handleMinimize);
            window.removeEventListener('scroll', handleGoTop);
        };
    }, []);

    return (
        <Wrapper minimize={minimize} isMobile={isMobile} showSidebar={showSidebar}>
            <div className="wide">
                {!isMobile && (
                    <div className="logo">
                        <Link to="/">
                            <img src={images.logo} alt="" />
                        </Link>
                    </div>
                )}
                {isMobile && (
                    <HeadlessTippy
                        visible={visible}
                        interactive={true}
                        onClickOutside={hide}
                        placement="bottom"
                        render={(attrs) => (
                            <div className="box-result" tabIndex="-1" {...attrs}>
                                {boxSearchValue.map((item, i) => (
                                    <div
                                        class="result-item"
                                        onClick={() => {
                                            dispatch(actions.setProduct(item));
                                            navigate('/productPage');
                                            goToTop();
                                            setShowSidebar(false);
                                            setVisible(false);
                                        }}
                                    >
                                        <div
                                            className="image"
                                            style={{
                                                background: `url(${item.image[0]}) no-repeat center/ cover`,
                                                paddingLeft: '40%',
                                            }}
                                        ></div>
                                        <div className="info">
                                            <h4>{item.name}</h4>
                                            <p>
                                                Liên hệ: <span>039.928.8889</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    >
                        <div className="search">
                            <div className="wrapper">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm ..."
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                        setLoading(true);
                                    }}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            setTimeout(() => {
                                                navigate('/products');
                                                goToTop();
                                                dispatch(actions.setProducts(boxSearchValue));
                                                dispatch(
                                                    actions.setTitleProducts(`Kết quả tìm kiếm cho "${searchValue}"`),
                                                );
                                                setVisible(false);
                                                setSearchValue('');
                                            }, 500);
                                        }
                                    }}
                                />
                                {loading && <Loading size="md" />}
                                <button
                                    className="btn-search"
                                    onClick={() => {
                                        navigate('/products');
                                        goToTop();
                                        dispatch(actions.setProducts(boxSearchValue));
                                        dispatch(actions.setTitleProducts(`Kết quả tìm kiếm cho "${searchValue}"`));
                                        setVisible(false);
                                        setSearchValue('');
                                    }}
                                >
                                    <FaSearch />
                                </button>
                            </div>
                        </div>
                    </HeadlessTippy>
                )}
                {!isMobile && (
                    <div className="center">
                        <div className="navbar">
                            <ul className="nav-list">
                                {navItems.map((item, i) => (
                                    <li
                                        key={i}
                                        className="nav-item"
                                        onClick={() => {
                                            goToTop();
                                            if (item.name === 'SẢN PHẨM') {
                                                dispatch(actions.setProducts(allProducts));
                                                dispatch(actions.setTitleProducts('Tất cả sản phẩm'));
                                            }
                                        }}
                                        style={{ display: isMobile && item.name === 'TRANG CHỦ' ? 'none' : '' }}
                                    >
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) => (isActive ? 'active' : 'normal')}
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {!minimize + !isMobile > 1 && (
                            <HeadlessTippy
                                visible={visible}
                                interactive={true}
                                onClickOutside={hide}
                                placement="bottom"
                                render={(attrs) => (
                                    <div className="box-result" tabIndex="-1" {...attrs}>
                                        {boxSearchValue.map((item, i) => (
                                            <div
                                                class="result-item"
                                                onClick={() => {
                                                    dispatch(actions.setProduct(item));
                                                    navigate('/productPage');
                                                    goToTop();
                                                    setShowSidebar(false);
                                                    setVisible(false);
                                                }}
                                            >
                                                <div
                                                    className="image"
                                                    style={{
                                                        background: `url(${item.image[0]}) no-repeat center/ cover`,
                                                        paddingLeft: '40%',
                                                    }}
                                                ></div>
                                                <div className="info">
                                                    <h4>{item.name}</h4>
                                                    <p>
                                                        Liên hệ: <span>039.928.8889</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            >
                                <div className="search">
                                    <div className="wrapper">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm ..."
                                            value={searchValue}
                                            onChange={(e) => {
                                                setSearchValue(e.target.value);
                                                setLoading(true);
                                            }}
                                            onKeyUp={(e) => {
                                                if (e.key === 'Enter') {
                                                    setTimeout(() => {
                                                        navigate('/products');
                                                        goToTop();
                                                        dispatch(actions.setProducts(boxSearchValue));
                                                        dispatch(
                                                            actions.setTitleProducts(
                                                                `Kết quả tìm kiếm cho "${searchValue}"`,
                                                            ),
                                                        );
                                                        setVisible(false);
                                                        setSearchValue('');
                                                    }, 500);
                                                }
                                            }}
                                        />
                                        {loading && <Loading size="md" />}
                                        <button
                                            className="btn-search"
                                            onClick={() => {
                                                navigate('/products');
                                                goToTop();
                                                dispatch(actions.setProducts(boxSearchValue));
                                                dispatch(
                                                    actions.setTitleProducts(`Kết quả tìm kiếm cho "${searchValue}"`),
                                                );
                                                setVisible(false);
                                                setSearchValue('');
                                            }}
                                        >
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </HeadlessTippy>
                        )}
                    </div>
                )}
                {!isMobile && (
                    <div className="contact">
                        <p>
                            Liên hệ: <span className="phone">039.928.8889</span>
                        </p>
                        <p className="link-fb">
                            <a href="https://www.facebook.com/noithatsonla/">
                                <img
                                    src="https://accounts.fullstack.edu.vn/assets/images/signin/facebook-18px.svg"
                                    alt=""
                                />
                                Nội thất Sơn La
                            </a>
                        </p>
                    </div>
                )}
                {isMobile && (
                    <div>
                        <button className="bars" onClick={() => setShowSidebar(true)}>
                            <FaBars />
                        </button>
                        <div className={showSidebar ? 'side-bar active' : 'side-bar'}>
                            <div className="sidebar-content">
                                <div
                                    className="logo-side-bar"
                                    onClick={() => {
                                        goToTop();
                                        setShowSidebar(false);
                                    }}
                                >
                                    <Link to="/">
                                        <img src={images.logo} alt="" />
                                    </Link>
                                </div>

                                <Link
                                    to="/products"
                                    onClick={() => {
                                        goToTop();
                                        setShowSidebar(false);
                                        dispatch(actions.setProducts(allProducts));
                                        dispatch(actions.setTitleProducts('Tất cả sản phẩm'));
                                    }}
                                >
                                    Sản phẩm
                                </Link>
                                {tagsName.map((item, i) => (
                                    <Collapse.Group className={`collapse-group collapse-group-${i}`}>
                                        <Collapse title={item.name}>
                                            <ul>
                                                {item.children.map((child) => (
                                                    <li
                                                        onClick={() => {
                                                            navigate('/products');
                                                            goToTop();
                                                            setShowSidebar(false);
                                                            handleKeyChild(child);
                                                        }}
                                                    >
                                                        {child}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Collapse>
                                    </Collapse.Group>
                                ))}
                                <Link
                                    to="/contact"
                                    onClick={() => {
                                        goToTop();
                                        setShowSidebar(false);
                                    }}
                                >
                                    Giới thiệu
                                </Link>
                            </div>
                            <button
                                className="close"
                                onClick={() => {
                                    setShowSidebar(false);
                                    goToTop();
                                }}
                            >
                                <FaTimes /> Đóng
                            </button>
                        </div>
                        <div
                            className={showSidebar ? 'modal-overlay active' : 'modal-overlay'}
                            onClick={() => setShowSidebar(false)}
                        ></div>
                    </div>
                )}
            </div>
            {goTop && (
                <div className="btn-go-top" onClick={() => goToTop()}>
                    <BiUpArrow />
                </div>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.header`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    transition: all 0.3s;
    height: ${(props) => (props.minimize + props.isMobile > 0 ? '60px' : 'var(--header-height)')};
    background-color: var(--white);
    box-shadow: 1px 1px 10px rgb(0 0 0 / 15%);
    z-index: 1000;

    .wide {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .logo {
        height: 100%;
        a {
            height: 100%;
            display: flex;
            align-items: center;
        }
        img {
            height: 90%;
        }
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .navbar {
            ul {
                display: flex;
                li {
                    margin: 0 8px;
                    font-weight: 500;

                    .active {
                        color: var(--primary);
                        font-weight: 600;
                    }

                    &:hover {
                        color: var(--primary);
                    }
                }
            }
        }
    }

    .box-result {
        background-color: var(--white);
        width: var(--search-width);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
        max-height: 70vh;
        overflow-y: auto;
        color: var(--second);

        &::-webkit-scrollbar {
            width: 12px; /* width of the entire scrollbar */
        }
        &::-webkit-scrollbar-track {
            background: var(--white); /* color of the tracking area */
        }
        &::-webkit-scrollbar-thumb {
            background-color: var(--primary); /* color of the scroll thumb */
            border-radius: 20px; /* roundness of the scroll thumb */
            border: 3px solid var(--white); /* creates padding around scroll thumb */
        }
        .result-item {
            display: flex;
            padding: 5px;
            height: 100px;
            cursor: pointer;

            h4 {
                margin: 12px 0;
            }

            p {
                margin: 0;
                font-size: 1.2rem;
            }

            &:hover {
                background-color: #f5f5f5;
            }
            &:active {
                background-color: #f5f5f5;
            }
            .image {
                margin-right: 10px;
            }
        }
    }

    .contact {
        ${(props) => (props.minimize ? 'display: flex; align-item: center;' : '')};
        .phone {
            color: var(--primary);
        }
        text-align: center;
        p {
            margin: 5px 10px;
        }
        .link-fb {
            margin-top: 2px;
            a {
                font-size: 1.6rem;
                font-weight: 500;
                color: #4267b2;
                img {
                    transform: translateY(2px);
                    margin-right: 3px;
                }
            }
        }
    }

    .bars {
        all: unset;
        transform: translateY(2px);
        svg {
            font-size: 3rem;
            fill: var(--primary);
            &:active {
                fill: var(--second);
            }
        }
    }

    .side-bar {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 320px;
        background-color: var(--white);
        padding: 10px;
        color: var(--black);
        box-shadow: 3px 0 8px rgba(0, 0, 0, 0.4);
        z-index: 1002;
        transform: translateX(100%);
        transition: all 0.4s;
        opacity: 0;

        &.active {
            transform: translateX(0);
            opacity: 1;
        }

        .sidebar-content {
            height: 88vh;
            overflow-y: auto;
            .collapse-group {
            }

            .collapse-group-0 {
                display: none;
            }

            .logo-side-bar {
                display: flex;
                justify-content: center;
                img {
                    height: 60px;
                }
            }

            ul {
                li {
                    font-size: 1.5rem;
                }
            }

            & > a {
                display: block;
                font-size: 1.8rem;
                font-weight: 700;
                color: black;
                padding-left: 7.5px;
                margin: 12.5px 0;
            }
        }

        .close {
            all: unset;
            border: 1px solid var(--highlight);
            border-radius: 8px;
            padding: 5px;
            display: flex;
            align-items: center;
            margin-top: 10px;

            svg {
                font-size: 2.5rem;
                fill: var(--highlight);
            }
            &:active {
                color: var(--highlight);
            }
        }
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 100;
        opacity: 0;
        visibility: hidden;

        &.active {
            opacity: 1;
            visibility: visible;
        }
    }

    .btn-go-top {
        display: inline-block;
        border: 2px solid var(--second);
        padding: 5px 7px;
        border-radius: 50%;
        position: fixed;
        bottom: 100px;
        right: 15px;
        z-index: 999;
        svg {
            font-size: 2rem;
        }
        &:hover {
            border-color: var(--primary);
        }
        &:hover svg {
            fill: var(--primary);
        }
    }

    .search {
        .wrapper {
            border: 1px solid var(--primary);
            border-radius: 30px;
            padding: 6px 6px 6px 20px;
            width: var(--search-width);
            display: flex;
            align-items: center;
            justify-content: space-around;

            .btn-search {
                all: unset;
                cursor: pointer;
                height: 1.8rem;
                svg {
                    font-size: 1.8rem;
                    fill: var(--second);
                }
            }

            input {
                all: unset;
                width: 80%;
                font-size: 1.6rem;
            }
        }
    }

    .btn-search {
        svg {
            &:active {
                fill: var(--primary);
            }
        }
    }
`;

export default memo(Header);
