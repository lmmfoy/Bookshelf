import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
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


    font-family: 'Frank Ruhl Libre', serif;
    font-size: 1.2em;
    color: var(--color-american-bronze);

  }

* {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }

  body {
      height: 100%;
      background-color: var(--color-beige);

  }
  html {
    height: 100%;

  }
  ol, ul {
      list-style: none;
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
    color: var(--color-beige);

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
    background-color: var(--color-beige);

  }

  div {
    border-color: var(--color-burnt-orange-brown);
  }

`;
