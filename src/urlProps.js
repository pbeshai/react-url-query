export function urlProp(type, options) {
  return { type, ...options };
}

export function urlString(options) {
  return urlProp('string', options);
}

export function urlNumber(options) {
  return urlProp('number', options);
}

export function urlObject(options) {
  return urlProp('object', options);
}

export function urlArray(options) {
  return urlProp('array', options);
}

export function urlJson(options) {
  return urlProp('json', options);
}

export function urlDate(options) {
  return urlProp('date', options);
}

export function urlBoolean(options) {
  return urlProp('boolean', options);
}
