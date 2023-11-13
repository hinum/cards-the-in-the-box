import { AreaComp, Color, GameObj, TextCompOpt } from "kaboom"
import { smoothPos } from "./smooth"

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

  const faceSprites = faces.map((face,i)=>{
    const backgroud = make([
      rect(width, hPf), z(0),
      color(getCardColor(face.type))
    ])
    const heading = make([
      defText(face.name, {width: width-6}),
      pos(2,2), z(0)
    ])
    const description = make([
      defText(face.description, {size: 5, width: width-6}),
      pos(2,10), z(0)
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
      area({ collisionIgnore: ["*"] }),{
        add(this: GameObj<AreaComp>) {
          this.onHover() //TODO
        }}
    ])
    sprite.add(conSprite)

    return sprite
  })
}
