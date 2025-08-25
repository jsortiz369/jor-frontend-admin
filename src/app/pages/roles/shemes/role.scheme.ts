import { z } from 'zod';
import { filtersScheme, limitScheme, metaScheme, pageScheme, sortOrderScheme } from '../../../core/schemes';

export const roleParamDataTableScheme = z.object({
  sort: z
    .enum(['name', 'createdAt', 'updatedAt', 'status'], {
      errorMap: () => ({ message: `sort must be one of: name | createdAt | updatedAt | status` }),
    })
    .default('createdAt'),
  sortOrder: sortOrderScheme.default('ASC').optional(),
  page: pageScheme.default(1).optional(),
  limit: limitScheme.default(10).optional(),
  filters: z
    .object({
      global: filtersScheme.optional(),
    })
    .optional(),
});

export const roleResponseScheme = z.object({
  _id: z.string({ invalid_type_error: '_id type string' }).uuid({ message: '_id type uuid' }),
  name: z.string({ invalid_type_error: 'name type string' }).min(3, { message: 'name min 3' }).max(50, { message: 'name max 50' }),
  description: z.string({ invalid_type_error: 'description type string' }).max(5000, { message: 'name max 5000' }).optional(),
  status: z.enum(['0', '1'], { errorMap: () => ({ message: `status must be one of: 0 | 1` }) }),
  createdAt: z.string({ invalid_type_error: 'createdAt type string' }).datetime({ message: 'createdAt type datetime' }),
  updatedAt: z.string({ invalid_type_error: 'createdAt type string' }).datetime({ message: 'createdAt type datetime' }).optional(),
});

export const roleAllResponseScheme = z.object({
  meta: metaScheme,
  data: z.array(roleResponseScheme),
});
