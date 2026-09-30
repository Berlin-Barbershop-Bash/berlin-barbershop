import App from '@/App.vue'
import router from '@/router'
import { createApp } from 'vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@/styles/main.scss'

const vuetify = createVuetify({
	components,
	directives,
	defaults: {
		// global: { FontFace: 'Sofia Sans' }
	},
	icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
	blueprint: md2,
	// One light theme in the site's palette (keep in sync with the colours in main.scss), so Vuetify's
	// fields, checkboxes and popups match the page instead of following the system's dark mode
	theme: {
		defaultTheme: 'barbershop',
		themes: {
			barbershop: {
				dark: false,
				colors: {
					background: '#f6ebd6',
					surface: '#f6ebd6',
					'on-background': '#331528',
					'on-surface': '#331528',
					primary: '#331528',
					secondary: '#331528',
					error: '#331528',
				},
			},
		},
	},
})

// Translation
import en from '@/locale/en.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
	legacy: false, // you must set `false`, to use Composition API
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en },
})

const app = createApp(App)

app.use(vuetify)
app.use(i18n)
app.use(router)

app.mount('#app')
