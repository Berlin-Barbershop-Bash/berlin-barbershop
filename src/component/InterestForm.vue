<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

const { t } = useI18n()
// Full screen without the zoom animation on phones; a centred popup elsewhere
const { smAndDown } = useDisplay()

// Keep in sync with ROLES and DATES in functions/api/interest.ts
const roleOptions = ['singer', 'arranger', 'swing']
const dateOptions = ['aug-20-22', 'aug-27-29', 'sep-3-5', 'sep-10-12']

const open = ref(false)
const valid = ref(false)
const email = ref('')
const roles = ref<string[]>([])
const dates = ref<string[]>([])
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const emailRules = [
	(v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || t('form.email_invalid'),
]

async function submit() {
	if (!valid.value) return
	status.value = 'sending'

	const body = new FormData()
	body.set('email', email.value)
	roles.value.forEach((role) => body.append('roles', role))
	dates.value.forEach((date) => body.append('dates', date))

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
		:fullscreen="smAndDown"
		:transition="smAndDown ? false : undefined"
	>
		<template #activator="{ props: activatorProps }">
			<button v-bind="activatorProps" type="button" class="form-button">
				{{ t('bash.interest_form') }}
			</button>
		</template>

		<v-card class="interest-form">
			<v-card-title>
				{{ t('bash.interest_form') }}
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
				<p>{{ t('form.thanks') }}</p>
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

					<fieldset>
						<legend>{{ t('form.dates_question') }}</legend>
						<v-checkbox
							v-for="date in dateOptions"
							:key="date"
							v-model="dates"
							:value="date"
							:label="t(`form.dates.${date}`)"
							density="compact"
							hide-details
						/>
					</fieldset>

					<p v-if="status === 'error'" class="error">{{ t('form.error') }}</p>
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

	// Tint Vuetify's fields, checkboxes and errors with --dark-color (#331528) instead of theme colors.
	// Each Vuetify input re-applies its theme class, so override there too.
	&,
	.v-theme--dark {
		--v-theme-primary: 51, 21, 40;
		--v-theme-secondary: 51, 21, 40;
		--v-theme-error: 51, 21, 40;
		--v-theme-on-surface: 51, 21, 40;
	}

	.v-card-title {
		display: flex;
		align-items: center;
		justify-content: space-between;

		font-family: var(--header-text-font);
		font-weight: var(--header-text-weight);
		font-size: 28px;
		line-height: 34px;
		text-transform: lowercase;
		padding-top: 16px;
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

	// Submit button at the form's text size; the page's button keeps the large size
	.form-button {
		font-size: 16px;
		line-height: 24px;
		padding: 8px 20px;
	}

	// Match the buttons: tan fill, aubergine outline on focus
	.v-field {
		background-color: var(--pale-ish-color);
		border-radius: 0;
	}

	.v-field--focused {
		outline: 3px solid var(--dark-color);
		outline-offset: -3px;
	}

	fieldset {
		border: none;
		margin: 16px 0 0;
		padding: 0;
	}

	.error {
		margin-top: 16px;
	}
}
</style>
