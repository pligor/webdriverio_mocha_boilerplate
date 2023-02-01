// this is not applicable everywhere, this file is an example of how to intercept methods of a class using Proxy

const withPrintXpath = (obj) => new Proxy(obj, {
//https://javascript.plainenglish.io/javascript-how-to-intercept-function-and-method-calls-b9fd6507ff02
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return new Proxy(target[prop], {
        apply: (target, thisArg, argumentsList) => {
          // fn(prop, argumentsList);
          const res = Reflect.apply(target, thisArg, argumentsList);
          if(res instanceof Component) {
            console.log('xpath', res.currentPath)
          }
          return res
        }
      })
    } else {
      console.log(`Intercepting get to method: ${prop}`);
      const getobj = Reflect.get(target, prop);
      if(getobj instanceof Component) {
        console.log('xpath', getobj.currentPath)
      }
      return getobj
    }
  }
})

module.exports = {
    withPrintXpath,
}
