import { Context } from "netlify:edge";

export default async (_, { geo, json }: Context) => json({ geo });
