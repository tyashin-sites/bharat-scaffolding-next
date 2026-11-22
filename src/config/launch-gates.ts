/**
 * Launch gates for pages that are built and deployed but must not be
 * discoverable yet.
 *
 * ESTIMATOR_SIGNED_OFF — /scaffolding-on-rent hands contractors a material
 * list, so its quantity formula (docs/ESTIMATOR-FORMULA.md, ASSET-DEBT #10)
 * needs the customer's technical sign-off before anyone is sent there.
 * While false, the page is reachable by direct URL only:
 *   - no inbound links from `/`, `/products` or the footer
 *   - not in getSiteRoutes() / sitemap-pages.xml
 *   - `robots: noindex, nofollow` on the page itself, so it does not go live
 *     for search when the domain is cut over
 *   - no ad spend should point at it (not enforceable in code)
 * Flip to true only after written sign-off on the formula.
 */
export const ESTIMATOR_SIGNED_OFF = false;
