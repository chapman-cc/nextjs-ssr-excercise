import { PageParams } from "./types";

export const getSortQuery: (
  field: string,
  prevOrder?: PageParams["_order"]
) => Pick<PageParams, "_sort" | "_order"> = (field, prevOrder) => ({
  _sort: field,
  _order: prevOrder === "asc" ? "desc" : "asc",
});
