import { Request } from "express";

export type OrgIdSource = "params" | "body" | "query";

export function extractOrgId(
  req: Request,
  source: OrgIdSource,
  paramName: string = "organizationId"
): string | undefined {
  const sources: Record<OrgIdSource, () => string | undefined> = {
    params: () => req.params[paramName],
    body: () => req.body[paramName],
    query: () => req.query[paramName] as string | undefined,
  };

  return sources[source]?.();
}
