import { TableLazyLoadEvent } from 'primeng/table';
import { z } from 'zod';
import { roleAllResponseScheme, roleParamDataTableScheme, roleResponseScheme } from '../shemes/role.scheme';

export type Role = z.infer<typeof roleResponseScheme>;
export type RoleAllReponse = z.infer<typeof roleAllResponseScheme>;
export type RoleParamDataTable = z.infer<typeof roleParamDataTableScheme>;

export type RoleDataTable = { total: number; rows: number; event: TableLazyLoadEvent; loading: boolean; data: Role[] };
