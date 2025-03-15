import type { FromSource, MainTag, StatusType } from '~/shared/types/blog'

type TagMap = {
  [k in MainTag]: string
}

type FromMap = {
  [k in FromSource]: string
}

type StatusMap = {
  [k in StatusType]: string
}

export const formatDate = (date_time: Date): string => {
  const date = new Date(date_time)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const pad = (num: number) => num.toString().padStart(2, '0')

  return `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export const getMainTagClass = (tag: MainTag): string => {
  const tagMap: TagMap = {
    生活: 'badge-success',
    技术: 'badge-info',
    知识: 'badge-primary',
    整合: 'badge-neutral',
    采集: 'badge-warning',
    综合: 'badge-accent',
    '': 'opacity-40',
  }

  return tagMap[tag]
}

export const getFromContent = (from: FromSource[]): string => {
  const fromMap: FromMap = {
    CIB: '中文独立博客列表',
    BoYouQuan: '博友圈',
    BlogFinder: 'BlogFinder',
    BKZ: '优秀个人独立博客导航',
    Travellings: '开往',
    WebSubmit: '网站提交',
    AdminAdd: '管理员添加',
    LinkPageSearch: '友链发现',
    OldData: '旧版本数据',
  }
  return from.map((item) => fromMap[item]).join('<br/>')
}

export const getStatusClass = (status: StatusType): string => {
  const statusMap: StatusMap = {
    OK: 'badge-success',
    SSLERROR: 'badge-warning',
    ERROR: 'badge-error',
  }
  return statusMap[status]
}
