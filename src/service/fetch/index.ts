import axios, { AxiosResponse } from "axios";
import { Api_Response, Error_Response } from "../../types";
import { Messages } from "../../messages";

const getEndpoint = (endpoint: string, query?: object) => {
  if (query) {
    let params: string[] = [];
    Object.entries(query).forEach((el) => {
      const [key, value] = el;
      params.push(`${key}=${value}`);
    });
    const QueryParams = params.join("&");
    return `${endpoint}?${QueryParams}`;
  }
  return endpoint;
};

export const get_API_Information = async <T>(
  endpoint: string,
  query?: object
): Promise<Api_Response<T | Error_Response>> => {
  try {
    const finalEndpoint = getEndpoint(endpoint, query);
    const res: AxiosResponse<T, any> = await axios.get(finalEndpoint);

    return {
      status: res.status,
      response: res.data,
    };
  } catch (error) {
    return {
      status: 500,
      response: {
        hasError: true,
        errorMessage: Messages.SERVER_NO_CONNECTION_GENERAL,
      },
    };
  }
};
