interface Env {
	DB?: D1Database
}

// Keep in sync with the options in src/component/InterestForm.vue
const ROLES = ['singer', 'arranger', 'swing']
const EVENTS_MAX_LENGTH = 200
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const pick = (formData: FormData, key: string, allowed: string[]) =>
	formData
		.getAll(key)
		.map(String)
		.filter((value) => allowed.includes(value))
		.join(',')

// POST /api/interest: one row per email; submitting again updates the answers
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	const origin = request.headers.get('Origin')
	if (origin && new URL(origin).host !== new URL(request.url).host) {
		return Response.json({ ok: false, error: 'forbidden' }, { status: 403 })
	}

	const formData = await request.formData().catch(() => null)
	const email = String(formData?.get('email') ?? '')
		.trim()
		.toLowerCase()
	if (!formData || !EMAIL.test(email) || email.length > 254) {
		return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 })
	}

	if (!env.DB) {
		console.error('interest form: no D1 binding named DB')
		return Response.json({ ok: false, error: 'not_configured' }, { status: 500 })
	}

	// Free text: which other barbershop events they plan to attend in 2027
	const events = String(formData.get('events') ?? '')
		.trim()
		.slice(0, EVENTS_MAX_LENGTH)

	const now = new Date().toISOString()
	await env.DB.prepare(
		`INSERT INTO signups (email, roles, events, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?4)
		 ON CONFLICT(email) DO UPDATE SET
		   roles = excluded.roles, events = excluded.events, updated_at = excluded.updated_at`,
	)
		.bind(email, pick(formData, 'roles', ROLES), events, now)
		.run()

	return Response.json({ ok: true })
}
