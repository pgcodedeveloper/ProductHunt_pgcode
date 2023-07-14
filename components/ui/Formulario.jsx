import styled from "@emotion/styled";

export const Formulario = styled.form`
    max-width: 600px;
    width: 90%;
    margin: 5rem auto 0 auto;
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: #e1e1e1;

    @media (min-width: 768px) {
        width: 90%;
        max-width: 750px;
        padding: 2.5rem;
    }

    fieldset{
        margin: 2rem 0;
        border: 1px solid #cccccc;
        font-size: 2rem;
        padding: 1rem;

        @media (min-width: 768px) {
            padding: 2rem;
        }
    }
`;


export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        flex-direction: row;
        gap: 0;
    }
    label{
        @media (min-width: 768px) {
            flex: 0 0 150px;
            font-size: 1.8rem;
        }

        @media(max-width: 448px) {
            width: 100%;
            text-align: left;
        }
        
        font-size: 1.5rem;
        font-weight: 700;
        color: #3d3d3d;
    }

    input, textarea{
        @media (min-width: 768px) {
            flex: 1;
        }
        width: 100%;
        font-size: 1.5rem;
        padding: 1rem;
        border: none;
        border-radius: .5rem;
    }

    textarea{
        height: 400px;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover{
        cursor: pointer;
    }
`;

export const Error = styled.p`
    background: #ff00009b;
    padding: 1rem;
    border-radius: .5rem;
    backdrop-filter: blur(50px);
    font-weight: 700;
    font-family: 'PT Sans' sans-serif;
    font-size: 1.5rem;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;
