import S from "@sanity/desk-tool/structure-builder";
import { MdMoveToInbox } from "react-icons/md";
import { startOfToday, startOfTomorrow } from "date-fns";

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
                .title("Published Today")
                .schemaType("post")
                .child(
                  S.documentList()
                    .title("Today")
                    .filter(
                      "_type == $type && (defined(isReady) && isReady == $isReady) && !(_id in path('drafts.**')) && (publishedAt >= $todayDate && publishedAt <= $tomorrowDate)"
                    )
                    .params({
                      type: "post",
                      isReady: true,
                      todayDate: startOfToday(),
                      tomorrowDate: startOfTomorrow()
                    })
                ),
              S.listItem()
                .title("All Published")
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
                .title("All Articles")
                .child(
                  S.documentTypeList("post")
                    .title("All Articles")
                    .filter("_type == $type && defined(isReady)")
                )
            ])
        ),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Authors")
        .schemaType("person")
        .child(S.documentTypeList("person").title("Person"))
      // the rest of the structure
    ]);
