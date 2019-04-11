export default {
  name: "category",
  title: "Category",
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
    },
    {
      name: "subcategories",
      title: "Sub Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "subcategory" } }]
    }
  ],
  liveEdit: true
};
