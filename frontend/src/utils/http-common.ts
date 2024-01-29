import type { IData } from "@limanmys/frontend-kit"
import type { AxiosInstance, AxiosResponse } from "axios"
import { reactive } from "vue"
import { AxiosClient } from "@limanmys/frontend-kit"

export class HttpClient {
  axiosClient!: AxiosInstance
  isAuthenticated = reactive({
    value: false,
  })
  startLoadingBar = () => {
    const loader = window.$loadingBar as any

    if (!loader.loadingBarRef.value.loading) {
      loader.start()
    }
  }

  constructor(lmntargetFunction = "apiProxy", args?: any) {
    this.axiosClient = new AxiosClient({
      lmntargetFunction: lmntargetFunction,
      ...args,
    }).apiClient
  }
  async get<T = any>(
    url: string,
    data?: IData,
  ): Promise<AxiosResponse<T, any>> {
    window.$loadingBar.start()

    return this.axiosClient.post<T>("", {
      type: "get",
      endpoint: url,
      ...data,
    })
  }

  async post<T = any>(
    url: string,
    data?: IData,
  ): Promise<AxiosResponse<T, any>> {
    window.$loadingBar.start()

    return this.axiosClient.post<T>("", {
      type: "post",
      endpoint: url,
      ...data,
    })
  }

  async put<T = any>(
    url: string,
    data?: IData,
  ): Promise<AxiosResponse<T, any>> {
    window.$loadingBar.start()

    return this.axiosClient.post<T>("", {
      type: "put",
      endpoint: url,
      ...data,
    })
  }

  async patch<T = any>(
    url: string,
    data?: IData,
  ): Promise<AxiosResponse<T, any>> {
    window.$loadingBar.start()

    return this.axiosClient.post<T>("", {
      type: "patch",
      endpoint: url,
      ...data,
    })
  }

  async delete<T = any>(
    url: string,
    data?: IData,
  ): Promise<AxiosResponse<T, any>> {
    window.$loadingBar.start()

    return this.axiosClient.post<T>("", {
      type: "delete",
      endpoint: url,
      ...data,
    })
  }

  async downloadFile(url: string, endpoint: string, data?: IData) {
    window.$loadingBar.start()

    const a = new AxiosClient({}).apiClient

    return a.post(
      "",
      {
        ...data,
        lmntargetFunction: url,
        type: "get",
        endpoint,
      },
      {
        responseType: "blob",
      },
    )
  }

  async php(url: string, data?: IData) {
    window.$loadingBar.start()

    const a = new AxiosClient({}).apiClient

    return a.post("", {
      ...data,
      lmntargetFunction: url,
      type: "post",
    })
  }
}

const http = new HttpClient()

export default http
