import React, { FC, useCallback } from 'react';
import styled from 'styled-components/macro';

import PricesFilter from '../../../components/Filters/PricesFilter';
import { FiltersProps, PriceRange } from '../../../components/Filters/types';
import CollectionsFilter from '../../../components/Filters/CollectionsFilter';
import { MyTokensStatuses } from './types';
import { FilterChangeHandler } from '../../../components/Filters/MobileFilter';

export const Filters: FC<FiltersProps<MyTokensFilterState>> = ({ value, onFilterChange }) => {
  const onStatusFilterChange = useCallback((statuses: MyTokensStatuses) => {
    onFilterChange({ ...(value || {}), statuses });
  }, [value, onFilterChange]);

  const onPricesFilterChange = useCallback((prices: PriceRange | undefined) => {
    onFilterChange({ ...(value || {}), prices });
  }, [value, onFilterChange]);

  const onCollectionsFilterChange = useCallback((collections: number[], traits?: string[]) => {
    onFilterChange(({ ...(value || {}), collections, traits }));
  }, [value, onFilterChange]);

  const onCollectionTraitsFilterChange = useCallback((traits: string[]) => {
    onFilterChange({ ...(value || {}), traits });
  }, [value, onFilterChange]);

  return <FiltersStyled>
    <CollectionsFilter onChange={onCollectionsFilterChange} />
    <PricesFilter onChange={onPricesFilterChange} />
  </FiltersStyled>;
};

const FiltersStyled = styled.div`
  width: 235px;
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--gap) * 2);
`;
