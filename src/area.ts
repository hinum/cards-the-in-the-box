import { AreaComp, Comp, GameObj } from "kaboom"

export type OneAreaComp = Comp & {
  click: ()=>void,
  hover: ()=>void
  hoverEnd: ()=>void
}
export const oneArea = ():OneAreaComp=>({
  click: ()=>{},
  hover: ()=>{},
  hoverEnd: ()=>{},
  add(this: GameObj<AreaComp | OneAreaComp>) {
    this.onClick(()=>this.click())
    this.onHover(()=>this.hover())
    this.onHoverEnd(()=>this.hoverEnd())
  },
})
export const onceClick = (obj: GameObj<AreaComp>)=>new Promise<void>(resolve=>{
  const ec = obj.onClick(()=>{
    resolve()
    ec.cancel()
  })
})
