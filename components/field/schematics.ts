// cx, cy = canvas pixel coordinates of the domain node center

export interface SchematicFns {
  pathology: (ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) => void
  repair: (ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) => void
}

function gearPathology(ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) {
  const teeth = 8, r = 18, ri = 12
  ctx.save()
  ctx.strokeStyle = 'rgba(245,156,58,0.7)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2 + t * 0.4
    const a1 = a0 + Math.PI / teeth
    const broken = i === 3
    const jitter = broken ? Math.sin(t * 4.2) * 2.5 : 0
    const outerR = broken ? ri + jitter : r
    ctx.lineTo(Math.cos(a0) * ri + cx, Math.sin(a0) * ri + cy)
    ctx.lineTo(Math.cos(a0) * outerR + cx, Math.sin(a0) * outerR + cy)
    ctx.lineTo(Math.cos(a1) * outerR + cx, Math.sin(a1) * outerR + cy)
    ctx.lineTo(Math.cos(a1) * ri + cx, Math.sin(a1) * ri + cy)
  }
  ctx.closePath(); ctx.stroke(); ctx.restore()
}

function gearRepair(ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) {
  const teeth = 8, r = 18, ri = 12
  ctx.save()
  ctx.strokeStyle = `rgba(0,164,228,${0.5 + progress * 0.5})`
  ctx.shadowColor = '#2EE6FF'; ctx.shadowBlur = progress * 12; ctx.lineWidth = 1.2
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2 + t * 0.4
    const a1 = a0 + Math.PI / teeth
    ctx.lineTo(Math.cos(a0) * ri + cx, Math.sin(a0) * ri + cy)
    ctx.lineTo(Math.cos(a0) * r + cx, Math.sin(a0) * r + cy)
    ctx.lineTo(Math.cos(a1) * r + cx, Math.sin(a1) * r + cy)
    ctx.lineTo(Math.cos(a1) * ri + cx, Math.sin(a1) * ri + cy)
  }
  ctx.closePath(); ctx.stroke(); ctx.restore()
}

function pipePathology(ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = 'rgba(245,156,58,0.6)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(cx - 24, cy); ctx.lineTo(cx + 24, cy); ctx.stroke()
  const eddyR = 6 + Math.sin(t * 3) * 3
  ctx.beginPath(); ctx.arc(cx, cy, eddyR, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(245,100,40,0.5)'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore()
}

function pipeRepair(ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = `rgba(0,164,228,${0.4 + progress * 0.6})`
  ctx.shadowColor = '#2EE6FF'; ctx.shadowBlur = progress * 10; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(cx - 24, cy); ctx.lineTo(cx + 24, cy); ctx.stroke()
  const ax = cx - 20 + progress * 40
  ctx.beginPath(); ctx.moveTo(ax, cy - 4); ctx.lineTo(ax + 6, cy); ctx.lineTo(ax, cy + 4)
  ctx.strokeStyle = `rgba(46,230,255,${progress})`; ctx.lineWidth = 1; ctx.stroke(); ctx.restore()
}

function circuitPathology(ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = 'rgba(245,156,58,0.65)'; ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cx - 20, cy - 10); ctx.lineTo(cx - 8, cy - 10)
  ctx.lineTo(cx - 8, cy + 5); ctx.lineTo(cx + 8, cy + 5)
  ctx.moveTo(cx + 12, cy + 5); ctx.lineTo(cx + 20, cy + 5)
  ctx.lineTo(cx + 20, cy - 10); ctx.stroke()
  if (Math.sin(t * 8) > 0.5) {
    ctx.fillStyle = 'rgba(255,120,40,0.8)'
    ctx.beginPath(); ctx.arc(cx + 10, cy + 5, 2, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

function circuitRepair(ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = `rgba(0,164,228,${0.5 + progress * 0.5})`
  ctx.shadowColor = '#2EE6FF'; ctx.shadowBlur = progress * 8; ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cx - 20, cy - 10); ctx.lineTo(cx - 8, cy - 10)
  ctx.lineTo(cx - 8, cy + 5); ctx.lineTo(cx + 20, cy + 5)
  ctx.lineTo(cx + 20, cy - 10); ctx.stroke(); ctx.restore()
}

function genericPathology(ctx: CanvasRenderingContext2D, t: number, cx: number, cy: number) {
  ctx.save(); ctx.strokeStyle = 'rgba(245,156,58,0.6)'; ctx.lineWidth = 1
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const r = 14 + Math.sin(t * 3 + i) * 3
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.restore()
}

function genericRepair(ctx: CanvasRenderingContext2D, t: number, progress: number, cx: number, cy: number) {
  ctx.save()
  ctx.strokeStyle = `rgba(0,164,228,${0.4 + progress * 0.6})`
  ctx.shadowColor = '#2EE6FF'; ctx.shadowBlur = progress * 10; ctx.lineWidth = 1
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 14, cy + Math.sin(a) * 14, 2, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.restore()
}

export const SCHEMATICS: Record<string, SchematicFns> = {
  'smart-manufacturing': { pathology: gearPathology,    repair: gearRepair    },
  'smart-water':         { pathology: pipePathology,    repair: pipeRepair    },
  'home-automation':     { pathology: circuitPathology, repair: circuitRepair },
  'smart-energy':        { pathology: genericPathology, repair: genericRepair },
  'smart-farming':       { pathology: genericPathology, repair: genericRepair },
  'connected-transport': { pathology: genericPathology, repair: genericRepair },
  'smart-healthcare':    { pathology: genericPathology, repair: genericRepair },
  'weather-monitoring':  { pathology: genericPathology, repair: genericRepair },
  'smart-security':      { pathology: genericPathology, repair: genericRepair },
  'asset-monitoring':    { pathology: genericPathology, repair: genericRepair },
}
