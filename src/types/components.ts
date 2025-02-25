export interface AlertOptions {
  alertIconVisible?: boolean,
  closeIconVisible?: boolean,

  title?: string,
  message: string,
  type?: 'info' | 'success' | 'warning' | 'error' | 'tips',
  duration?: number
}