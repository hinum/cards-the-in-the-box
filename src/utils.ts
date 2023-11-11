import { GameObj, PosComp, TextCompOpt, Vec2 } from "kaboom"
import { SmoothPosComp } from "./smooth"

type pipe<T,last> = <next, Inp extends T | undefined>(inp: Inp,fn: (a:last)=>next)=>Inp extends T? last: pipe<T,next>
const pip = 
  <T,last>(cb: (n:T)=>last): pipe<T,last>=>
    ((inp, fn)=>
      inp === undefined?
        pip(n=>fn(cb(n as T))) :
        cb(inp as T)) as pipe<T,last>
export const pipe = <T>()=>pip<T,T>(n=>n)
export const _ = undefined
export const __ = <T>(n:T)=>n

export const f = <T>(func: (arg:T)=>any)=><Tout extends T>(arg:Tout)=>{
  func(arg)
  return arg
}
export const mapf = <T,Tmapped>(func: (arg:T)=>Tmapped)=>(arr: T[])=>arr.map(func)
export const save = <T,Tout>(func: (a:T)=>Tout)=>(a:T)=>func(a)

export type Gs<T> = {
  readonly g: ()=>T,
  readonly s: (v:T)=>any
}
export const gs = <T>(g: ()=>T, s:(v:T)=>any): Gs<T>=>({g,s})
export const log = f(console.log)
export const fhrow = (msg: string = "")=>{ throw msg }
export const ucheck = <T>(a: T)=>a === undefined? fhrow("failed a ucheck"): a
export const ncheck = <T>(a: T)=>a === null? fhrow("failed a ncheck"): a
export const makeArray = <T>(length: number, map: (index: number)=>T)=>Array(length).fill(0).map((_,i)=>map(i))

export const addChild = (child: GameObj)=>f((obj: GameObj)=>obj.add(child))
export const addChildren = (children: GameObj[])=>f((parent: GameObj)=>mapf((o: GameObj)=>parent.add(o))(children))
/*
 * if add named children breaks
 * try change the spread at the end to Object.assign
*/
export const addNamedChildren = <struct extends Record<string, GameObj>>(children: struct)=><T extends GameObj>(parent: T): T & struct=>({...addChildren(Object.values(children))(parent), ...children})

export const moveTo = (where: Vec2)=>f((obj: GameObj<PosComp>)=>obj.moveTo(where))
export const moveBy = (where: Vec2)=>f((obj: GameObj<PosComp>)=>obj.moveBy(where))
export const smoothTo = (where: Vec2, speed?: number)=>f((obj: GameObj<SmoothPosComp>)=>obj.smoothTo(where, speed))
export const smoothBy = (where: Vec2, speed?: number)=>f((obj: GameObj<SmoothPosComp>)=>obj.smoothBy(where, speed))
export const goTo = (where: Vec2)=>f((obj: GameObj<SmoothPosComp | PosComp>)=>obj.goTo(where))
export const temText = 
  (txt: string, opt: TextCompOpt = {})=>
    text(txt, {
      letterSpacing: -0.5,
      font: "Arial",
      align: "left",
      size: 6,
      ...opt
    })
  
