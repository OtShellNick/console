/**
 * Created by victor on 3/29/17.
 */
export function get(name: string) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function set(name: string, value: any, options: any) {
  options = options || {
    path: '/',
  };

  let { expires } = options;

  if (expires === undefined) {
    expires = new Date();
    expires.setDate(expires.getDate() + 7);
  }
  if (typeof expires === 'number' && expires) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = `${name}=${value}`;

  Object.keys(options).forEach((propName) => {
    updatedCookie += `; ${propName}`;
    const propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function del(name: string) {
  set(name, '', { expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT') });
}
