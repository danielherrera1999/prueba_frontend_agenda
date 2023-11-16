import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export abstract class AxiosDataSource {
  get<Result = void> (endpoint: string, config: AxiosRequestConfig | undefined = undefined) : Promise<AxiosResponse<Result>>{
    return new Promise((resolve, rejects) => {
      axios.get<Result>(endpoint, config)
      .then(response => resolve(response))
      .catch((err: any) => rejects(err))
    })
  }

  post<Result = void> (endpoint: string,data: any ,config: AxiosRequestConfig | undefined = undefined) : Promise<AxiosResponse<Result>>{
    return new Promise((resolve, rejects) => {
      axios.post<Result>(endpoint, data, config)
      .then(response => resolve(response))
      .catch((err: any) => rejects(err))
    })
  }

  put<Result = void> (endpoint: string,data: any) : Promise<AxiosResponse<Result>>{
    return new Promise((resolve, rejects) => {
      axios.put<Result>(endpoint, data)
      .then(response => resolve(response))
      .catch((err: any) => rejects(err))
    })
  }

  delete<Result = void> (endpoint: string,data: any) : Promise<AxiosResponse<Result>>{
    return new Promise((resolve, rejects) => {
      axios.delete<Result>(endpoint, data)
      .then(response => resolve(response))
      .catch((err: any) => rejects(err))
    })
  }
}
