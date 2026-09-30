<script setup lang="ts">
import { PHONE_MAX_WIDTH } from '@/breakpoints'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { t } = useI18n()
// Full screen without the zoom animation on phones (the site's phone layout, not Vuetify's
// breakpoint); a centred popup elsewhere
const { width } = useDisplay()
const phone = computed(() => width.value <= PHONE_MAX_WIDTH)

// Keep in sync with ROLES and EVENTS_MAX_LENGTH in functions/api/interest.ts
const roleOptions = ['singer', 'arranger', 'swing']
const eventsMaxLength = 200

const open = ref(false)
const valid = ref(false)
const email = ref('')
const roles = ref<string[]>([])
const events = ref('')
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

// Links to #interest-form (e.g. the ticker) open the dialog; closing it clears the hash
const route = useRoute()
const router = useRouter()
watch(
	() => route.hash,
	(hash) => {
		if (hash === '#interest-form') open.value = true
	},
	{ immediate: true },
)
watch(open, (isOpen) => {
	if (!isOpen && route.hash === '#interest-form') router.replace({ hash: '' })
})

const emailRules = [
	(v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || t('form.email_invalid'),
]

async function submit() {
	if (!valid.value) return
	status.value = 'sending'

	const body = new FormData()
	body.set('email', email.value)
	roles.value.forEach((role) => body.append('roles', role))
	body.set('events', events.value.trim())

	try {
		const res = await fetch('/api/interest', { method: 'POST', body })
		status.value = res.ok ? 'sent' : 'error'
	} catch {
		status.value = 'error'
	}
}
</script>

<template>
	<v-dialog
		v-model="open"
		max-width="560"
		scrollable
		:fullscreen="phone"
		:transition="phone ? false : undefined"
		aria-labelledby="interest-form-title"
	>
		<template #activator="{ props: activatorProps }">
			<button v-bind="activatorProps" type="button" class="form-button">
				{{ t('bash.interest_form') }}
			</button>
		</template>

		<v-card class="interest-form">
			<v-card-title>
				<span id="interest-form-title">{{ t('bash.interest_form') }}</span>
				<button
					type="button"
					class="close-button"
					:aria-label="t('form.close')"
					@click="open = false"
				>
					<v-icon icon="mdi-close" size="24" />
				</button>
			</v-card-title>

			<v-card-text v-if="status === 'sent'">
				<p role="status">{{ t('form.thanks') }}</p>
			</v-card-text>

			<v-form v-else v-model="valid" @submit.prevent="submit">
				<v-card-text>
					<v-text-field
						v-model="email"
						:label="t('form.email')"
						:rules="emailRules"
						variant="solo"
						flat
						type="email"
						autocomplete="email"
						required
					/>

					<fieldset>
						<legend>{{ t('form.roles_question') }}</legend>
						<v-checkbox
							v-for="role in roleOptions"
							:key="role"
							v-model="roles"
							:value="role"
							:label="t(`form.roles.${role}`)"
							density="compact"
							hide-details
						/>
					</fieldset>

					<div class="question">
						<label for="interest-form-events">{{ t('form.events_question') }}</label>
						<v-text-field
							id="interest-form-events"
							v-model="events"
							:placeholder="t('form.events_placeholder')"
							:maxlength="eventsMaxLength"
							variant="solo"
							flat
							hide-details
						/>
					</div>

					<p v-if="status === 'error'" class="error" role="alert">{{ t('form.error') }}</p>
				</v-card-text>

				<v-card-actions>
					<button type="submit" class="form-button" :disabled="status === 'sending'">
						{{ t('form.submit') }}
					</button>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<style lang="scss">
.form-button {
	background-color: var(--content-button-color);
	color: var(--content-button-text-color);

	font-family: var(--content-button-text-font);
	font-size: var(--content-button-text-size);
	font-weight: var(--content-button-text-weight);
	line-height: var(--content-button-line-height);
	text-transform: lowercase;

	border: none;
	border-radius: 20px;
	padding: 4px 20px;
	width: fit-content;
	cursor: pointer;

	&:hover {
		background-color: var(--bright-color);
	}

	&:active {
		background-color: var(--dark-color);
		color: var(--bright-color);
	}

	&:focus-visible {
		outline: 3px solid var(--dark-color);
		outline-offset: 0;
	}

	&:disabled {
		cursor: wait;
	}
}

.interest-form {
	background-color: var(--content-background-color) !important;
	color: var(--content-text-color) !important;
	font-family: var(--content-text-font);

	// The heading matches the size of the buttons' text (the submit button is the page's own
	// button style); all other text shares one size. Sizes in main.scss; Vuetify's colours come
	// from the site theme in main.ts.
	.v-card-title {
		font-family: var(--header-text-font);
		font-weight: var(--header-text-weight);
		font-feature-settings: var(--font-feat-polymath);
		font-variation-settings: var(--font-var-polymath);
		font-size: var(--form-heading-size);
		line-height: var(--form-heading-line-height);
		text-transform: lowercase;
	}

	.v-card-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 16px;
	}

	// Vuetify sizes these differently (14px body, 12px messages); bring them all to one size
	.v-card-text,
	.v-card-text p,
	legend,
	.question > label,
	.v-label,
	.v-field__input,
	.v-field-label,
	.v-messages {
		font-size: var(--form-text-size);
		line-height: var(--form-line-height);
	}

	// Title, fields, thanks message and submit button share one 24px left edge
	.v-card-title,
	.v-card-text {
		padding-inline: 24px;
	}

	.close-button {
		background: none;
		border: none;
		padding: 0;
		color: inherit;
		cursor: pointer;
	}

	.v-card-actions {
		padding: 0 24px 24px;
	}

	// Match the buttons: tan fill, aubergine outline on focus
	.v-field {
		background-color: var(--pale-ish-color);
		border-radius: 0;
	}

	// Vuetify fades the placeholder label; keep it clearly readable (≥ 4.5:1)
	.v-field-label,
	.v-field__input::placeholder {
		opacity: 0.8;
	}

	.v-field--focused {
		outline: 3px solid var(--dark-color);
		outline-offset: -3px;
	}

	fieldset,
	.question {
		border: none;
		margin: 16px 0 0;
		padding: 0;
	}

	// The question sits above its field like a legend above its checkboxes
	.question > label {
		display: block;
		margin-bottom: 8px;
	}

	.error {
		margin-top: 16px;
	}
}
</style>
