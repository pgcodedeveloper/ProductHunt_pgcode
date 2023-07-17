import React from 'react'
import { css } from '@emotion/react';

const Loader = () => {
    return (
        <div
            css={css`
                align-items: center;
                display: flex;
                height: 100%;
                justify-content: center;
                position: fixed;
                width: 100%;
                flex-direction: column;

            `}
        >
            <div className="dot-spinner">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
            </div>
        </div>
    )
}

export default Loader
