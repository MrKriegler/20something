export const MONGO_URL = process.env['MONGO_URL'] || 'mongodb://192.168.99.100/20something'; // windows home edition :(
export const MAX_QUESTIONS_COUNT = parseInt(process.env['MAX_QUESTIONS_COUNT']) || 20;
export const API_BASE_ROUTE = process.env['API_BASE_ROUTE'] || "api";
export const API_VERSION = process.env['API_VERSION'] || "v1";
export const LOGGER_LEVEL = process.env['LOGGER_LEVEL'] || "dev";
export const FRONT_END_URL = process.env['FRONT_END_URL'] || "http://localhost:1337";
