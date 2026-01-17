'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";

function PostHogPageViewContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    // Every time the URL changes, send a manual "$pageview" event
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        '$current_url': url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// wrap in Suspense because usage of useSearchParams() can de-opt static rendering
export default function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewContent />
    </Suspense>
  )
}