import { config } from "./config/config.js"
import { ALLOWED_ORIGINS } from "./utils/Origins.js"

export const ALLOWED_HEADERS = ['Content-Type', 'Authorization']

export const SWAGGER_OPTIONS = {
  swaggerOptions: {
    docExpansion: 'none'
  }
}

export const RATE_LIMIT_SETTINGS = {
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many login attempts from this IP, please try again later.'
}


export const getCORS = (): Record<string, any> => {
  if (config.NODE_ENV === 'development') {
    return {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ALLOWED_HEADERS,
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
  }

  return {
    origin: (origin: string | undefined, callback: (error: Error | null, status?: boolean) => void) => {
      const environment = process.env?.NODE_ENV ?? 'development'

      const allowedOriginsForEnv = ALLOWED_ORIGINS[environment] ?? []
      const isValidOrigin: boolean = Boolean(origin) && allowedOriginsForEnv.includes(origin ?? '')

      if (isValidOrigin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ALLOWED_HEADERS
  }
}
