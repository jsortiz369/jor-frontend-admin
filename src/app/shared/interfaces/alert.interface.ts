import { z } from 'zod';
import { confirmSchema } from '../schemes/alert.scheme';

export type Confirm = z.infer<typeof confirmSchema>;
