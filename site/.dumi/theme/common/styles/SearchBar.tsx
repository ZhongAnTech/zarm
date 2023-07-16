import { useSiteToken } from '.dumi/hooks';
import { css, Global } from '@emotion/react';

const THEME_PREFIX = 'dumi-default-';

export default () => {
  const { token } = useSiteToken();

  return (
    <Global
      styles={css`
        html {
          .${THEME_PREFIX}search-bar {
            &-input {
              color: ${token.colorText};
              &:focus {
                background: transparent;
              }
              &::placeholder {
                color: ${token.colorTextPlaceholder} !important;
              }
            }
          }
          .${THEME_PREFIX}search-popover {
            background-color: ${token.colorBgElevated} !important;
            &::before {
              border-bottom-color: ${token.colorBgElevated} !important;
            }
          }
          .${THEME_PREFIX}search-result {
            dl {
              dt {
                background-color: ${token.controlItemBgActive} !important;
              }
              dd {
                a {
                  &:hover {
                    background-color: ${token.controlItemBgHover};
                    h4,
                    p {
                      color: ${token.colorText} !important;
                    }
                    svg {
                      fill: ${token.colorText} !important;
                    }
                  }
                }
              }
            }
          }
        }
      `}
    />
  );
};
