import axios, { AxiosResponse } from 'axios';
import * as functions from 'firebase-functions';
import {
  GetAppStateRequest,
  GetCurrentUserRequest,
  GetCurrentUserResponse,
  GetUserStateRequest,
  GetUserStateResponse,
  GrantSessionTokenRequest,
  GrantSessionTokenResponse,
  SetAppStateRequest,
  SetAppStateResponse,
  SetUserStateRequest,
} from './types';

const HYPLAY_API_URL = 'https://api.hyplay.com/v1';
// const HYPLAY_ACCESS_TOKEN = functions.config().hyplay.access_token;
const FORTUNE_SEEKERS_SECRET_KEY =
  functions.config().hyplay.fortune_seekers_secret_key;
const FORTUNE_SEEKERS_APP_ID = '6ac6d7e7-989e-4dac-9765-f29d98cef802';

// Apps API
const HYPLAY_APPS_URL = `${HYPLAY_API_URL}/apps`;

export const getAppState = async (params: GetAppStateRequest) => {
  let url = `${HYPLAY_APPS_URL}/${FORTUNE_SEEKERS_APP_ID}/states`;
  if (params?.key) {
    const { key } = params;
    url += `?key=${key}`;
  }

  return axios.get(url, {
    headers: {
      'x-app-authorization': FORTUNE_SEEKERS_SECRET_KEY,
    },
  });
};

export const setAppState = async (data: SetAppStateRequest) => {
  return axios.post<
    SetAppStateResponse,
    AxiosResponse<SetAppStateResponse>,
    SetAppStateRequest
  >(`${HYPLAY_APPS_URL}/${FORTUNE_SEEKERS_APP_ID}/states`, data, {
    headers: {
      'x-app-authorization': FORTUNE_SEEKERS_SECRET_KEY,
    },
  });
};

export const getUserState = async (params: GetUserStateRequest) => {
  let url = `${HYPLAY_APPS_URL}/${FORTUNE_SEEKERS_APP_ID}/states`;
  if (params?.key) {
    const { key } = params;
    url += `?key=${key}`;
  }

  const { accessToken } = params;

  return axios.get<GetUserStateResponse, AxiosResponse<GetUserStateResponse>>(
    url,
    {
      headers: {
        'x-session-authorization': accessToken,
      },
    },
  );
};

export const setUserState = async (params: SetUserStateRequest) => {
  const { data, accessToken } = params;

  return axios.post<
    SetAppStateResponse,
    AxiosResponse<SetAppStateResponse>,
    SetAppStateRequest
  >(`${HYPLAY_APPS_URL}/${FORTUNE_SEEKERS_APP_ID}/states`, data, {
    headers: {
      'x-session-authorization': accessToken,
    },
  });
};

// Sessions API
const HYPLAY_SESSIONS_URL = `${HYPLAY_API_URL}/sessions`;

export const grantSessionToken = async (data: GrantSessionTokenRequest) => {
  return axios.post<
    GrantSessionTokenResponse,
    AxiosResponse<GrantSessionTokenResponse>,
    GrantSessionTokenRequest
  >(`${HYPLAY_SESSIONS_URL}/token`, data, {
    headers: {
      'x-app-authorization': FORTUNE_SEEKERS_SECRET_KEY,
    },
  });
};

// Users API
const HYPLAY_USERS_URL = `${HYPLAY_API_URL}/users`;

export const getCurrentUser = async (params: GetCurrentUserRequest) => {
  const { accessToken } = params;

  return axios.get<
    GetCurrentUserResponse,
    AxiosResponse<GetCurrentUserResponse>
  >(`${HYPLAY_USERS_URL}/me`, {
    headers: {
      'x-session-authorization': accessToken,
    },
  });
};
