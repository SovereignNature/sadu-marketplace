import { Chain } from '../api/chainApi/types';

const configKeyRegexp = /NET_(?<network>[A-Z]+)_NAME$/gm;

export const defaultChainKey = 'block-explorer_chain';

const findNetworkParamByName = (
  config: Record<string, string | undefined>,
  network: string,
  name: string
): string => {
  const envKey = Object.keys(config).find((key) => key.includes(`NET_${network}_${name}`));

  if (envKey) return config[envKey] || '';

  return '';
};

export const getNetworkList = (config: Record<string, string | undefined>): string[] => {
  return Object.keys(config).reduce<string[]>((acc, key) => {
    if (!key.includes('NET_')) return acc;

    const { network } = configKeyRegexp.exec(key)?.groups || {};

    if (network) {
      acc.push(network);
    }

    return acc;
  }, []);
};

export const getDefaultChain = (config: Record<string, string | undefined>) => {
  const storedChain = localStorage.getItem(defaultChainKey);
  const networkList = getNetworkList(config);
  if (!networkList?.length) throw new Error('No chains provided in env, please make sure to provide correct APP_NET_YOUR-CHAIN_* in config');
  const defaultChain = networkList[0];
  if (!storedChain) return defaultChain;
  // If config was updated and we have already stored some chain that is no longer supported - skip it
  if (networkList.includes(storedChain)) return storedChain;
  // TODO: not enough data for localStorage.setItem?
  return defaultChain;
};

export const getNetworkParams = (
  config: Record<string, string | undefined>,
  network: string
): Chain => {
  const chain: Chain = {
    apiEndpoint: findNetworkParamByName(config, network, 'API'),
    name: findNetworkParamByName(config, network, 'NAME'),
    network
  };

  return chain;
};

export const getChainList = (config: Record<string, string | undefined>): Record<string, Chain> => {
  return getNetworkList(config).reduce<Record<string, Chain>>((acc, network) => {
    acc[network] = getNetworkParams(config, network);

    return acc;
  }, {});
};