import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  :root {
    --font-size-default: 14px;
  }

  html {
    height: 100%;
    width: 100%;
  }

  body {
    font-size: var(--font-size-default);
    font-family: 'Roboto', sans-serif;
    background-color: #f1f1f3;
    margin: 0;
  }
`;
