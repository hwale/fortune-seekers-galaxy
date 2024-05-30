// types.ts

export interface GetAppStateRequest {
  key?: string;
}

export interface State {
  [key: string]: string | number | boolean | Record<string, unknown> | null;
}

export interface GetAppStateResponse {
  publicState: State;
  protectedState: State;
  privateState: State;
}

export interface SetAppStateRequest {
  key?: string;
  publicState?: State;
  protectedState?: State;
  privateState?: State;
  overwrite?: boolean;
}

export interface SetAppStateResponse {
  publicState: State;
  protectedState: State;
  privateState: State;
}

export type GetUserStateRequest = GetAppStateRequest;
export type GetUserStateResponse = GetAppStateResponse;
export type SetUserStateRequest = SetAppStateRequest;
export type SetUserStateResponse = SetAppStateResponse;

export interface GrantSessionTokenRequest {
  exchangeCode: string;
}

export interface GrantSessionTokenResponse {
  id: string;
  appId: string;
  userId: string;
  chain: string;
  accessToken: string;
  exchangeCode: string;
  contractFunctionSelectors: Record<string, unknown>;
  nativeAllowance: string;
  erc20Allowances: Record<string, unknown>;
  erc721Allowances: Record<string, unknown>;
  erc1155Allowances: Record<string, unknown>;
  nonce: string;
  signatures: Record<string, unknown>;
  deadline: string;
  expiresAt: string;
  endedAt: string;
  updatedAt: string;
  createdAt: string;
}
