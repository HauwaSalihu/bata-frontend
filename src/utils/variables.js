export const BASE_URL = import.meta.env.VITE_IS_PRODUCTION === 'true'
? import.meta.env.VITE_BASE_URL_PROD
: import.meta.env.VITE_APP_BASE_URL_DEV;
;