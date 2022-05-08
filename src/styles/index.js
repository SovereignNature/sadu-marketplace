import { createGlobalStyle } from 'styled-components';
import { AdditionalDark, Primary200 } from './colors';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Constants */
    --gap: 16px;
    
    /* colors */
    --grey-300: #D2D3D6;
  }
  ::selection {
    color: #fff;
    background: #aae6b9;
  }
/* reset default browser css */

a{
    text-decoration: none;
}

.unique-modal {
  overflow: visible;
}
`;

export const SaduStyle = createGlobalStyle`
  * {
    font-family: var(--font-roboto);
  }
  ::selection {
    color: var(--color-additional-light);
    background: var(--color-primary-700);
  }
  
  ::-webkit-scrollbar {
      width: 8px;
  }

  ::-webkit-scrollbar-track {
      background: var(-color-additional-dark);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-primary-600);
    border-radius: 24px;
  }
    
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary-700);
  }
  /* reset default browser css */

  .connect__btn {
    height:  inherit !important;
  }

  .unique-layout {
    &__content {
      .unique-font-heading,
      p,ol,li {
        color: var(--color-additional-light);
        a {
          color: ${Primary200};
        }
      }
      .unique-tabs-labels {
        .tab-label {
          border: 1px solid ${Primary200};
          color: ${Primary200};
          &.active {
            background-color: ${Primary200};
            color: ${AdditionalDark};
          }
        }
      }
    }
  }
  
  .unique-text {
    font-family: var(--font-roboto) !important;
    color: var(--color-additional-light) !important;
  }
  .unique-table {
    .unique-table-data {
      .unique-table-data-row {
        .unique-link {
          &.primary {
            color: var(--color-secondary-200);
          }
          &.secondary {
            color: var(--color-secondary-100);
          }
        }
      }
    }
  }
  .unique-pagination-wrapper {
    .pages-wrapper {
      .page-item {
        color: var(--color-secondary-200);
        &.active {
          background-color: var(--color-secondary-200);

        }
        svg.icon {
          fill: var(--color-secondary-200);
        }
      }
    }
  }
  .unique-modal-wrapper {
    .unique-modal {
      background-color: var(--color-grey-700);
      .close-button {
        svg {
          fill: var(--color-additional-light);  
        }
      }
      .unique-font-heading {
        color: var(--color-additional-light);
      }
    }
  }
  .unique-select {
    
    .select-wrapper {
      color: var(--color-additional-light);

      svg {
        fill: var(--color-secondary-200);
      }

      .select-dropdown {
        background-color: var(--card-background);
        .dropdown-option {
          &: hover,
          &.selected {
            color: var(--color-additional-dark);
          }
        }
      }
    }
  }
  .unique-avatar {
    display: none;
  }
  .unique-input-text {
    .input-wrapper {
      border: none;
      border-radius: 8px;
      &:focus-within {
        border: none;
      }
      input {
        color: var(--color-additional-light);
        background: #322222;
        border-radius: 4px;
        &:focus{
          border: 1px solid var(--color-additional-light);
        }
      }
    }
  }

  .unique-button {
    &.primary {
      background: var(--color-primary-300);
      border-color: var(--color-primary-300);
      color: var(--color-additional-dark);
    }
  }

  .unique-checkbox-wrapper {
    .checkmark {
      background: #322222;
      border: 1px solid var(--color-primary-200);
      &:hover {
        border: 1px solid var(--color-additional-light);
      }
      &.checked {
        background: var(--color-primary-200);
        border: 1px solid var(--color-primary-200);
        border-radius: 4px;
        width: 20px;
        height: 20px;
        padding: 2px;
      }
    }
    label {
      color: var(--color-secondary-100);
    }
  }
  a{
      text-decoration: none;
  }
  .unique-modal {
    overflow: visible;
  }
`;
