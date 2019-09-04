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
      name: "ads",
      title: "Ads",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "headerAds",
      title: "Header Ads",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "adslink",
      title: "Ads Link",
      type: "string"
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
