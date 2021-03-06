export default {
	name: "subcategory",
	title: "SubCategory",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string"
		},
		{
			name: "listid",
			title: "List ID",
			type: "string"
		},
		{
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }]
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
		},
		{
			name: "historycategory",
			title: "HistoryCategory",
			type: "array",
			of: [{ type: "reference", to: { type: "historycategory" } }]
		}
	],
	liveEdit: false
};
