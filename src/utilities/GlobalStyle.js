import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Heebo', sans-serif;
    margin: 0;
    padding: 0;
    background: ${props => props.mask ? `rgba(14, 37, 52, 0.15) !important` : 'transparent'};

    aside {
      background: ${props => props.mask ? `rgba(14, 37, 52, 0.15) !important` : 'transparent'};
    }
  }
`;