import { HttpInterceptorFn } from '@angular/common/http';

export const timezoneFnInterceptor: HttpInterceptorFn = (req, next) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const modifiedReq = req.clone({ setHeaders: { Timezone: timeZone } });
  return next(modifiedReq);
};
