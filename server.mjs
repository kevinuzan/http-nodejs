import { createServer } from 'http';

createServer((req, res) => {
  res.write('Gabriel troxao');
  res.end();
}).listen(process.env.PORT);
