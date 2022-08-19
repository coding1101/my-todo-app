import { withTRPC } from '@trpc/next'
import type { AppRouter } from '../server/router'
import type { AppType } from 'next/dist/shared/lib/utils'
import superjson from 'superjson'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import Head from 'next/head'

const App: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<>
			<SessionProvider session={session}>
				<div>
					<Head>
						<title>Todo App</title>
						<link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
					</Head>

					<Component {...pageProps} />
				</div>
			</SessionProvider>
		</>
	)
}

const getBaseUrl = () => {
	if (typeof window !== 'undefined') return ''
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
	return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
	config() {
		const url = `${getBaseUrl()}/api/trpc`

		return {
			url,
			transformer: superjson
		}
	},
	ssr: false
})(App)
