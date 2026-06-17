import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve('dist/resume-portal-angular/browser');
const port = Number(process.env.PORT ?? 4300);
const host = process.env.HOST ?? '127.0.0.1';
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.ico', 'image/x-icon'],
  ['.pdf', 'application/pdf']
]);

createServer(async (request, response) => {
  try {
    const pathName = decodeURIComponent((request.url ?? '/').split('?')[0]);
    let filePath = resolve(join(root, pathName === '/' ? 'index.html' : pathName));
    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) filePath = join(root, 'index.html');
    } catch {
      filePath = join(root, 'index.html');
    }
    response.writeHead(200, { 'Content-Type': types.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream' });
    response.end(await readFile(filePath));
  } catch {
    response.writeHead(500);
    response.end('Server error');
  }
}).listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
