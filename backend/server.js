// Shim de compatibilidad para depuración: carga el servidor TypeScript con opciones CJS
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS',
    moduleResolution: 'Node'
  }
});
require('dotenv').config();
require('./server.ts');


