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
  play: ()=>void,
  smoothBy: (vec: Vec2)=>void
  smoothTo: (vec: Vec2)=>void
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
  play(){
    this.smootherX.t = this.smootherX.t < 0.5? this.smootherX.t: 1-this.smootherX.t
    this.smootherY.t = this.smootherY.t < 0.5? this.smootherY.t: 1-this.smootherY.t
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
  },
  smoothTo(ve){
    this.dPos = ve
    this.play()
  },
  smoothBy(ve){
    this.dPos = this.dPos.add(ve)
    this.play()
  }
})

export type SmoothOpacity = Comp & {
  smootherOpac: ReturnType<typeof createSmooth>
  smoothOpac: (opacity: number)=>void
}
export const smoothOpacity = (opac: number, ease = easings.easeInOutQuad): SmoothOpacity=>({
  smootherOpac: createSmooth({
    current: opac,
    dist: opac, t:1, ease
  }),
  update() {
    this.smootherOpac.update()
  },
  smoothOpac(opacity) {
    this.smootherOpac.dist = opacity
    this.smootherOpac.t = this.smootherOpac.t < 0.5? this.smootherOpac.t: 1-this.smootherOpac.t
  },
})
