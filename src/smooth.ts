import { create } from "domain"
import { Comp, GameObj, PosComp, Vec2 } from "kaboom"

const createSmooth = (opt:{
  current: number,
  dist: number,
  t: number,
  ease: (t: number)=>number,
})=>({
    update(){
      const {t, current, dist, ease} = this
      if ( t >= 1 ) return this.t = 1
      const t0at = (current - dist*ease(t)) / (ease(t) + 1)
      const range = dist + t0at
      this.t += dt()
      this.current = ease(t + dt()) * range + t0at
    }, ...opt
  })

export type SmoothPosComp = Comp & {
  dPos: Vec2,
  smootherX: ReturnType<typeof createSmooth>
  smootherY: ReturnType<typeof createSmooth>
  goTo: (this: GameObj<SmoothPosComp & PosComp>, vec: Vec2)=>void
}
export const smoothPos = (vec: Vec2, ease=easings.easeInOutQuad): SmoothPosComp=>({
  id: "smoothPos",
  require: ["pos"],
  smootherX: createSmooth({
    current: vec.x,
    dist: vec.x,
    t: 0, ease
  }),
  smootherY: createSmooth({
    current: vec.y,
    dist: vec.y,
    t: 0, ease
  }),
  update(this: GameObj<PosComp & SmoothPosComp>){
    this.smootherX.current = this.pos.x
    this.smootherY.current = this.pos.y
    this.smootherX.update()
    this.smootherY.update()
    this.moveTo(
      this.smootherX.current,
      this.smootherY.current,
    )
  },
  goTo(vec){
    this.moveTo(vec)
    this.smootherX.t = 1
    this.smootherY.t = 1
  },
  set dPos(v){
    this.smootherX.current = v.x
    this.smootherY.current = v.y
  },
  get dPos(){
    return vec2(
      this.smootherX.current,
      this.smootherY.current,
    )
  }
})