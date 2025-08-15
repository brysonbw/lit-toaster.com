import { css } from 'lit';

/** Styles for displaying code block */
export const codeBlockStyles = css`
  .code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
    font-family: 'Fira Code', 'Courier New', Courier, monospace;
    font-size: 1rem;
    padding: 1rem 1.25rem;
    font-weight: 500;
    border-radius: 8px;
    white-space: pre-wrap;
    user-select: text;
    line-height: 1.5;
    margin: 0.75rem 0;
    border: 1px solid #444;
  }
`;
