import { PgSelect } from "drizzle-orm/pg-core";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
  const { search } = await req.json();

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

  const data = await dynamicQuery;

  return Response.json({ data });
}
