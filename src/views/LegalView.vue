<script setup lang="ts">
import TextPage from '@/component/TextPage.vue'
import { contactEmail } from '@/contact'
import { useI18n } from 'vue-i18n'

// Impressum and privacy policy: `page` is the en.json key holding a title and sections, each
// with an optional heading and paragraphs. A paragraph may mention {email}.
const props = defineProps<{ page: 'impressum' | 'privacy' }>()

const { t, tm } = useI18n()

type Section = { title?: string; body: string[]; lines?: boolean }
const sections = () => tm(`${props.page}.sections`) as unknown as Section[]
</script>

<template>
	<text-page :title="t(`${page}.title`)">
		<template v-for="(section, s) in sections()" :key="s">
			<h2 v-if="section.title">{{ t(`${page}.sections.${s}.title`) }}</h2>
			<i18n-t
				v-for="(_, p) in section.body"
				:key="p"
				:keypath="`${page}.sections.${s}.body.${p}`"
				tag="p"
				:class="{ lines: section.lines }"
				scope="global"
			>
				<template #email>
					<a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
				</template>
			</i18n-t>
		</template>
	</text-page>
</template>
