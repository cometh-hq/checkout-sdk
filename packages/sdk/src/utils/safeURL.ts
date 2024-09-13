export const safeURL = (...parts: string[]): string => {
	let url = ''
	parts.forEach((part) => {
		const endsWithSlash = url.endsWith('/')
		const startsWithSlash = part.startsWith('/')
		if (endsWithSlash && startsWithSlash) {
			url = url.slice(0, -1)
		} else if (url != '' && !endsWithSlash && !startsWithSlash) {
			url += '/'
		}
		url += part
	})
	return url
}

export const buildURL = (baseURL: string, params?: { [key: string]: string | undefined }): string => {
	if (!params) return baseURL
	const url = new URL(baseURL)
	Object.keys(params).forEach((key) => {
		if (params[key]) {
			url.searchParams.append(key, params[key]!)
		}
	})
	return url.toString()
}

export const urlOriginEquals = (url1: string, url2: string): boolean => {
	const u1 = new URL(url1)
	const u2 = new URL(url2)
	return u1.origin === u2.origin
}