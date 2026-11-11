/**
 * Always Tools — edge redirect + static asset Worker.
 *
 * Why this exists (SEO):
 *   GSC was splitting page authority across up to 4 URL variants of the same
 *   page (http/https × www/apex). This Worker collapses every request to the
 *   canonical origin `https://always.tools` with a single 301, so Google
 *   consolidates signals onto one URL per page.
 *
 * Canonicalization rules (in order):
 *   1. Host `www.always.tools` → `always.tools`            (301)
 *   2. Scheme `http://` → `https://` (detected via cf-visitor) (301)
 *   Both can apply at once; we build the target then do a single redirect.
 *
 * Everything else (path, query, the `.html`→extensionless 307 that the
 * static-asset layer already does) is left untouched. Non-production hosts
 * (localhost, *.workers.dev preview) are passed straight through so local
 * `wrangler dev` and preview deploys are never redirected.
 */

const APEX = "always.tools";
const WWW = "www.always.tools";

/**
 * Decide the canonical redirect target for a request, or null if none needed.
 * Pure function so it can be unit-tested without a running Worker.
 *
 * @param {string} rawUrl   full request URL as seen by the Worker
 * @param {string|null} cfVisitor  value of the `cf-visitor` header, e.g. '{"scheme":"http"}'
 * @returns {string|null}  absolute redirect target, or null to pass through
 */
export function canonicalTarget(rawUrl, cfVisitor) {
  const url = new URL(rawUrl);
  const host = url.hostname;

  // Only ever touch the two production hosts. Preview/local pass through.
  if (host !== APEX && host !== WWW) return null;

  // Determine the client-facing scheme. At the CF edge, url.protocol is often
  // already https even when the visitor arrived over http, so trust cf-visitor.
  let scheme = url.protocol.replace(":", "");
  if (cfVisitor) {
    try {
      const v = JSON.parse(cfVisitor);
      if (v && typeof v.scheme === "string") scheme = v.scheme;
    } catch {
      // malformed header: fall back to url.protocol
    }
  }

  const needsHostFix = host === WWW;
  const needsSchemeFix = scheme !== "https";
  if (!needsHostFix && !needsSchemeFix) return null;

  // Build the canonical URL by string construction rather than mutating
  // url.protocol / url.hostname. workerd's URL `protocol` setter is a no-op
  // when the host is a "special" scheme host and only the scheme changes,
  // which silently dropped the http→https upgrade on the apex host. An
  // explicit string avoids every such setter quirk across Node and workerd.
  return `https://${APEX}${url.pathname}${url.search}${url.hash}`;
}

export default {
  async fetch(request, env) {
    const target = canonicalTarget(request.url, request.headers.get("cf-visitor"));
    if (target) {
      return Response.redirect(target, 301);
    }
    // Not a redirect case → serve the static asset bound as ASSETS.
    return env.ASSETS.fetch(request);
  },
};
