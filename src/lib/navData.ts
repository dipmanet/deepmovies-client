export interface NavDataItem {
	id: number;
	title: string;
	link: string;
	isExternal: boolean;
	children?: NavDataItem;
}
export const navData: NavDataItem[] = [
	{
		id: 1,
		title: "Movies",
		link: "/movie",
		isExternal: false,
	},
	{
		id: 2,
		title: "Series",
		link: "/series",
		isExternal: false,
	},
	{
		id: 3,
		title: "Genres",
		link: "/genre",
		isExternal: false,
		// children: [
		// 	{
		// 		id: 301,
		// 		title: "Action",
		// 		link: "/genre/action",
		// 		isExternal: false,
		// 	},
		// ],
	},

	{
		id: 4,
		title: "Kids",
		link: "/kids",
		isExternal: false,
	},
];
