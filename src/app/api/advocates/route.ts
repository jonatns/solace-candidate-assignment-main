import { PgSelect } from "drizzle-orm/pg-core";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { asc, desc, sql } from "drizzle-orm";

type RequestBody = {
  search: string;
  sortBy: "firstName";
  direction: "asc" | "desc";
};

export async function POST(req: Request) {
  const { search, sortBy, direction }: RequestBody = await req.json();

  // @ts-expect-error
  let query: PgSelect = db.select().from(advocates);

  if (search?.trim()) {
    const term = search.trim();

    query = query.where(
      sql`
        to_tsvector(
          'english',
          ${advocates.firstName} || ' ' ||
          ${advocates.lastName} || ' ' ||
          ${advocates.city} || ' ' ||
          ${advocates.degree} || ' ' ||
          ${advocates.phoneNumber} || ' ' ||
          ${advocates.yearsOfExperience}::text
        ) @@ plainto_tsquery('english', ${term})
      `
    );
  }

  const dynamicQuery = query.$dynamic();

  const directionClause =
    direction === "asc" ? asc(advocates[sortBy]) : desc(advocates[sortBy]);
  const data = await dynamicQuery.orderBy(directionClause);

  return Response.json({ data });
}
