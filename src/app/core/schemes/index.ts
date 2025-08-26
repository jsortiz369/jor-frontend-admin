import { z } from 'zod';

export const sortOrderScheme = z.enum(['ASC', 'DESC'], { errorMap: () => ({ message: `sortOrder must be one of: ASC | DESC` }) });
export const pageScheme = z.number({ invalid_type_error: 'page type number' }).min(1, { message: 'page min is 1' });
export const limitScheme = z
  .number({ invalid_type_error: 'limit type number' })
  .min(1, { message: 'limit min is 1' })
  .max(100, { message: 'limit max 100' });
export const searchScheme = z.string({ invalid_type_error: 'search type string' });

export const metaScheme = z.object({
  total: z.number({ invalid_type_error: 'total type number' }).min(1, { message: 'total min is 1' }),
  page: pageScheme,
  lastPage: z.number({ invalid_type_error: 'lastPage type number' }).min(1, { message: 'lastPage min is 1' }),
  filter: z.number({ invalid_type_error: 'filter type number' }).min(0, { message: 'filter min is 1' }).optional(),
});

export const filtersScheme = z.object({
  value: z.any(),
  matchMode: z.enum(['startsWith', 'contains', 'notContains', 'endsWith', 'equals', 'notEquals'], {
    errorMap: () => ({ message: `'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals'` }),
  }),
});
