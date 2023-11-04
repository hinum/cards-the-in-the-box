const buildOutput = await Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "dist/"
})

//TODO err handling
if (!buildOutput.success) console.error(buildOutput.logs.map(v=>JSON.stringify(v,null,2)).join("\n\n"))


var express = require('express')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic('dist', { index: ['index.html'] }))
app.listen(3000)
