import { z } from 'zod';

const severity = ['success', 'info', 'warn', 'danger', 'help', 'primary', 'secondary', 'contrast'];
const iconPos = ['left', 'right', 'top', 'bottom'];
const size = ['small', 'large'];
const variant = ['outlined', 'text'];
const buttonPropsScheme = z.object({
  label: z.string({ required_error: 'label is requerid', invalid_type_error: 'label type string' }),
  icon: z.string({ invalid_type_error: 'icon type string' }).optional(),
  outlined: z.boolean({ invalid_type_error: 'outlined type boolean' }).optional(),
  text: z.boolean({ invalid_type_error: 'text type boolean' }).optional(),
  rounded: z.boolean({ invalid_type_error: 'rounded type boolean' }).optional(),
  raised: z.boolean({ invalid_type_error: 'raised type boolean' }).optional(),
  styleClass: z.string({ invalid_type_error: 'styleClass type string' }).optional(),
  severity: z
    .string()
    .refine((_) => !_ || severity.includes(_), { message: `severity must be one of: ${severity.join(' | ')}` })
    .optional(),
  iconPos: z
    .string()
    .refine((_) => !_ || iconPos.includes(_), { message: `iconPos must be one of: ${iconPos.join(' | ')}` })
    .optional(),
  size: z
    .string()
    .refine((_) => !_ || size.includes(_), { message: `size must be one of: ${size.join(' | ')}` })
    .optional(),
  variant: z
    .string()
    .refine((_) => !_ || variant.includes(_), { message: `variant must be one of: ${variant.join(' | ')}` })
    .optional(),
});

const functionScheme = z.any().optional();
export const confirmSchema = z
  .object({
    message: z.string({ required_error: 'message is requerid', invalid_type_error: 'message type string' }),
    key: z.string({ invalid_type_error: 'key type string' }).optional(),
    icon: z.string({ invalid_type_error: 'icon type string' }).optional(),
    header: z.string({ invalid_type_error: 'header type string' }).optional(),
    accept: functionScheme.refine((val) => val === undefined || typeof val === 'function', { message: 'accept type function' }),
    reject: functionScheme.refine((val) => val === undefined || typeof val === 'function', { message: 'reject type function' }),
    acceptVisible: z.boolean({ invalid_type_error: 'acceptVisible type boolean' }).optional(),
    rejectVisible: z.boolean({ invalid_type_error: 'rejectVisible type boolean' }).optional(),
    acceptButtonProps: z
      .object({ ...buttonPropsScheme.shape }, { invalid_type_error: 'acceptButtonProps type object' })
      .strict({
        message: 'Additional fields are not allowed. Check the keys sent',
      })
      .optional(),
    rejectButtonProps: z
      .object({ ...buttonPropsScheme.shape }, { invalid_type_error: 'rejectButtonProps type object' })
      .strict({
        message: 'Additional fields are not allowed. Check the keys sent',
      })
      .optional(),
  })
  .strict({
    message: 'Additional fields are not allowed. Check the keys sent',
  });

//acceptLabel: z.string().optional(),
//rejectLabel: z.string().optional(),
//acceptIcon: z.string().optional(),
//rejectIcon: z.string().optional(),
//blockScroll: z.boolean().optional(),
//closeOnEscape: z.boolean().optional(),
//dismissableMask: z.boolean().optional(),
//defaultFocus: z.string().optional(),
//acceptButtonStyleClass: z.string().optional(),
//rejectButtonStyleClass: z.string().optional(),
//target: z.instanceof(EventTarget).optional(),
//rejectEvent?: EventEmitter<any>;
// closeButtonProps?: any;
// closable?: boolean;
// position?: string;
