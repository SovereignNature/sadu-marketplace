import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Avatar, Button, Checkbox, Heading, Link, Select, Text, Icon } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { TCreateAccountBodyModalProps } from './types';
import { addressFromSeed } from '../../../utils/seedUtils';

import DefaultAvatar from '../../../static/icons/default-avatar.svg';
import { defaultPairType, derivePath } from './CreateAccount';
import { AdditionalWarning100 } from '../../../styles/colors';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import Question from '../../../static/icons/question.svg';

const seedGenerators = [
  { id: 'Mnemonic', title: 'Mnemonic' }
];

export const AskSeedPhraseModal: FC<TCreateAccountBodyModalProps> = ({ onFinish }) => {
  const [seed, setSeed] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [confirmSeedSaved, setConfirmSeedSaved] = useState<boolean>(false);
  const [seedGenerator, setSeedGenerator] = useState('Mnemonic');

  const changeSeed = useCallback((value: string) => {
    setSeed(value);
    const newAddress = addressFromSeed(value, derivePath, defaultPairType);
    setAddress(newAddress);
  }, [setSeed]);

  const generateSeed = useCallback(() => {
    const seed = mnemonicGenerate();
    changeSeed(seed);
  }, [setSeed]);

  const onSeedGeneratorChange = useCallback((value: string) => {
    setSeedGenerator(value);
  }, []);

  const onSeedChange = useCallback(({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    changeSeed(target.value);
  }, []);

  useEffect(() => {
    generateSeed();
  }, []);

  const onNextClick = useCallback(() => {
    onFinish({ seed, address });
  }, [seed, address]);

  return (<>
    <AddressWrapper>
      <Avatar size={24} src={DefaultAvatar} />
      <Text>{address}</Text>
    </AddressWrapper>
    <Heading size={'4'} >The secret seed value for this account</Heading>
    <SeedGeneratorSelectWrapper>
      <Select options={seedGenerators} value={seedGenerator} onChange={onSeedGeneratorChange} />
      <Tooltip title={<>Find out more on <Link href='https://' title={'Polkadot Wiki'}>Polkadot Wiki</Link></>} >
        <Icon file={Question} size={24} />
      </Tooltip>
    </SeedGeneratorSelectWrapper>
    <InputSeedWrapper>
      <SeedInput
        onChange={onSeedChange}
        value={seed}
      />
      <Button onClick={generateSeed} title='Regenerate seed' />
    </InputSeedWrapper>
    <TextStyled
      color='additional-warning-500'
      size='s'
    >
      Ensure that you keep this seed in a safe place. Anyone with access to it can re-create the account and gain full access to it.
    </TextStyled>
    <ConfirmWrapperRow>
      <Checkbox label={'I have saved my mnemnic seed safely'}
        checked={confirmSeedSaved}
        onChange={setConfirmSeedSaved}
        size={'m'}
      />
    </ConfirmWrapperRow>
    <ButtonWrapper>
      <StepsTextStyled size={'m'}>Step 1/3</StepsTextStyled>
      <Button
        disabled={!address || !confirmSeedSaved}
        onClick={onNextClick}
        role='primary'
        title='Next'
      />
    </ButtonWrapper>
  </>);
};

const AddressWrapper = styled.div`
  display: flex;
  column-gap: calc(var(--gap) / 2);
  margin: calc(var(--gap) * 2) 0;
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  padding: 20px var(--gap);
  .unique-text {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const SeedGeneratorSelectWrapper = styled.div`
  display: flex;
  margin-top: calc(var(--gap) * 1.5);
  margin-bottom: var(--gap);
  align-items: center;
  column-gap: 10px;
  .unique-select {
    flex-grow: 1;
  }
`;

const InputSeedWrapper = styled.div`
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  padding: var(--gap);
  display: flex;
  margin-bottom: var(--gap);
`;

const SeedInput = styled.textarea`
  margin-bottom: 32px;
  width: 100%;
  border: none;
  height: auto;
  resize: none;
  outline: 0px none transparent;
`;

const TextStyled = styled(Text)`
  box-sizing: border-box;
  display: flex;
  padding: 8px 16px;
  margin: calc(var(--gap) * 1.5) 0;
  border-radius: 4px;
  background-color: ${AdditionalWarning100};
  width: 100%;
`;

const ConfirmWrapperRow = styled.div`
  display: flex;
  margin-bottom: calc(var(--gap) * 1.5);
`;

const StepsTextStyled = styled(Text)`
  flex-grow: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
