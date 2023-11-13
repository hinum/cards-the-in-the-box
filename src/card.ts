import { AreaComp, Color, GameObj, TextCompOpt } from "kaboom"
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
export type Card = {
  faces: CardFace[],
  sprite: GameObj, // TODO
  isPlayerCard: boolean
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

const createCardSprite = (faces: CardFace[])=>{
  const height = 48
  const width = 32
  const hPf = height/faces.length

  let isHoverable = false
  const focus = (focusI: number)=>{
    faceSprites.forEach((s,i)=>{
      if (i <= focusI) s.conSprite.smoothBy(vec2(0, focusI* hPf))
      else s.conSprite.smoothBy(vec2(0, (faces.length-i-1)*hPf))
      s.description.smoothOpac(1)
    })
  }
  const unfocus = ()=>{
    faceSprites.forEach((s,i)=>{
      s.description.opacity > 0 && s.description.smoothOpac(0)
      s.conSprite.smoothTo(vec2(0, i*hPf))
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
      {
        description, conSprite,
        add(this: GameObj<AreaComp>) {
          this.onHover(()=> isHoverable && focus(i)) //TODO
          this.onHoverEnd(()=>isHoverable && unfocus())
        }
      }
    ])
    sprite.add(conSprite)

    return sprite
  })

  const //TODO stuff for tomotrow (mask and stuff)
}
