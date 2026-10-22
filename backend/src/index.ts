import { server } from './server/Server.js';

server.listen(process.env.PORT || 5555, () => console.log('Conecta ativo! '));
