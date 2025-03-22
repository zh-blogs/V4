class Result<T> {
  private code: number
  private message: string
  private data: T | null

  constructor(code: number, message: string, data: T | null = null) {
    if (typeof code !== 'number') {
      throw new Error('The code value must be of number type')
    }
    if (typeof message !== 'string') {
      throw new Error('The message value must be of string type')
    }
    this.code = code
    this.message = message
    this.data = data
  }

  static success<T>(data?: T | null, message: string = '操作成功') {
    return new Result<T>(200, message, data ?? null)
  }

  static error<T>(
    message: string = '操作失败',
    code: number = 500,
    data?: T | null,
  ) {
    return new Result<T>(code, message, data ?? null)
  }

  static create<T>(code: number, message: string, data?: T | null) {
    return new Result<T>(code, message, data ?? null)
  }

  isSuccess(): boolean {
    return this.code === 200
  }

  isError(): boolean {
    return !this.isSuccess()
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    }
  }
}

export default Result

export interface ResultType<T> {
  code: number
  message: string
  data: T | null
}
