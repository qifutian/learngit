export default function createElement(type, props, ...children) {

  const childElements = [].concat(...children).reduce((result, child) => {
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        result.push(createElement("text", { textContent: child }))
      }
    }
    return result
  }, [])
  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements
  }
}

// export default function createElement(type,props,...children){
//   // 将原有 children 拷贝一份 不要在原有数组上进行操作
//   const childElements = [].concat(...children).map(child => {
//     // 判断 child 是否是对象类型
//     if (child instanceof Object) {
//       // 如果是 什么都不需要做 直接返回即可
//       return child
//     } else {
//       // 如果不是对象就是文本 手动调用 createElement 方法将文本转换为 Virtual DOM
//       return createElement("text", { textContent: child })
//     }
//   })

//   return {
//     type, // 参数type的值，如果是div，type就是:div
//     props, // 节点的属性
//     children: childElements
//   }
// }