import { BACKEND_URL } from '@/constants/contants';
import AnalyticsTracker from '@/lib/AnalyticsTracker';
import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const tracker = new AnalyticsTracker(BACKEND_URL);

export function useAnalytics() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const hasInitialized = useRef<boolean>(false);
  const isHeatmapMode = searchParams.get('heatmap') === 'true';

  useEffect(() => {
    let handleClick: ((e: MouseEvent) => void) | undefined;

    if (!hasInitialized.current && !isHeatmapMode) {
      tracker.trackPageView();
      handleClick = (e: MouseEvent) => tracker.trackClick(e);
      document.addEventListener('click', handleClick);
      console.log(`Page view tracked: ${location.pathname}`);
      hasInitialized.current = true;
    }

    return () => {
      if (handleClick) {
        document.removeEventListener('click', handleClick);
      }
      hasInitialized.current = false;
    };
  }, [location, isHeatmapMode]);

  return { isHeatmapMode, tracker };
}
