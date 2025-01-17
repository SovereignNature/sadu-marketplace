import { FC } from 'react';
import styled from 'styled-components/macro';
import { TokensCard } from '..';
import { NFTToken } from '../../api/chainApi/unique/types';
import { Offer } from '../../api/restApi/offers/types';

type TTokensList = {
  tokens: (NFTToken & Partial<Offer>)[];
};

export const TokensList: FC<TTokensList> = ({ tokens }) => {
  return (
    <TokensListStyled>
      {tokens?.map &&
        tokens.map((token) => (
          <TokensCard
            key={`token-${token?.collectionId || ''}-${token?.id}`}
            tokenId={token?.id}
            collectionId={token?.collectionId}
            token={token}
          />
        ))}
    </TokensListStyled>
  );
};

const TokensListStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 32px;

  @media (max-width: 1919px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: 1439px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 567px) {
    display: flex;
    flex-direction: column;
  }
`;
