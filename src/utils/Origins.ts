export const ALLOWED_ORIGINS: Record<string, string[]> = {
  production: [
    'https://example.com',
    'https://example.com'
  ],
  development: [
    'http://localhost:5173',
    'http://127.0.0.1:8080',
  ]
}
