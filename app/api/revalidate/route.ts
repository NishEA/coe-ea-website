import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

const PATHS_BY_TYPE: Record<string, string[]> = {
  startup:       ['/startup-program'],
  partner:       ['/'],
  impactMetrics: ['/'],
  applyBenefits: ['/', '/apply'],
  team:          ['/governance'],
  event:         ['/events'],
  pillar:        ['/startup-program'],
  news:          ['/'],
  page:          ['/'],
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-sanity-webhook-secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  let body: { _type?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  const docType = body._type ?? ''
  const paths = PATHS_BY_TYPE[docType] ?? ['/']

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: true, paths })
}
