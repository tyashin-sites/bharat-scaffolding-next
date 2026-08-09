'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { offices } from '@/data/company';

/**
 * Interactive pan-India offices map (contact page).
 *
 * All six offices as brick-red pins on one zoomable map; each balloon carries
 * the full printed address plus "Open in Google Maps" / "Get directions"
 * links that launch Google Maps with the exact address string (Google
 * resolves the survey-number addresses more precisely than any map pin).
 *
 * Leaflet + OpenStreetMap tiles — no API key required. Swappable for Google
 * JS Maps the day the customer supplies a billing-enabled API key.
 */
export function OfficesMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false, // page-scroll friendly; zoom via controls/pinch
        zoomControl: true,
      });
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      }).addTo(map);

      const pin = L.divIcon({
        className: '',
        html: `<svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg"><path d="M17 0C7.6 0 0 7.6 0 17c0 12.75 17 27 17 27s17-14.25 17-27C34 7.6 26.4 0 17 0z" fill="#9B2C24"/><circle cx="17" cy="17" r="7" fill="#FFFFFF"/></svg>`,
        iconSize: [34, 44],
        iconAnchor: [17, 44],
        popupAnchor: [0, -40],
      });

      const bounds = L.latLngBounds([]);
      for (const o of offices) {
        const dest = encodeURIComponent(o.address);
        const marker = L.marker([o.lat, o.lng], { icon: pin }).addTo(map);
        marker.bindPopup(
          `<div style="min-width:220px;font-family:inherit">
             <p style="margin:0 0 2px;font-weight:700;font-size:14px">${o.city}${
               o.label ? ` — ${o.label}` : ''
             }</p>
             <p style="margin:0 0 10px;font-size:12px;color:#6B6560;line-height:1.5">${o.address}</p>
             <a href="https://www.google.com/maps/dir/?api=1&destination=${dest}" target="_blank" rel="noopener"
                style="display:inline-block;background:#9B2C24;color:#fff;padding:6px 12px;border-radius:4px;font-size:12px;font-weight:600;text-decoration:none">
                Get directions</a>
             <a href="https://www.google.com/maps/search/?api=1&query=${dest}" target="_blank" rel="noopener"
                style="display:inline-block;margin-left:8px;color:#9B2C24;font-size:12px;font-weight:600;text-decoration:none">
                Open in Google Maps</a>
           </div>`
        );
        bounds.extend([o.lat, o.lng]);
      }

      map.fitBounds(bounds, { padding: [40, 40] });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="border-border h-[420px] w-full overflow-hidden rounded-md border md:h-[520px]"
      role="region"
      aria-label="Map of Bharat Scaffolding offices across India"
    />
  );
}
