export default {
  name: "featuredImage",
  title: "Featured Image",
  type: "image",
  options: {
    hotspot: true
  },
  fields: [
    {
      name: "alt",
      title: "Alternative text (for screen readers)",
      type: "string",
      options: {
        isHighlighted: true
      }
    }
  ]
};
