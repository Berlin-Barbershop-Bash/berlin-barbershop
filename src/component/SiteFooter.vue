<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const legalLinks = [
	{ key: 'footer.impressum', to: '/impressum' },
	{ key: 'footer.privacy', to: '/privacy' },
]
// FIXME: real addresses for the social profiles
const socialLinks = [
	{
		key: 'footer.instagram',
		href: 'https://www.instagram.com/berlinbarbershopbash',
		icon: 'mdi-instagram',
	},
	{ key: 'footer.facebook', href: 'https://www.facebook.com/FIXME', icon: 'mdi-facebook' },
]
</script>

<template>
	<footer class="site-footer">
		<nav class="footer-legal">
			<router-link v-for="link in legalLinks" :key="link.key" :to="link.to">
				{{ t(link.key) }}
			</router-link>
		</nav>
		<ul class="footer-social">
			<li v-for="link in socialLinks" :key="link.key">
				<!-- Icon only; the name is still read out and shown on hover -->
				<a
					:href="link.href"
					target="_blank"
					rel="noopener"
					:aria-label="`${t(link.key)} ${t('a11y.new_tab')}`"
					:title="t(link.key)"
				>
					<v-icon :icon="link.icon" aria-hidden="true" />
				</a>
			</li>
		</ul>
	</footer>
</template>

<style lang="scss">
.site-footer {
	background-color: var(--pale-ish-color);
	color: var(--content-text-color);

	font-family: var(--content-text-font);
	font-size: var(--content-text-size);
	font-weight: var(--content-text-weight);
	line-height: var(--content-line-height);

	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	gap: 32px 48px;

	// Plenty of room: the page ends here
	@media screen and (min-width: 801px) {
		padding: 96px var(--page-gutter);
	}

	.footer-legal,
	.footer-social {
		display: flex;
		flex-flow: row wrap;
		gap: 16px 32px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	// Sized here: Vuetify's size prop in em also scales the icon's box, which compounds
	.footer-social .v-icon {
		font-size: 1.6em;
	}

	a {
		color: inherit;
		text-decoration: none;

		display: inline-flex;
		align-items: center;
		gap: 8px;

		&:focus-visible {
			outline: 3px solid var(--dark-color);
			outline-offset: 4px;
		}
	}

	// Only the text links underline on hover; the social icons stay as they are
	.footer-legal a:hover {
		text-decoration: underline;
	}

	// One centred list on phones, evenly spaced across both groups (after the rules it overrides)
	@media screen and (max-width: 800px) {
		flex-flow: column nowrap;
		align-items: center;
		gap: 20px;
		padding: 64px var(--page-gutter);

		.footer-legal {
			flex-flow: column nowrap;
			align-items: center;
			gap: 20px;
		}

		// Both icons side by side, close together
		.footer-social {
			justify-content: center;
			gap: 16px;
		}
	}
}
</style>
