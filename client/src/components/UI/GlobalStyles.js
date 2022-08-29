import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    /* :root {
        --color-primary: purple;
        --color-secondary: hsl(282, 80%, 63%);
        --color-light: lavender;
        --font-heading: 'Permanent Marker', Arial, Helvetica, sans-serif;
        --font-body: 'Kosugi', Arial, Helvetica, sans-serif;
        --padding-page: 24px;
    } */

    *,
    *:before,
    *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }
    html, body, div,
    input, textarea, button, select, option,
    h1, h2, h3, h4, h5, h6, p,
    text {
        font-family: 'Raleway', Arial, sans-serif;
    }

    html, body {
    max-width: 100vw;
    height: 100vh;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    body {
        line-height: 1.25;
        margin: 0 15%;
    }

    button {
        color: #FFF;
        background-color: green;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        margin: 20px 0;
        padding: 10px 20px;
        border-radius: 40px;
        transition: background-color ease-out 300ms;

    &:hover{
        background-color: whitesmoke;
        transform: scale(.98);
    }
    }

    a {
        text-decoration: none;
        color: black;
        cursor: pointer;
    }

    Link {
        text-decoration: none;
    }
`
export default GlobalStyles;