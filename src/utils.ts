import { GameObj, PosComp, Vec2 } from "kaboom"

const pipe = <t, T extends nF<t>>()=>pip<t,T,t>([])

type nF<T> = T extends Function? never: T
type F<arg,out> = (a: arg) => out

type pipe<t,T extends nF<t>,last> = <next, Fn extends F<last, next> | T>(fn: Fn)=>Fn extends F<last,next>? pipe<t, T, ReturnType<Fn>>: last
const pip = 
  <t,T extends nF<t>,last>(stack: F<any,any>[]): pipe<t,T,last>=>
    ((fn)=>(
      fn instanceof Function?
        pip([...stack, fn as F<any,any>]):
        stack.reduce((pv,v)=>v(pv), fn)
    )) as pipe<t,T,last>

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

export const addChild = (child: GameObj)=>f((obj: GameObj)=>obj.add(child))
export const addChildren = (children: GameObj[])=>f((parent: GameObj)=>map(parent.add)(children))
/*
 * if add named children breaks
 * try change the spread at the end to Object.assign
*/
export const addNamedChildren = <struct extends Record<string, GameObj>>(children: struct)=>fg(<T extends GameObj>(parent: T): T & struct=>({...addChildren(Object.values(children))(parent), ...children}))

export const moveTo = (where: Vec2)=><Obj extends GameObj<PosComp>>(obj: Obj)=>obj.moveTo(where)
