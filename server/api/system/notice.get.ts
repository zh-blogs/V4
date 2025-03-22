import { v4 as uuidv4 } from 'uuid'
import type { NoticeList } from '~/shared/types/setting'
// TODO
export default defineEventHandler(async () => {
  const noticeList: NoticeList = [
    {
      id: uuidv4().toString(),
      message: '关于新版本站点正式启用的通知',
      title:
        '各位访客大家好，本项目的新版本站点正式启用，如果您在使用过程中有需要反馈的意见或者建议，欢迎前往<a href="https://github.com/zh-blogs/blog-daohang">项目仓库</a>进行反馈。',
    },
  ]
  return noticeList
})
