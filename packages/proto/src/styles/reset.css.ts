import { css } from "lit";

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    display: block;
  }

  body {
    font-family: var(--font-family-body);
    font-weight: var(--font-weight-normal);
    background-color: var(--color-background);
    color: var(--color-header);
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-bold);
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default { styles };