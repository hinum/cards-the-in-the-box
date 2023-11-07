import { Comp, EaseFunc, OpacityComp, PosComp, Vec2 } from "kaboom"
import { gs, Gs, save,mapf } from "./utils"

type SmoothObj = ReturnType<typeof createSmooth>
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
    t: gs(()=>t, v=>t=v),
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
  smoothTo: (x: number, y:number, speed: number)=>void,
  smoothBy: (x: number, y:number, speed: number)=>void
}
export const smoothPos = (x: number, y: number, ease = easings.linear): [PosComp, SmoothPosComp]=>{
  const smoothX = createSmooth({ startAt: x, ease })
  const smoothY = createSmooth({ startAt: y, ease })
  const mapTo = <out = any>()=>save((fn: (o:SmoothObj)=>out)=>mapf(fn)([smoothX,smoothY]))
  return [
    pos(x,y),
    {
      speed: gs(
        ()=>smoothX.speed.g(),
        ve=>mapTo()(o=>o.speed.s(ve))),
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
      smoothTo(x, y, speed = smoothX.speed.g()) {
        smoothX.dist.s(x)
        smoothY.dist.s(y)
        mapTo()(o=>o.speed.s(speed))
      },
      smoothBy(x, y, speed = smoothX.speed.g()) {
        smoothX.dist.s(x)
        smoothY.dist.s(y)
        mapTo()(o=>o.speed.s(speed))
      },
    }
  ]
}

export type SmoothOpacityComp = Comp & {
  smoothHide: (speed: number)=>void,
  smoothShow: (speed: number)=>void
}
export const smoothOpacity = (opac: number, ease= easings.linear):[OpacityComp, SmoothOpacityComp]=>{
  const opacitySmooth = createSmooth({ startAt: opac, ease})
  return [
    opacity(opac),
    {
      update(){
        opacitySmooth.update()
        this.opacity = opacitySmooth.value.g()
      },
      smoothHide: (speed)=>{
        opacitySmooth.dist.s(0)
        opacitySmooth.speed.s(speed)
      },
      smoothShow: (speed)=>{
        opacitySmooth.dist.s(1)
        opacitySmooth.speed.s(speed)
      }
    }
  ]
}
