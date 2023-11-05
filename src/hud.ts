import { Comp, EaseFunc, PosComp, Vec2 } from "kaboom"
import { log, getset, pipe, _, __ } from "./utils"

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
  pipe<{update: ()=>void}>()
    (_, getset("speed", ()=>speed, v=>speed = v))
    (_, getset("value", ()=>current, v=>current = v))
    (_, getset("dist", ()=>dist, v=>dist = v))
    ({
      update: ()=>{
        if ( t >= 1) return t=1
        const t0at = (current - ease(t) * dist) / ( 1 - ease(t) ) // math
        const range = dist - t0at
        t += dt() / speed
        current = ease(t) * range + t0at
      },
    }, __)

type RawSmoothPosComp = Comp & {
  smoothTo: (x: number, y:number)=>void
  smoothBy: (x: number, y:number)=>void
}
type SmoothPosComp = RawSmoothPosComp & {
  speed: Vec2
  distPos: Vec2
}
export const smoothPos = (x: number, y: number, ease: EaseFunc): [PosComp, SmoothPosComp]=>{
  const smoothX = createSmooth({ startAt: x, ease })
  const smoothY = createSmooth({ startAt: y, ease })
  return [
    pos(x,y),
    pipe<RawSmoothPosComp>()
      (_, getset("speed", 
        ()=>vec2(smoothX.speed, smoothY.speed),
        ve=>{
          smoothX.speed = ve.x
          smoothY.speed = ve.y
        }))
      (_, getset("distPos",
        ()=>vec2(smoothX.dist, smoothY.dist),
        ve=>{
          smoothX.dist = ve.x
          smoothY.dist = ve.y
        }))
      ({
        update(){
          smoothX.update()
          smoothY.update()
          this.moveTo(smoothX.value, smoothY.value)
        },
        smoothTo(x, y) {
          smoothX.dist = x
          smoothY.dist = y
        },
        smoothBy(x, y) {
          smoothX.dist += x
          smoothY.dist += y
        },
      },__)
  ]
}

