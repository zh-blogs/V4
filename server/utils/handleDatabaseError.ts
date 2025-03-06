import type { DatabaseError } from 'pg-protocol'
import { PG_ERRORS } from '../db/error'
import Result from '../result'

export interface DatabaseErrorResult {
  success: boolean
  error: string
  statusCode?: number
  blog?: { name: string; url: string }
}

export const handleDatabaseError = (
  e: DatabaseError,
  options?: {
    includeMetadata?: boolean
    blog?: { name: string; url: string }
  },
): DatabaseErrorResult => {
  const errorDetails = {
    code: e.code,
    detail: e.detail,
    constraint: e.constraint,
    table: e.table,
    schema: e.schema,
  }

  console.error('数据库错误:', errorDetails)

  const getField = (constraint?: string) => {
    if (!constraint) return '记录'
    return constraint.includes('url')
      ? 'URL'
      : constraint.includes('name')
        ? '名称'
        : '记录'
  }

  let result: DatabaseErrorResult

  switch (e.code) {
    case PG_ERRORS.UNIQUE_VIOLATION: {
      const field = getField(e.constraint)
      result = {
        success: false,
        error: `该${field}已存在`,
        statusCode: 409,
      }
      break
    }
    case PG_ERRORS.NOT_NULL_VIOLATION:
      result = {
        success: false,
        error: `缺少必要字段: ${e.column}`,
        statusCode: 400,
      }
      break
    default:
      result = {
        success: false,
        error: '数据库操作失败',
        statusCode: 500,
      }
  }

  if (options?.includeMetadata && options.blog) {
    result.blog = options.blog
  }

  return result
}

// Helper method for API endpoints
export const handleDatabaseErrorResponse = (
  e: DatabaseError,
  options?: { includeMetadata?: boolean; blog?: { name: string; url: string } },
) => {
  const result = handleDatabaseError(e, options)
  return Result.error(result.error, result.statusCode || 500)
}
