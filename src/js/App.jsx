import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import SearchPage from 'js/SearchPage';

const GlobalStyle = createGlobalStyle`
    ${normalize}

    html {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 16px;
    }

    .react-datepicker-wrapper {
        display: block;
    }
`;

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

export default function App() {
    return <Container>
        <GlobalStyle/>
        <SearchPage/>
    </Container>;
}
