import S from "@sanity/desk-tool/structure-builder";
import { MdMoveToInbox } from "react-icons/md";

console.log(S);

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Scraped (RAW)")
        .schemaType("post")
        .child(
          S.documentList()
            .title("Raw Items")
            .filter(
              "_type == $type && (!defined(isReady) || (defined(isReady) && isReady == $isReady))"
            )
            .params({
              type: "post",
              isReady: false
            })
        ),
      S.listItem()
        .title("Articles")
        .child(
          S.list()
            .title("Status")
            .items([
              S.listItem()
                .title("Ready To Publish")
                .schemaType("post")
                .child(
                  S.documentList()
                    .title("Ready")
                    .filter(
                      "_type == $type && (defined(isReady) && isReady == $isReady) && _id in path('drafts.**')"
                    )
                    .params({
                      type: "post",
                      isReady: true,
                      state: "drafts"
                    })
                ),
              S.listItem()
                .title("Published")
                .schemaType("post")
                .child(
                  S.documentList()
                    .title("Published")
                    .filter(
                      "_type == $type && (defined(isReady) && isReady == $isReady) && !(_id in path('drafts.**'))"
                    )
                    .params({
                      type: "post",
                      isReady: true
                    })
                ),
              S.listItem()
                .schemaType("post")
                .title("All articles")
                .child(
                  S.documentTypeList("post")
                    .title("All articles")
                    .filter("_type == $type && defined(isReady)")
                )
            ])
        )

      // the rest of the structure
    ]);
