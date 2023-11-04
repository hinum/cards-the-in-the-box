import { Comp, GameObj, PosComp, Vec2 } from "kaboom"
import { getset } from "./utils"

type valuesShema<name extends string> = Record<name,{
  current: number
  dist: number
}>

type SmoothComp<valNames extends string> = Comp & Record<valNames, number> & {t: number}

export const smooth = <valNames extends string>(values: valuesShema<valNames>,ease: (t:number)=>number = easings.linear): SmoothComp<valNames>=>{
  const tvalues = Object.values(values)
  let t = 0

  return {
    update() {
      if ( (t + dt()) >= 1) return t = 1
      let dx = ease(t)-ease(t-dt())
      tvalues.forEach(value=> value.current += dx*value.dist)
    },
    ...getset("t", ()=>t, v=>t=v),
    ...Object.keys(values)
        .reduce((pv,key)=>({
          ...pv,
          ...getset( key,
                ()=>values[key].current,
                v =>values[key].dist = v)
        }),{} as Record<valNames, number>)
  }
}

type SmoothPosComp = [
  PosComp,
  SmoothComp<"x" | "y">,
  Comp & {
    smoothTo: (this: GameObj<SmoothPosComp[number]>,x:number, y:number)=>void
    smoothBy: (this: GameObj<SmoothPosComp[number]>,x:number, y:number)=>void
  }
]
export const smoothPos = (vec: Vec2, ease: (t:number)=>number = easings.linear): SmoothPosComp=>{
  return [
    pos(vec),
    smooth({
      x: {current: vec.x, dist: vec.x},
      y: {current: vec.y, dist: vec.y}
    },ease),
    {
      update(){ this.moveTo(vec2(this.x, this.y)) },
      smoothBy(x,y){ this.smoothTo(this.x + x, this.y + y) },
      smoothTo(x,y){
        this.x = x
        this.y = y
        this.t = 1-this.t
      }
    }
  ]
}
