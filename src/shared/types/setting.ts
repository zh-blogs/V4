// TODO
export interface Notice {
  id: string
  message: string
  title: string
  prompt?: boolean
}

export type NoticeList = Notice[] | null
