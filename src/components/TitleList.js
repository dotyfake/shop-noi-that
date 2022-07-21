import React from 'react';
import styled from 'styled-components';

const TitleList = ({ title, onClick }) => {
    return (
        <Wrapper>
            <div className="title">
                <h3 onClick={onClick}>{title}</h3>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    text-align: center;
    margin: 40px 0;

    .title {
        position: relative;

        &::before {
            content: '';
            height: 1px;
            width: 100%;
            position: absolute;
            bottom: 20px;
            left: 0;
            background: var(--primary);
            z-index: 0;
        }
    }

    h3 {
        display: inline-block;
        font-size: 2.6rem;
        color: var(--white);
        background-color: var(--primary);
        position: relative;
        text-transform: uppercase;
        padding: 0 10px;
        margin: 0;
        position: relative;
        height: 40px;
        line-height: 40px;
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

        &::after {
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 20px 0 20px 14px;
            border-color: transparent transparent transparent var(--primary);
            position: absolute;
            right: -14px;
            top: 0px;
            transform: translateZ(75px);
        }
    }
`;

export default TitleList;
