import React, { FC, useCallback } from 'react';
import styled from 'styled-components/macro';

import StatusFilter from './StatusFilter';
import PricesFilter from './PricesFilter';
import { FiltersProps, PriceRange, Statuses } from './types';
import CollectionsFilter from './CollectionsFilter';
import { useAccounts } from '../../hooks/useAccounts';

export const Filters: FC<FiltersProps> = ({ value, onFilterChange }) => {
  const { selectedAccount } = useAccounts();

  const onStatusFilterChange = useCallback((statuses: Statuses) => {
    onFilterChange({ ...value, statuses });
  }, [value, onFilterChange, selectedAccount]);

  const onPricesFilterChange = useCallback((prices: PriceRange | undefined) => {
    onFilterChange({ ...value, prices });
  }, [value, onFilterChange]);

  const onCollectionsFilterChange = useCallback((collections: number[], traits?: string[]) => {
    onFilterChange({ ...value, collections, traits });
  }, [value, onFilterChange]);

  const onCollectionTraitsFilterChange = useCallback((traits: string[]) => {
    onFilterChange({ ...value, traits });
  }, [value, onFilterChange]);

  return <FiltersStyled>
    <CollectionsFilter onChange={onCollectionsFilterChange} onTraitsChange={onCollectionTraitsFilterChange} />
    <PricesFilter onChange={onPricesFilterChange} />
  </FiltersStyled>;
};

const FiltersStyled = styled.div`
  width: 235px;
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--gap) * 2);
`;
