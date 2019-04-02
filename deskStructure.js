import S from "@sanity/desk-tool/structure-builder";
import {
  FiCalendar,
  FiInbox,
  FiFileText,
  FiPieChart,
  FiUser,
  FiDatabase,
  FiLayers,
  FiCheck,
  FiTrash
} from "react-icons/fi";
import { startOfToday, startOfTomorrow } from "date-fns";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Scraped (RAW)")
        .schemaType("post")
        .icon(FiInbox)
        .child(
          S.documentList()
            .title("Raw Items")
            .filter(
              "_type == $type && (!defined(isReady) || (defined(isReady) && isReady == $isReady)) && (!defined(isDiscarded) || (defined(isDiscarded) && isDiscarded == $isDiscarded))"
            )
            .params({
              type: "post",
              isReady: false,
              isDiscarded: false
            })
        ),
      S.listItem()
        .title("Articles")
        .icon(FiFileText)
        .child(
          S.list()
            .title("Status")
            .items([
              S.listItem()
                .title("Ready To Publish")
                .icon(FiCheck)
                .schemaType("post")
                .child(
                  S.documentList()
                    .title("Ready")
                    .filter(
                      "_type == $type && (defined(isReady) && isReady == $isReady) && _id in path('drafts.**') && (!defined(isDiscarded) || (defined(isDiscarded) && isDiscarded == $isDiscarded))"
                    )
                    .params({
                      type: "post",
                      isReady: true,
                      isDiscarded: false,
                      state: "drafts"
                    })
                ),
              S.listItem()
                .title("Published Today")
                .schemaType("post")
                .icon(FiCalendar)
                .child(
                  S.documentList()
                    .title("Today")
                    .filter(
                      "_type == $type && (defined(isReady) && isReady == $isReady) && !(_id in path('drafts.**')) && (publishedAt >= $todayDate && publishedAt <= $tomorrowDate) && (!defined(isDiscarded) || (defined(isDiscarded) && isDiscarded == $isDiscarded))"
                    )
                    .params({
                      type: "post",
                      isReady: true,
                      isDiscarded: false,
                      todayDate: startOfToday(),
                      tomorrowDate: startOfTomorrow()
                    })
                ),
              S.listItem()
                .title("All Published")
                .schemaType("post")
                .icon(FiLayers)
                .child(
                  S.documentList()
                    .title("Published")
                    .filter(
                      "_type == $type && (defined(isReady) && isReady == $isReady) && !(_id in path('drafts.**')) && (!defined(isDiscarded) || (defined(isDiscarded) && isDiscarded == $isDiscarded))"
                    )
                    .params({
                      type: "post",
                      isDiscarded: false,
                      isReady: true
                    })
                ),
              S.listItem()
                .title("All Articles")
                .icon(FiDatabase)
                .schemaType("post")
                .child(
                  S.documentTypeList("post")
                    .title("All")
                    .filter(
                      "_type == $type && defined(isReady) && (!defined(isDiscarded) || (defined(isDiscarded) && isDiscarded == $isDiscarded))"
                    )
                    .params({
                      type: "post",
                      isDiscarded: false
                    })
                ),
              S.listItem()
                .title("Trashed")
                .icon(FiTrash)
                .schemaType("post")
                .child(
                  S.documentTypeList("post")
                    .title("Trashed")
                    .filter(
                      "_type == $type && (defined(isDiscarded) && isDiscarded == $isDiscarded)"
                    )
                    .params({
                      type: "post",
                      isDiscarded: true
                    })
                )
            ])
        ),
      S.listItem()
        .title("Categories")
        .icon(FiPieChart)
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Authors")
        .icon(FiUser)
        .schemaType("person")
        .child(S.documentTypeList("person").title("Person"))
      // the rest of the structure
    ]);
