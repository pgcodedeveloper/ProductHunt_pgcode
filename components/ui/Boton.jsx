import styled from "@emotion/styled";


const Boton = styled.button`
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin-right: 1rem;
    border-radius: ${props => props.brRad ? '.5rem' : '0'};
    background-color: ${props =>props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};

    &:last-of-type{
        margin-right: 0;
    }

    &:hover{
        cursor: pointer;
    }
`


export default Boton;