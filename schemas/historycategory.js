export default {
	name: "historycategory",
	title: "HistoryCategory",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string"
		},
		{
			name: "description",
			title: "Description",
			type: "text"
		},
		{
			name: "logo",
			title: "Logo",
			type: "image",
			options: {
				hotspot: true
			}
		}
	],
	liveEdit: false
};
