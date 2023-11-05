import { Comp, EaseFunc, Vec2 } from "kaboom"

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
})=>({
    update: ()=>{
      if ( t >= 1) return t=1
      const t0at = (current - ease(t) * dist) / ( 1 - ease(t) ) // math
      const range = dist - t0at
      t += dt() / speed
      current = ease(t) * range + t0at
    },
    get speed(){ return speed },
    set speed(v: number){ speed = v },
    get value(){ return current },
    set value(v: number){
      dist = v
      t = t < 0.5? t: 1-t
    }
  })

type smoothPosComp = Comp & {
  smoothTo: (x: number, y:number)=>void
  smoothBy: (x: number, y:number)=>void
  speed: Vec2
}
export const smoothPos = (x: number, y: number, ease: EaseFunc)=>{
  const smoothX = createSmooth({ startAt: x, ease })
  const smoothY = createSmooth({ startAt: y, ease })
  return [
    pos(x,y),
    {
      get speed(){ return vec2(smoothX.speed,smoothY.speed) },
      set speed(vec: Vec2){ 
        smoothX.speed = vec.x
        smoothY.speed = vec.y
      },
      update(){
        smoothX.update()
        smoothY.update()
        this.moveTo(smoothX.value, smoothY.value)
      },
      smoothTo(x, y) {
        smoothX.value = x
        smoothY.value = y
      },
      smoothBy(x, y) {
        smoothX.value += x
        smoothY.value += y
      },
    } as smoothPosComp
  ]
}

