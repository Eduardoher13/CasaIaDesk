import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');

const IMPORT = `import {
  parsePagination,
  wrapPaginated,
} from '../common/pagination/pagination.util';
`;

const FIND_ALL_OLD =
  /  findAll\(@Query\('skip'\) skip = '0', @Query\('take'\) take = '10'\) \{\n    return this\.service\.findAll\(parseInt\(skip\), parseInt\(take\)\);\n  \}/g;

const FIND_ALL_NEW = `  async findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    const { skip: s, take: t } = parsePagination(skip, take);
    return wrapPaginated(await this.service.findAll(s, t), s, t);
  }`;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== 'common') walk(path, files);
    } else if (name.endsWith('.controller.ts')) {
      files.push(path);
    }
  }
  return files;
}

for (const file of walk(ROOT)) {
  let content = readFileSync(file, 'utf8');
  if (!FIND_ALL_OLD.test(content)) {
    FIND_ALL_OLD.lastIndex = 0;
    continue;
  }
  FIND_ALL_OLD.lastIndex = 0;

  if (!content.includes('parsePagination')) {
    const lastImport = content.lastIndexOf("from '@nestjs/common';");
    if (lastImport === -1) continue;
    const insertAt = content.indexOf('\n', lastImport) + 1;
    content =
      content.slice(0, insertAt) + IMPORT + content.slice(insertAt);
  }

  content = content.replace(FIND_ALL_OLD, FIND_ALL_NEW);
  writeFileSync(file, content);
  console.log('Updated', file);
}
