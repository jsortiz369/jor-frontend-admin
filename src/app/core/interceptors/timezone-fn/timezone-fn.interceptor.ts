import { HttpInterceptorFn } from '@angular/common/http';

export const timezoneFnInterceptor: HttpInterceptorFn = (req, next) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formar = new Intl.DateTimeFormat('en-US', {
    timeZone: timeZone,
    timeZoneName: 'shortOffset',
  });

  const timeZoneName = formar.formatToParts(new Date()).find((p) => p.type === 'timeZoneName')?.value;
  let offset = timeZoneName?.replace('GMT', '');
  if (!offset?.includes(':')) {
    offset = offset + ':00';
  }

  const modifiedReq = req.clone({ setHeaders: { offset: 'prueba' } });
  return next(modifiedReq);
};
