/**
 * Sidebar configuration
 *
 */
export const SIDEBAR = {
	navTree: {
		always_expanded: false,
	},
	permalinks: {
		main: {
			enabled: true,
			links: [
				{
					title: "Home",
					href: "/",
				},
				{
					title: "GitHub Repository",
					href: "https://github.com/gauravjot/planum-docs",
				},
			],
		},
		foot: {
			enabled: true,
			links: [
				{
					title: "v1.7.0",
					href: "https://github.com/gauravjot/planum-docs/releases",
				},
				{
					title: "Docs",
					href: "https://planum-docs.vercel.app/",
				},
			],
		},
	},
};
