import * as http from 'http';
import { GameWebSocketServer } from './websockets/GameWebsockets'
import debug from 'debug';
import Server from './server';
import {FRONT_END_URL} from '@20something/lib/common'
debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3001);
Server.set('port', port);
const socketServer = new GameWebSocketServer();
const server = http.createServer(Server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
const io = require('socket.io')(server, {
  origins: [FRONT_END_URL, 'http://localhost:3000'],
  path: '/ws'
});
io.of('/games')
io.on('connection',(socket: any) => socketServer.onSocketConnection(io, socket));

/**
 * Normalize address port
 *
 * @param  {number|string} val
 * @returns number
 */
function normalizePort(val: number | string): number | string | boolean {
    let port: number = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

/**
 * Catch node errors for specific well known
 * errors.
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * We are alive
 */
function onListening(): void {
    let addr = server.address();
    let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
