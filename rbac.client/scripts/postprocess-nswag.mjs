import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/api/generated/rbac.api.ts');
let source = fs.readFileSync(filePath, 'utf8');
const banner = '// @ts-nocheck\n';

if (!source.startsWith(banner)) {
  source = `${banner}${source}`;
}

source = source.replaceAll(
  'const _responseText = response.data;',
  'const _responseText = response.data; void _responseText;',
);

fs.writeFileSync(filePath, source);
