import * as os from 'os';

export interface IErrorDefinition {
  statusCode: number;
  status: string;
}

export function declareError(statusCode: number, status: string): IErrorDefinition {
  return { statusCode, status };
}

export const ERRORS = {
  EINVALID: declareError(400, 'E-INVALID'),
  ENOTFOUND: declareError(404, 'E-NOTFOUND'),
  EOTHER: declareError(500, 'E-OTHER')
};


export function throwError(def: IErrorDefinition, message: string, reason?: any): never {
  throw constructError(def, message, reason);
}

export function constructError(def: IErrorDefinition, message: string, reason?: any) {
  return {
    statusCode: def.statusCode || 500,
    status: def.status,
    message
  };
}
