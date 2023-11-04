import { Comp, PosComp, GameObj, Vec2 } from "kaboom";

export type SmoothComp = Comp & {
  destination: Vec2,
  smoothMoveTo: (dist: Vec2)=>void
  smoothMoveBy: (dist: Vec2)=>void
}
export const smoothPos = (): SmoothComp=>({
  id: "smooth",
  require: ["pos"],
  destination: vec2(-1000,-1000),

  add(this: GameObj<PosComp & SmoothComp>) {
    const isDefaultDist = this.destination.eq(vec2(-1000,-1000))
    if (isDefaultDist) this.destination = this.pos.clone()
  },
  update(this: GameObj<PosComp & SmoothComp>) {
    const path = this.destination.sub(this.pos).scale(0.6)
    path.x = clamp(path.x, -32,32)
    path.y = clamp(path.y, -32,32)
    this.moveBy(path.scale(4*dt()))
  },
  
  smoothMoveTo(dist) {
    this.destination = dist
  },
  smoothMoveBy(dist) {
    this.destination = this.destination.add(dist)
  },
})
