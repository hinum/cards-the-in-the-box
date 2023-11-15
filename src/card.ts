import { AreaComp, Color, GameObj, TextCompOpt, Vec2 } from "kaboom"
import { smoothOpacity, smoothPos } from "./smooth"

type cardType =
  | "atk"
  | "def"
export type CardFace = {
  name: string
  description: string
  type: cardType

  onActive: (game: any)=>void //TODO
}

const defText = 
  (txt: string, opt: TextCompOpt = {})=>
    text(txt, {
      size: 6,
      letterSpacing: -0.25,
      font: "Airal",
      ...opt
    })

const getCardColor = (type: cardType): Color=>{
  switch (type){
    case "atk": return rgb(255,0,0)
    case "def": return rgb(0,0,255)
  }
}

type Card = ReturnType<typeof createCard>
export const createCard = (faces: CardFace[])=>{
  const height = 48
  const width = 32
  const hPf = height/faces.length

  let isHoverable = true
  const focus = (focusI: number)=>{
    faceSprites.forEach((s,i)=>{
      if (i == focusI) s.description.smoothOpac(1)
      if (i <= focusI) s.conSprite.smoothTo(vec2(0, focusI* -hPf))
      else s.conSprite.smoothTo(vec2(0, (faces.length-i)*hPf))
    })
  }
  const unfocus = ()=>{
    faceSprites.forEach(s=>{
      s.description.opacity > 0 && s.description.smoothOpac(0)
      s.conSprite.smoothTo(vec2(0, 0))
    })
  }

  const faceSprites = faces.map((face,i)=>{
    const backgroud = make([
      rect(width, height), z(0),
      color(getCardColor(face.type))
    ])
    const heading = make([
      defText(face.name, {width: width-6}),
      pos(2,2), z(0)
    ])
    const description = make([
      defText(face.description, {size: 5, width: width-6}),
      pos(2,10), z(0), opacity(0), smoothOpacity(0)
    ])
    const conSprite = make([
      pos(0,0), smoothPos(vec2(0,0))
    ])
    conSprite.add(backgroud)
    conSprite.add(heading)
    conSprite.add(description)

    const sprite = make([
      pos(0, hPf*i),
      rect(width-3, hPf-3, {fill: false}),
      area({ collisionIgnore: ["*"] }),
      { description, conSprite }
    ])
    sprite.onHover(()=>isHoverable && focus(i))
    sprite.onHoverEnd(()=>isHoverable && unfocus())
    sprite.add(conSprite)

    return sprite
  })

  const maskSprite = make([
    mask("intersect"),
    rect(width-2, height-2),
    pos(1,1)
  ])
  const outSprite = make([
    smoothPos(vec2(0,0)),pos(0,0),
    sprite("cardOutline"),
    area({ collisionIgnore: ["*"] }),
    {
      unfocus, focus, faces,
      hover: ()=>{},
      hoverEnd: ()=>{},
      click: ()=>{},
      set isHoverable(v: boolean){
        isHoverable = v
      },
      get isHoverable(){
        return isHoverable
      }
    }
  ])
  faceSprites.forEach(o=>maskSprite.add(o))
  outSprite.add(maskSprite)
  outSprite.onClick(()=>outSprite.click())
  outSprite.onHover(()=>outSprite.hover())
  outSprite.onHoverEnd(()=>outSprite.hoverEnd())

  return outSprite
}

export const createCardRow = (vec: Vec2)=>make([
  pos(vec), smoothPos(vec),
  {
    addChild(this: GameObj, card: Card, onPick = ()=>{}){
      const i = this.children.length
      this.add(card)
      this.smoothBy(vec2(-16,0))
      card.goTo(vec2(i*32, 48))
      card.smoothTo(vec2(i*32,0))
      card.click = onPick
      card.hover = ()=>card.smoothBy(vec2(0,-8))
      card.hoverEnd = ()=>card.smoothBy(vec2(0,8))
    },
    removeChild(this: GameObj, card: Card){
      const i = this.children.findIndex(s=>s.id == card.id)
      card.destroy()
      card.goTo(this.pos.add(i*32,0))
      this.children.slice(i).forEach(o=>o.smoothBy(vec2(-32,0)))
      this.smoothBy(vec2(16,0))
      return card
    },
  }
])
