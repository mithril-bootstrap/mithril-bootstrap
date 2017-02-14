// based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
export const merge = (target, concatKeys, ...args) => {
  if (target == null) {
    throw new TypeError('Cannot convert null or undefined to object')
  }
  var concatKeys = [].concat(concatKeys)
  var result = Object(target)

  for (var index = 0; index < args.length; ++index) {
    let next = args[index]

    if (next != null) {
      for (var key in next) {
        if (Object.prototype.hasOwnProperty.call(next, key)) {
          if (concatKeys.indexOf(key) != -1 && typeof result[key] === 'string') {
            result[key] = result[key] ? `${ result[key] } ${ next[key] }` : next[key]
          } else {
            result[key] = next[key]
          }
        }
      }
    }
  }
  return result
}
