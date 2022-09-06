import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-coffee-brown: #36220b;
    --color-fawn-brown: #5e3e17;
    --color-middle-brown: #986931;
    --color-dark-beige: #b8884e;
    --color-light-beige: #d6b575;

    --color-ruddy-brown: #bb6b24;

    --color-brown-pink: #d1a279;
    --color-dark-grey: #4d4237;
    --color-darker-grey: #352525;
    --color-canvas: #c6ad75;

    --color-american-bronze: #3e1404;
    --color-philippine-bronze: #6a2b05;
    --color-saddle-brown: #964315;
    --color-brown-brown: #5e320f;
    --color-dark-red: #590909;
    --color-brick-red: #7b2018;
    --color-burnt-orange-brown: #8c4611;
    --color-burnt-orange: #9c461e;
    --color-maroon: #451b1b;
    --color-maroon-red: #680822;
    --color-beige: #FBF6EE;
    --color-green: #334b38;

    --font-heading: 'Permanent Marker', Arial, Helvetica, sans-serif;
    --font-body: 'Kosugi', Arial, Helvetica, sans-serif;
    --padding-page: 24px;

    font-family: 'Frank Ruhl Libre', serif;
    font-size: 1.2em;
    color: var(--color-american-bronze);

  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

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
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
      padding: 10px;
      height: 100%;
  }
  html {
    height: 100%;

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

  h1 {
    font-size: 3em;
  }
  h2 {
    font-size: 1.8em;
  }
  h3 {
    font-size: 1.3em;
  }
  
  button {
    padding: 8px;
    max-width: 150px;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    font-family: 'Frank Ruhl Libre', serif;
    font-size: 1.1em;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.19);
    background-color: var(--color-saddle-brown);
    color: white;

    &:hover {
      transform: scale(1.04);
      transition: 0.1s ease-in-out;
      background-color: var(--color-brick-red);
    }

    &:active {
      transform: scale(.9);
      transition: 0.10s ease-in-out;
      box-shadow: 0 5px 8px 0 rgba(0,0,0,0.4), 0 5px 8px 0 rgba(0,0,0,0.19);
    }

    
}

  input {
    border-radius: 5px;
    border: 1px solid var(--color-burnt-orange-brown);

  }

  div {
    border-color: var(--color-burnt-orange-brown);
  }

`;
