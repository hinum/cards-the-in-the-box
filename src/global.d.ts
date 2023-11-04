import kaboom, { KaboomCtx } from "kaboom"

/*
 * ATTENTION
 * list of things not inculded
 * - gamepad stuff
 * - loadBean, brup, addKaboom
 * - testline etc
 * - draw stuff
*/

declare global {
  readonly var add: KaboomCtx["add"]
  readonly var make: KaboomCtx["make"]
  readonly var readd: KaboomCtx["readd"]
  readonly var get: KaboomCtx["get"]
  readonly var destroy: KaboomCtx["destroy"]
  readonly var destroyAll: KaboomCtx["destroyAll"]

  readonly var pos: KaboomCtx["pos"]
  readonly var scale: KaboomCtx["scale"]
  readonly var rotate: KaboomCtx["rotate"]
  readonly var color: KaboomCtx["color"]
  readonly var opacity: KaboomCtx["opacity"]
  readonly var sprite: KaboomCtx["sprite"]
  readonly var text: KaboomCtx["text"]
  readonly var rect: KaboomCtx["rect"]
  readonly var circle: KaboomCtx["circle"]
  readonly var uvquad: KaboomCtx["uvquad"]
  readonly var area: KaboomCtx["area"]
  readonly var anchor: KaboomCtx["anchor"]
  readonly var z: KaboomCtx["z"]
  readonly var outline: KaboomCtx["outline"]
  readonly var body: KaboomCtx["body"]
  readonly var doubleJump: KaboomCtx["doubleJump"]
  readonly var move: KaboomCtx["move"]
  readonly var offscreen: KaboomCtx["offscreen"]
  readonly var follow: KaboomCtx["follow"]
  readonly var shader: KaboomCtx["shader"]
  readonly var timer: KaboomCtx["timer"]
  readonly var fixed: KaboomCtx["fixed"]
  readonly var stay: KaboomCtx["stay"]
  readonly var health: KaboomCtx["health"]
  readonly var lifespan: KaboomCtx["lifespan"]
  readonly var state: KaboomCtx["state"]
  readonly var fadeIn: KaboomCtx["fadeIn"]
  readonly var mask: KaboomCtx["mask"]
  readonly var tile: KaboomCtx["tile"]
  readonly var agent: KaboomCtx["agent"]
  
  readonly var on: KaboomCtx["on"]
  readonly var onUpdate: KaboomCtx["onUpdate"]
  readonly var onDraw: KaboomCtx["onDraw"]
  readonly var onAdd: KaboomCtx["onAdd"]
  readonly var onDestroy: KaboomCtx["onDestroy"]
  readonly var onLoad: KaboomCtx["onLoad"]
  readonly var onLoading: KaboomCtx["onLoading"]
  readonly var onError: KaboomCtx["onError"]
  readonly var onResize: KaboomCtx["onResize"]
  readonly var onCleanup: KaboomCtx["onCleanup"]
  readonly var onCollide: KaboomCtx["onCollide"]
  readonly var onCollideUpdate: KaboomCtx["onCollideUpdate"]
  readonly var onCollideEnd: KaboomCtx["onCollideEnd"]
  readonly var onClick: KaboomCtx["onClick"]
  readonly var onHover: KaboomCtx["onHover"]
  readonly var onHoverUpdate: KaboomCtx["onHoverUpdate"]
  readonly var onHoverEnd: KaboomCtx["onHoverEnd"]
  readonly var onKeyDown: KaboomCtx["onKeyDown"]
  readonly var onKeyPress: KaboomCtx["onKeyPress"]
  readonly var onKeyPressRepeat: KaboomCtx["onKeyPressRepeat"]
  readonly var onKeyRelease: KaboomCtx["onKeyRelease"]
  readonly var onCharInput: KaboomCtx["onCharInput"]
  readonly var onMouseDown: KaboomCtx["onMouseDown"]
  readonly var onMousePress: KaboomCtx["onMousePress"]
  readonly var onMouseRelease: KaboomCtx["onMouseRelease"]
  readonly var onMouseMove: KaboomCtx["onMouseMove"]
  readonly var onScroll: KaboomCtx["on"]
  readonly var onHide: KaboomCtx["onHide"]
  readonly var onShow: KaboomCtx["onShow"]
  readonly var onSceneLeave: KaboomCtx["onSceneLeave"]

  readonly var load: KaboomCtx["load"]
  readonly var loadRoot: KaboomCtx["loadRoot"]
  readonly var loadSprite: KaboomCtx["loadSprite"]
  readonly var loadSpriteAtlas: KaboomCtx["loadSpriteAtlas"]
  readonly var loadAseprite: KaboomCtx["loadAseprite"]
  readonly var loadPedit: KaboomCtx["loadPedit"]
  readonly var loadJSON: KaboomCtx["loadJSON"]
  readonly var loadSound: KaboomCtx["loadSound"]
  readonly var loadFont: KaboomCtx["loadFont"]
  readonly var loadBitmapFont: KaboomCtx["loadBitmapFont"]
  readonly var loadShader: KaboomCtx["loadShader"]
  readonly var loadShaderURL: KaboomCtx["loadShaderURL"]
  readonly var loadProgress: KaboomCtx["loadProgress"]
  readonly var getSprite: KaboomCtx["getSprite"]
  readonly var getSound: KaboomCtx["getSound"]
  readonly var getFont: KaboomCtx["getFont"]
  readonly var getBitmapFont: KaboomCtx["getBitmapFont"]
  readonly var getShader: KaboomCtx["getShader"]
  readonly var getAsset: KaboomCtx["getAsset"]

  readonly var width: KaboomCtx["width"]
  readonly var height: KaboomCtx["height"]
  readonly var center: KaboomCtx["center"]
  readonly var dt: KaboomCtx["dt"]
  readonly var time: KaboomCtx["time"]
  readonly var mousePos: KaboomCtx["mousePos"]
  readonly var mouseDeltaPos: KaboomCtx["mouseDeltaPos"]
  readonly var isFocus: KaboomCtx["isFocused"]
  readonly var isTouchscreen: KaboomCtx["isTouchscreen"]
  readonly var isKeyDown: KaboomCtx["isKeyDown"]
  readonly var isKeyRelease: KaboomCtx["isKeyReleased"]
  readonly var isKeyPressed: KaboomCtx["isKeyPressed"]
  readonly var isKeyPressedRepeat: KaboomCtx["isKeyPressedRepeat"]
  readonly var isMouseDown: KaboomCtx["isMouseDown"]
  readonly var isMouseRelease: KaboomCtx["isMouseReleased"]
  readonly var isMousePressed: KaboomCtx["isMousePressed"]
  readonly var isMouseMoved: KaboomCtx["isMouseMoved"]
  readonly var shake: KaboomCtx["shake"]
  readonly var camPos: KaboomCtx["camPos"]
  readonly var camRot: KaboomCtx["camRot"]
  readonly var camScale: KaboomCtx["camScale"]
  readonly var toScreen: KaboomCtx["toScreen"]
  readonly var toWorld: KaboomCtx["toWorld"]
  readonly var setGravity: KaboomCtx["setGravity"]
  readonly var getGravity: KaboomCtx["getGravity"]
  readonly var setBackground: KaboomCtx["setBackground"]
  readonly var getBackground: KaboomCtx["getBackground"]
  readonly var setCursor: KaboomCtx["setCursor"]
  readonly var getCursor: KaboomCtx["getCursor"]
  readonly var setCursorLocked: KaboomCtx["setCursorLocked"]
  readonly var isCursorLocked: KaboomCtx["isCursorLocked"]
  readonly var setFullscreen: KaboomCtx["setFullscreen"]
  readonly var isFullscreen: KaboomCtx["isFullscreen"]

  readonly var wait: KaboomCtx["wait"]
  readonly var loop: KaboomCtx["loop"]
  
  readonly var play: KaboomCtx["play"]
  readonly var volume: KaboomCtx["volume"]
  readonly var audioCtx: KaboomCtx["audioCtx"]

  readonly var rand: KaboomCtx["rand"]
  readonly var randi: KaboomCtx["randi"]
  readonly var randSeed: KaboomCtx["randSeed"]
  readonly var vec2: KaboomCtx["vec2"]
  readonly var rgb: KaboomCtx["rgb"]
  readonly var hsl2rgb: KaboomCtx["hsl2rgb"]
  readonly var quad: KaboomCtx["quad"]
  readonly var choose: KaboomCtx["choose"]
  readonly var chance: KaboomCtx["chance"]
  readonly var lerp: KaboomCtx["lerp"]
  readonly var tween: KaboomCtx["tween"]
  readonly var easings: KaboomCtx["easings"]
  readonly var map: KaboomCtx["map"]
  readonly var mapc: KaboomCtx["mapc"]
  readonly var wave: KaboomCtx["wave"]
  readonly var clamp: KaboomCtx["clamp"]
  readonly var deg2rad: KaboomCtx["deg2rad"]
  readonly var rad2deg: KaboomCtx["rad2deg"]
  readonly var Line: KaboomCtx["Line"]
  readonly var Rect: KaboomCtx["Rect"]
  readonly var Circle: KaboomCtx["Circle"]
  readonly var Polygon: KaboomCtx["Polygon"]

  readonly var plug: KaboomCtx["plug"]
  readonly var screenshot: KaboomCtx["screenshot"]
  readonly var download: KaboomCtx["download"]
  readonly var downloadText: KaboomCtx["downloadText"]
  readonly var downloadJSON: KaboomCtx["downloadJSON"]
  readonly var downloadBlob: KaboomCtx["downloadBlob"]
  readonly var record: KaboomCtx["record"]
  readonly var quit: KaboomCtx["quit"]

  readonly var ASCII_CHARS: KaboomCtx["ASCII_CHARS"]
  readonly var LEFT: KaboomCtx["LEFT"]
  readonly var RIGHT: KaboomCtx["RIGHT"]
  readonly var UP: KaboomCtx["UP"]
  readonly var DOWN: KaboomCtx["DOWN"]
  readonly var RED: KaboomCtx["RED"]
  readonly var GREEN: KaboomCtx["GREEN"]
  readonly var BLUE: KaboomCtx["BLUE"]
  readonly var BLACK: KaboomCtx["BLACK"]
  readonly var WHITE: KaboomCtx["WHITE"]
  readonly var YELLOW: KaboomCtx["YELLOW"]
  readonly var MAGENTA: KaboomCtx["MAGENTA"]
  readonly var CYAN: KaboomCtx["CYAN"]
  readonly var canvas: KaboomCtx["canvas"]

  readonly var VERSION: string


  readonly var innerWidth: number
  readonly var innerHeight: number
  var window: any
}
export {}
