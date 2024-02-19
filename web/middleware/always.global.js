import { useNavStore } from '~/store/nav'

export default defineNuxtRouteMiddleware((to, from) => {

	const navStore = useNavStore()
	navStore.setClose()

})