import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import SearchPage from 'js/SearchPage';

const GlobalStyle = createGlobalStyle`
    ${normalize}

    html {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 16px;
        height: 100%;
    }

    body {
        height: 100%;
        min-height: 100%;
    }

    #app {
        max-width: 1000px;
        min-height: 100%;
        margin: 0 auto;
        border-left: 1px solid #DDD;
        border-right: 1px solid #DDD;
    }

    .react-datepicker-wrapper {
        display: block;
    }

    @media (max-width: 1000px) {
        #app {
            border-left: 0 none;
            border-right: 0 none;
        }
    }
`;

export default function App() {
    return <>
        <GlobalStyle/>
        <SearchPage/>
    </>;
}
