import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');

const SKIP_SERVICES = new Set([
  'products.service.ts',
  'professionals.service.ts',
  'companies.service.ts',
  'users.service.ts',
]);

const CREATED_AT_ENTITIES = new Set([
  'Delivery',
  'Transaction',
  'Message',
  'Conversation',
  'PostComment',
  'CommunityPost',
  'Review',
  'ServiceOffer',
  'ServiceRequest',
  'Order',
  'User',
]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== 'common') walk(path, files);
    } else if (name.endsWith('.service.ts')) {
      files.push(path);
    }
  }
  return files;
}

function toAlias(entityName) {
  return entityName.charAt(0).toLowerCase() + entityName.slice(1);
}

function patchService(file) {
  const base = file.split('/').pop();
  if (SKIP_SERVICES.has(base)) return false;

  let content = readFileSync(file, 'utf8');
  const entityMatch = content.match(
    /import \{ (\w+) \} from '\.\/entities\/[^']+\.entity';/,
  );
  if (!entityMatch) return false;

  const entity = entityMatch[1];
  const alias = toAlias(entity);

  const oldFindAll =
    /  findAll\(skip = 0, take = 10\) \{\n    return this\.repository\.findAndCount\(\{ skip, take(?:, withDeleted: false)? \}\);\n  \}/;

  if (!oldFindAll.test(content)) {
    oldFindAll.lastIndex = 0;
    return false;
  }
  oldFindAll.lastIndex = 0;

  if (!content.includes('PaginationQueryDto')) {
    const utilImport = content.includes('pagination.util')
      ? ''
      : `import { toPaginatedResult } from '../common/pagination/pagination.util';\n`;
    const dtoImport = `import { PaginationQueryDto } from '../common/dto/pagination-query.dto';\n`;
    const insertAfter = content.indexOf("from 'typeorm';") + "from 'typeorm';".length + 1;
    content =
      content.slice(0, insertAfter) +
      dtoImport +
      utilImport +
      content.slice(insertAfter);
  }

  const order = CREATED_AT_ENTITIES.has(entity)
    ? `    qb.orderBy('${alias}.created_at', 'DESC').addOrderBy('${alias}.id', 'DESC');`
    : `    qb.orderBy('${alias}.id', 'DESC');`;

  const newFindAll = `  async findAll(filters: PaginationQueryDto) {
    const { limit = 10, offset = 0 } = filters;

    const qb = this.repository
      .createQueryBuilder('${alias}')
      .take(limit)
      .skip(offset);

${order}

    const [data, total] = await qb.getManyAndCount();
    return toPaginatedResult(data, total, limit, offset);
  }`;

  content = content.replace(oldFindAll, newFindAll);
  writeFileSync(file, content);
  return true;
}

function patchController(file) {
  let content = readFileSync(file, 'utf8');
  if (!content.includes('parsePagination')) return false;

  const isProducts = file.includes('/products/');
  const isCompaniesStorefront = file.includes('/companies/');

  content = content.replace(
    /import \{\n  parsePagination,\n  wrapPaginated,\n\} from '\.\.\/common\/pagination\/pagination\.util';\n/g,
    '',
  );
  content = content.replace(
    /import \{\n  parsePagination,\n  wrapPaginated,\n\} from '\.\.\/common\/pagination\/pagination\.util';\n\n/g,
    '',
  );

  if (!content.includes('PaginationQueryDto') && !content.includes('FindProductsDto')) {
    const dtoPath = isProducts
      ? "./dto/find-products.dto"
      : '../common/dto/pagination-query.dto';
    const dtoName = isProducts ? 'FindProductsDto' : 'PaginationQueryDto';
    const dtoImport = `import { ${dtoName} } from '${dtoPath}';\n`;
    const insertAt = content.indexOf("from '@nestjs/common';") + "from '@nestjs/common';".length + 1;
    content = content.slice(0, insertAt) + dtoImport + content.slice(insertAt);
  }

  content = content.replace(
    /  async findAll\(@Query\('skip'\) skip\?: string, @Query\('take'\) take\?: string\) \{\n    const \{ skip: s, take: t \} = parsePagination\(skip, take\);\n    return wrapPaginated\(await this\.service\.findAll\(s, t\), s, t\);\n  \}/g,
    `  findAll(@Query() filters: PaginationQueryDto) {\n    return this.service.findAll(filters);\n  }`,
  );

  if (isProducts) {
    content = content.replace(
      /  async findActive\(\n    @Query\('skip'\) skip\?: string,\n    @Query\('take'\) take\?: string,\n    @Query\('search'\) search\?: string,\n  \) \{\n    const \{ skip: s, take: t \} = parsePagination\(skip, take\);\n    return wrapPaginated\(await this\.service\.findActive\(s, t, search\), s, t\);\n  \}/g,
      `  findActive(@Query() filters: FindProductsDto) {\n    return this.service.findActive(filters);\n  }`,
    );
    content = content.replace(
      /  async findByCompany\(\n    @Param\('companyId'\) companyId: string,\n    @Query\('skip'\) skip\?: string,\n    @Query\('take'\) take\?: string,\n  \) \{\n    const \{ skip: s, take: t \} = parsePagination\(skip, take\);\n    return wrapPaginated\(\n      await this\.service\.findByCompany\(companyId, s, t\),\n      s,\n      t,\n    \);\n  \}/g,
      `  findByCompany(\n    @Param('companyId') companyId: string,\n    @Query() filters: PaginationQueryDto,\n  ) {\n    return this.service.findByCompany(companyId, filters);\n  }`,
    );
    if (!content.includes("PaginationQueryDto } from '../common/dto/pagination-query.dto'")) {
      content = content.replace(
        "import { FindProductsDto } from './dto/find-products.dto';",
        "import { PaginationQueryDto } from '../common/dto/pagination-query.dto';\nimport { FindProductsDto } from './dto/find-products.dto';",
      );
    }
  }

  if (file.includes('/professionals/')) {
    content = content.replace(
      /  async findAvailable\(\n    @Query\('skip'\) skip\?: string,\n    @Query\('take'\) take\?: string,\n  \) \{\n    const \{ skip: s, take: t \} = parsePagination\(skip, take\);\n    return wrapPaginated\(await this\.service\.findAvailable\(s, t\), s, t\);\n  \}/g,
      `  findAvailable(@Query() filters: PaginationQueryDto) {\n    return this.service.findAvailable(filters);\n  }`,
    );
  }

  if (isCompaniesStorefront) {
    content = content.replace(
      /  getStorefront\(\n    @Param\('id'\) id: string,\n    @Query\('skip'\) skip\?: string,\n    @Query\('take'\) take\?: string,\n  \) \{\n    const \{ skip: s, take: t \} = parsePagination\(skip, take\);\n    return this\.service\.getStorefront\(id, s, t\);\n  \}/g,
      `  getStorefront(@Param('id') id: string, @Query() filters: PaginationQueryDto) {\n    return this.service.getStorefront(id, filters);\n  }`,
    );
  }

  if (content.includes('parsePagination')) {
    console.warn('Still has parsePagination:', file);
    return false;
  }

  writeFileSync(file, content);
  return true;
}

function walkControllers(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== 'common') walkControllers(path, files);
    } else if (name.endsWith('.controller.ts')) {
      files.push(path);
    }
  }
  return files;
}

for (const file of walk(ROOT)) {
  if (patchService(file)) console.log('Service', file);
}

for (const file of walkControllers(ROOT)) {
  if (patchController(file)) console.log('Controller', file);
}
