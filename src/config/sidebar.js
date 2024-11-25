/**
 * Sidebar configuration
 *
 */
export const SIDEBAR = {
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
					open_in_new: true,
				},
			],
		},
		foot: {
			enabled: true,
			links: [
				{
					title: "v2.0.0",
					href: "https://github.com/gauravjot/planum-docs/releases",
					open_in_new: true,
				},
				{
					title: "Docs",
					href: "https://planum-docs.vercel.app/",
					open_in_new: true,
				},
			],
		},
	},
};
