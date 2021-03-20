import diff from "./diff"

export default function render(
  virtualDOM,
  container,
  oldDOM = container.firstChild
) {
  diff(virtualDOM, container, oldDOM)
}


// export default function render(virtualDOM, container, oldDOM){
//   // 调用diff方法进行比对，判断存在不存在oldDOM
//   if(oldDOM){

//   }
// }