import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: #121212;
    margin: 0;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }
  .top-gutter {
    margin-top: 8px;
  }
  .bottom-gutter {
    margin-bottom: 8px;
  }
  .vertical-gutter {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`

export default GlobalStyle;