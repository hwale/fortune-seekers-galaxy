import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
        return axios.post(url, data);
      };
    }
    export namespace Hooks {
      export const useLogin = async () => {
        return useMutation({ mutationFn: HTTPRequests.login });
      };
    }
  }
}
