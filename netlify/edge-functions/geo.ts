import { Context } from "netlify:edge";

export default async (_: Request, { geo, json }: Context) => json({ geo });
