import type { JQueryStatic } from "@types/jquery"

export {}
declare global {
  interface ICustomRequestData {
    token: string
    locale: string
  }
  interface Window {
    $message: import("naive-ui").MessageApi
    $dialog: import("naive-ui").DialogApi
    $notification: import("naive-ui").NotificationApi
    $loadingBar: import("naive-ui").LoadingBarApi
    customRequestData: ICustomRequestData
    $can: any
    $: JQueryStatic
    upload: any
    start: any
    getServerIp: any
  }
}
