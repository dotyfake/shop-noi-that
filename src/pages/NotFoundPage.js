import styled from 'styled-components';

const NotFoundPage = () => {
    return (
        <Wrapper>
            <h1>404</h1>
            <p>RẤT TIẾC! TRANG BẠN TÌM KIẾM KHÔNG TỒN TẠI!</p>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 110px;
    height: 80vh;
    background-color: var(--highlight);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--white);
    padding: 40px;
    h1 {
        font-size: 24rem;
        margin: 0;
    }
`;

export default NotFoundPage;
