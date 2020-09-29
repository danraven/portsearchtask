import styled from 'styled-components';

export const TitleHeading = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    padding: 1.2rem 0;
    margin: 0;
    margin-bottom: 1rem;
    background-color: #5072A7;
    color: #F0F8FF;
`;

export const FormFields = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr) 3.5rem;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;

    @media (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const ContentWrapper = styled.main`
    padding: 1rem;
`;

export const Submit = styled.button.attrs(props => ({
    type: props.type || 'submit'
}))`
    cursor: pointer;
    text-align: center;
    padding: 0.5rem;
    background-color: #EEE;
    border: 1px solid #BBB;
    border-radius: 5px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;

    &:hover, &:focus {
        outline: 0 none;
        background-color: #F0F8FF;
    }

    &:disabled {
        color: #888;
        cursor: default;
        opacity: 0.9;

        &:hover, &:focus {
            background-color: #EEE;
        }
    }

    @media (max-width: 1000px) {
        grid-column-end: span 2;
    }
`;

export const TextField = styled.input.attrs(props => ({
    type: props.type || 'text'
}))`
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1rem;
    color: #000;
    background-color: #FFF;
    border: 1px solid #BBB;
    border-radius: 5px;
    padding: 0.4rem;
    width: 100%;
    box-sizing: border-box;
`;

export const TextLabel = styled.label`
    font-size: 0.75rem;
    color: ${props => props.error ? '#D2122E' : '#555'};
    padding-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 700;
`;

export const AutocompleteWrapper = styled.div`
    position: relative;
`;

export const AutocompleteList = styled.ul`
    list-style: none;
    border-radius: 5px;
    position: absolute;
    background-color: #EEE;
    border: 1px solid #BBB;
    max-height: 300px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    top: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    display: ${props => props.hidden ? 'none' : 'block'};
    z-index: 100;
`;

export const AutocompleteItem = styled.li`
    box-sizing: border-box;
    padding: 0.4rem;
    border-bottom: 1px solid #EEE;
    cursor: pointer;
    background-color: ${props => props.highlight ?  '#B9D9EB' : 'transparent'};

    &:last-child {
        border-bottom: 0 none;
    }
`;

export const InfoBar = styled.p`
    margin: 0.5rem 0;
    padding: 0;
    color: #555;
    font-size: 0.9rem;
`;

export const ChartWrapper = styled.div`
    margin-top: 1.5rem;
    width: 100%;
    height: 300px;
`;
