import { Comp, EaseFunc, PosComp, Vec2 } from "kaboom"
import { gs, Gs } from "./utils"

const createSmooth = ({
  startAt: current = 0,
  startDist: dist = current,
  ease = easings.linear ,
  speed = 1,
  t = 0
}:{
  startAt?: number
  startDist?: number
  speed?: number
  ease?: EaseFunc
  t?: number
})=>
    ({
      value: gs(()=>current, v=>current = v),
      speed: gs(()=>speed, v=>speed = v),
      dist:  gs(()=>dist, v=>{dist = v; t = t<0.5? t: 1-t}),
      update: ()=>{
        if ( t >= 1) return t=1
        const t0at = (current - ease(t) * dist) / ( 1 - ease(t) ) // math
        const range = dist - t0at
        t += dt() / speed
        current = ease(t) * range + t0at
      },
    })

export type SmoothPosComp = Comp & {
  speed: Gs<number>
  dPos: Gs<Vec2>
  smoothTo: (x: number, y:number)=>void
  smoothBy: (x: number, y:number)=>void
}
export const smoothPos = (x: number, y: number, ease = easings.linear): [PosComp, SmoothPosComp]=>{
  const smoothX = createSmooth({ startAt: x, ease })
  const smoothY = createSmooth({ startAt: y, ease })
  return [
    pos(x,y),
    {
      speed: gs(
        ()=>smoothX.speed.g(),
        ve=>{
          smoothX.speed.s(ve)
          smoothY.speed.s(ve)
        }),
      dPos : gs(
        ()=>vec2(smoothX.dist.g(), smoothY.dist.g()),
        ve=>{
          smoothX.dist.s(ve.x)
          smoothY.dist.s(ve.y)
        }),
      update(){
        smoothX.update()
        smoothY.update()
        this.moveTo(smoothX.value.g(), smoothY.value.g())
      },
      smoothTo(x, y) {
        smoothX.dist.s(x)
        smoothY.dist.s(y)
      },
      smoothBy(x, y) {
        smoothX.dist.s(x)
        smoothY.dist.s(y)
      },
    }
  ]
}

