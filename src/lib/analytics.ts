const MEASUREMENT_ID = "G-G36WNQEPTM";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let initialized = false;

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  // Manual page views so SPA navigations aren't double-counted.
  gtag("config", MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
