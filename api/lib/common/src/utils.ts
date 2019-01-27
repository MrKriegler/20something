import { Response } from 'express';

export function withCb<T>(fn: (cb: (err: any, ret?: T) => void) => void): Promise<T> {
  return new Promise<T>((resolve, reject) => fn((err, ret) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(ret);
  }));
}

export async function runSocketRequest<T>(socket: any, topic: string, fn: () => Promise<T>) {
  try {
    await fn();
  } catch (e) {
    const { statusCode, message, status } = e;
    const error = {
      statusCode,
      message,
      status
    }
    console.log(error);
    socket.emit(topic, { data: error });
  }
}

export async function runRequest<T>(res: Response, fn: () => Promise<T>) {
  try {
    const result = await fn();
    res.status(200).json({ data: result });
  } catch (e) {
    const { statusCode, message, status } = e;
    const error = {
      statusCode,
      message,
      status
    }
    res.status(statusCode || 500).json(error);
  }
}