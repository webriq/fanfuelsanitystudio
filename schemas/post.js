export default {
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required().error("Title is required for posts!")
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Friendly URL text for SEO",
      validation: Rule =>
        Rule.required().error(
          "Click button 'Generate' to auto-create based on title!"
        ),
      options: {
        source: "title",
        maxLength: 120
      }
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "featuredImage"
    },
    {
      name: "body",
      title: "Body",
      type: "markdown"
    },
    {
      name: "publishedAt",
      title: "Published At",
      description:
        "You can use this field to schedule post where you show them",
      type: "datetime",
      validation: Rule =>
        Rule.required().error("All articles need a published date!")
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "markdown"
    },
    {
      name: "author",
      title: "Author",
      type: "postAuthor"
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "subcategory",
      title: "SubCategory",
      type: "array",
      of: [{ type: "reference", to: { type: "subcategory" } }]
    },
    {
      name: "historycategory",
      title: "HistoryCategory",
      type: "array",
      of: [{ type: "reference", to: { type: "historycategory" } }]
    },
    {
      name: "isReady",
      type: "boolean",
      title: "Ready To Publish?",
      description:
        "Toggle on so you can pick it up later and publish. Removes item from being RAW.",
      validation: Rule =>
        Rule.required().error(
          "Set to ready so you can publish or pick it up later!"
        )
    },
    {
      name: "isDiscarded",
      type: "boolean",
      title: "Move To Trash?",
      description:
        "Toggle on so this gets removed from RAW items and will never get inserted back in future scraping activity."
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          "Lists",
          "Fun Facts or Stories",
          "Famous Retired Players",
          "Best Gifts",
          "Champ Chest",
          "Other"
        ],
        layout: "radio"
      }
    },
    {
      name: "source_url",
      title: "Source URL",
      type: "string",
      readOnly: true
    },
    {
      name: "original_data",
      title: "Original Data",
      description:
        "This item's original data sent saved in JSON format below...",
      type: "code",
      options: {
        language: "json"
      },
      readOnly: true
    },
    {
      name: "delete",
      type: "boolean",
      readOnly: true,
      hidden: true
    }
  ],
  orderings: [
    {
      title: "Publishing Date old –> new",
      name: "publishingDateAsc",
      by: [
        { field: "publishedAt", direction: "asc" },
        { field: "title", direction: "asc" }
      ]
    },
    {
      title: "Publishing Date new -> old",
      name: "publishingDateDesc",
      by: [
        { field: "publishedAt", direction: "desc" },
        { field: "title", direction: "asc" }
      ]
    }
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      image: "featuredImage",
      type: "type"
    },
    prepare({ title = "No title", publishedAt, image, type = "No type" }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString() + " - " + type
          : "Missing publishing date" + " - " + type,
        media: image
      };
    }
  }
};
