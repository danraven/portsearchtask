import styled from 'styled-components';

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
    color: #555;
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
    background-color: #FFF;
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

export const ChartWrapper = styled.div`
    width: 100%;
    height: 300px;
`;
