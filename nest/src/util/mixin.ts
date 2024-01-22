export function applyMixins(derivedCtor: any, baseCtor: any[]) {
  baseCtor.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name]
    })
  })
}
