import { FC, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';
import { Header } from '.';
import { useFooter } from '../hooks/useFooter';

export type TMenuItems = 'Bio-Compendium' | 'My tokens' | 'Trades' | 'FAQ';

export const PageLayout: FC = () => {
  const { pathname } = useLocation();
  const footer = useFooter();

  const layoutProps = useMemo(() => {
    if (pathname === '/bio-compendium') return { heading: 'Bio-Compendium' };

    if (pathname === '/myTokens') {
      return { heading: 'My Tokens' };
    }

    if (pathname === '/trades') {
      return { heading: 'Trades' };
    }

    if (pathname === '/faq') {
      return { heading: 'FAQ' };
    }

    if (pathname === '/accounts') {
      return { heading: 'My Wallets' };
    }

    if (pathname === '/bio-compendium/token') {
      return {
        breadcrumbs: {
          options: [{ link: '/bio-compendium', title: 'Bio-Compendium' }, { title: 'Token' }]
        }
      };
    }
  }, [pathname]);

  return (
    <LayoutStyled>
      <Layout
        {...layoutProps}
        footer={<div dangerouslySetInnerHTML={{ __html: footer }} />}
        header={
          <Header
            activeItem={(layoutProps?.heading as TMenuItems) || 'Bio-Compendium'}
          />
        }
      >
        <Outlet />
      </Layout>
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`

  /* specific for dafc */
  .unique-layout {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-image: url("./logos/background.jpeg");
    background-position: inherit;
    background-size: cover;
    background-repeat: round;
    background-attachment: fixed;

  

    .unique-font-heading.size-1 {
      font-size: 40px;
      text-align: left;
      text-transform: uppercase;
      font-weight: 500;
      margin: 32px 0;
      color: var( --color-additional-light);
      font-family: var(--font-heading);
    }

    footer {
      background: var(--card-background);

      .footer__text {
        color: var(--color-additional-light);
      }

      .footer__text__dafc {
        color: var(--color-additional-light);
        font-size: 16px;
        line-height: 24px;
      }
    }
  }


  .unique-layout__content {
    padding: 0 !important;
    background-color: transparent !important;
    box-shadow: none !important;
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--gap) * 1.5);
  }


  main {
    > div {
      display: flex;
    }

    /* Todo: remove after done task https://cryptousetech.atlassian.net/browse/NFTPAR-1238 */
    .unique-breadcrumbs-wrapper {
      align-items: center;

      .breadcrumb-item {
        line-height: 22px;
      }
    }
  }

  header {
    background: transparent;
    top: 0;
    position: sticky !important;
    z-index: 990;
    padding: 16px 48px;
    transition: background-color 0.3s ease; 

    &.inverted {
      background: rgba(0, 0, 0, 80%);
    }
    
    @media (max-width: 1024px) {
      height: 80px !important;
    }
  }
  
  footer {
    @media (max-width: 568px) {
      height: unset;
    }
    &>div {
      display: flex;
      align-items: center;
      height: 64px;
      justify-content: space-between;
      width: 100%;
      @media (max-width: 568px) {
        padding: var(--gap) 0;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  .unique-tabs-labels {
    flex-wrap: nowrap;
  }
`;
