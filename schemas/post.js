export default {
  name: "post",
  title: "Blog Post",
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
        Rule.required().error("Click button 'Generate' to auto-create based on title!"),
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
      description: "You can use this field to schedule post where you show them",
      type: "datetime",
      validation: Rule => Rule.required().error("All articles need a published date!")
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
      name: "isReady",
      type: "boolean",
      title: "Ready To Publish?",
      description:
        "Toggle on so you can pick it up later and publish. Removes item here from being raw.",
      validation: Rule =>
        Rule.required().error("Set to ready so you can publish or pick it up later!")
    },
    {
      name: "source_url",
      title: "Source URL",
      type: "string",
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
      title: "Publishing Date new –> old",
      name: "publishingDateAsc",
      by: [{ field: "publishedAt", direction: "asc" }, { field: "title", direction: "asc" }]
    },
    {
      title: "Publishing Date old -> new",
      name: "publishingDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }, { field: "title", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      image: "featuredImage",
      state: "state"
    },
    prepare({ title = "No title", publishedAt, image }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : "Missing publishing date",
        media: image
      };
    }
  }
};
