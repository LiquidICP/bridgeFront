import { NetworkName } from '../../global';

export enum MetamaskStatus {
  INIT = 'INIT',
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  LOST = 'LOST',
  NOT_SUPPORT = 'NOT_SUPPORT',
  LOADING = 'LOADING',
  TRRR1 = 'TRRR1',
  TRRR2 = 'TRRR2',
  TRRR3 = 'TRRR3',
}

export enum MetamaskRequestMethod {
  eth_requestAccounts = 'eth_requestAccounts',
  eth_accounts = 'eth_accounts',
  eth_chainId = 'eth_chainId',
  wallet_switchEthereumChain = 'wallet_switchEthereumChain',
  wallet_addEthereumChain = 'wallet_addEthereumChain',
}

export enum Web3Event {
  disconnect = 'disconnect',
  connect = 'connect',
  accountsChanged = 'accountsChanged',
  chainChanged = 'chainChanged',
}

export type MetamaskState = {
  isTokensBalanceLoading: boolean,

  address?: string,
  status: MetamaskStatus,
  balance: string | number,
  network: NetworkName | null,

  tokensBalance?: string,
};
