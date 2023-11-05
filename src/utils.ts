import { GameObj, PosComp, Vec2 } from "kaboom"

type pipe<T,last> = <next, Inp extends T | null>(inp: Inp,fn: (a:last)=>next)=>Inp extends T? last: pipe<T,next>
const pip = 
  <T,last>(cb: (n:T)=>last): pipe<T,last>=>
    ((inp, fn)=>
      inp === null?
        pip(n=>fn(cb(n as T))) :
        cb(inp as T)) as pipe<T,last>
export const pipe = <T>()=>pip<T,T>(n=>n)
export const _ = null
export const __ = <T>(n:T)=>n

export const f = <T>(func: (arg:T)=>any)=><Tout extends T>(arg:Tout)=>{
  func(arg)
  return arg
}
export const fg = <T>(func: (arg:T)=>any)=>(arg:T)=>{
  func(arg)
  return arg
}
export const map = <T,Tmapped>(func: (arg:T)=>Tmapped)=>(arr: T[])=>arr.map(func)

export const log = f(console.log)
export const getset = <N extends string, T>(name: N, getter: ()=>T, setter: (n:T)=>any)=><Obj>(obj: Obj)=>Object.defineProperty(obj, name, {get: getter, set: setter}) as Obj & {[p in N]: T}

export const addChild = (child: GameObj)=>f((obj: GameObj)=>obj.add(child))
export const addChildren = (children: GameObj[])=>f((parent: GameObj)=>map(parent.add)(children))
/*
 * if add named children breaks
 * try change the spread at the end to Object.assign
*/
export const addNamedChildren = <struct extends Record<string, GameObj>>(children: struct)=>fg(<T extends GameObj>(parent: T): T & struct=>({...addChildren(Object.values(children))(parent), ...children}))

export const moveTo = (where: Vec2)=><Obj extends GameObj<PosComp>>(obj: Obj)=>obj.moveTo(where)
