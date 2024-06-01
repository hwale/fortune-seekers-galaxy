import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const FORTUNE_SEEKERS_API_URL =
  "https://us-central1-fortune-seekers-galaxy.cloudfunctions.net/api";

export namespace FortuneSeekersAPI {
  export namespace Auth {
    export namespace Types {
      export interface LoginRequest {
        exchangeCode: string;
      }
    }
    export namespace HTTPRequests {
      export const login = async (data: Types.LoginRequest) => {
        const url = `${FORTUNE_SEEKERS_API_URL}/login`;
        return axios.post<string, AxiosResponse<string>, Types.LoginRequest>(
          url,
          data,
          {
            transformResponse: (data) => {
              try {
                console.log("data", data);
              } catch (error) {}
            },
            withCredentials: true,
          }
        );
      };
    }
    export namespace Hooks {
      export const useLogin = () => {
        return useMutation({ mutationFn: HTTPRequests.login });
      };
    }
  }
}
