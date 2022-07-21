import React from 'react';
import styled from 'styled-components';

const EmptyProduct = () => {
    return (
        <Wrapper>
            <div className="card"></div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;

    .card {
        height: var(--product-height);
        width: 100%;
        background-color: #f1f1f1;
        border-radius: 8px;
    }
`;

export default EmptyProduct;
