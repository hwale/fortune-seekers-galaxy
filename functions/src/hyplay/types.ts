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

export interface GetUserStateRequest extends GetAppStateRequest {
  accessToken: string;
}
export interface SetUserStateRequest {
  data: SetAppStateRequest;
  accessToken: string;
}

export type GetUserStateResponse = GetAppStateResponse;
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

export interface Wallet {
  id: string;
  type: string;
  address: string;
  authorityCiphertext: string;
  authorityBackupCiphertexts: Record<string, unknown>;
  authorityProofSignature: string;
  backupQuestions: Record<string, unknown>;
  updatedAt: string;
  createdAt: string;
}

export interface User {
  id: string;
  walletId: string;
  username: string;
  email: string;
  phone: string;
  discordId: string;
  facebookId: string;
  googleId: string;
  microsoftId: string;
  twitterId: string;
  accessToken: string;
  isChild: boolean;
  accessTokenExpiresAt: string;
  updatedAt: string;
  createdAt: string;
  wallet: Wallet;
}

export interface GetCurrentUserRequest {
  accessToken: string;
}

export type GetCurrentUserResponse = User;
