import { z } from 'zod';

const buttonPropsScheme = z.object({
  label: z.string({ required_error: 'label is requerid', invalid_type_error: 'label type string' }),
  severity: z
    .enum(['success', 'info', 'warn', 'danger', 'help', 'primary', 'secondary', 'contrast'], {
      invalid_type_error: `severity type 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast'`,
    })
    .optional(),
  outlined: z.boolean().optional(),
  icon: z.string().optional(),
  iconPos: z.enum(['left', 'right', 'top', 'bottom']).optional(),
  size: z.enum(['small', 'large']).optional(),
  text: z.boolean().optional(),
  rounded: z.boolean().optional(),
  variant: z.enum(['outlined', 'text']).optional(),
  raised: z.boolean().optional(),
  styleClass: z.string().optional(),
});

const functionScheme = z.any().optional();
export const confirmSchema = z.object({
  message: z.string({ required_error: 'message is requerid', invalid_type_error: 'message type string' }),
  key: z.string({ invalid_type_error: 'key type string' }).optional(),
  icon: z.string({ invalid_type_error: 'icon type string' }).optional(),
  header: z.string({ invalid_type_error: 'header type string' }).optional(),
  accept: functionScheme.refine((_) => _ === undefined || typeof _ === 'function', { message: 'accept type function' }),
  reject: functionScheme.refine((_) => _ === undefined || typeof _ === 'function', { message: 'reject type function' }),
  acceptVisible: z.boolean({ invalid_type_error: 'acceptVisible type boolean' }).optional(),
  rejectVisible: z.boolean({ invalid_type_error: 'rejectVisible type boolean' }).optional(),
  acceptButtonProps: z.object({ ...buttonPropsScheme.shape }, { invalid_type_error: 'acceptButtonProps type object' }),
  rejectButtonProps: buttonPropsScheme.optional(),
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
});
