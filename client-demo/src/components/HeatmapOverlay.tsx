import type AnalyticsTracker from '@/lib/AnalyticsTracker';
import { useEffect, useState } from 'react';

interface HeatmapClick {
  elementId: string;
  x: number;
  y: number;
}

interface HeatmapPoint {
  x: number;
  y: number;
  elementId: string;
}

interface HeatmapOverlayProps {
  tracker: AnalyticsTracker;
}

export default function HeatmapOverlay({ tracker }: HeatmapOverlayProps) {
  const [clicks, setClicks] = useState<HeatmapClick[]>([]);
  const [points, setPoints] = useState<HeatmapPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadHeatmapData() {
      setLoading(true);
      const data = await tracker.getHeatmapData();
      setClicks(data);
      setLoading(false);
    }

    loadHeatmapData();

    const preventClicks = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('click', preventClicks, true);

    return () => {
      document.removeEventListener('click', preventClicks, true);
    };
  }, [tracker]);

  useEffect(() => {
    if (clicks.length === 0) return;

    const updatePoints = () => {
      const mapped: HeatmapPoint[] = [];

      clicks.forEach((click) => {
        const el = document.querySelector<HTMLElement>(
          `[data-analytics-id="${click.elementId}"]`
        );

        if (!el) return;

        const rect = el.getBoundingClientRect();

        const absoluteX = rect.left + click.x * rect.width;
        const absoluteY = rect.top + click.y * rect.height;

        mapped.push({
          x: absoluteX,
          y: absoluteY,
          elementId: click.elementId,
        });
      });

      setPoints(mapped);
    };

    updatePoints();

    window.addEventListener('scroll', updatePoints);
    window.addEventListener('resize', updatePoints);

    return () => {
      window.removeEventListener('scroll', updatePoints);
      window.removeEventListener('resize', updatePoints);
    };
  }, [clicks]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.05)',
      }}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Loading heatmap data...
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: '14px', color: '#666' }}>
          Total clicks: {clicks.length}
        </div>
        <div style={{ fontSize: '12px', marginTop: '5px', color: '#999' }}>
          Click interactions are disabled
        </div>
      </div>

      {points.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: point.x,
            top: point.y,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(255, 0, 0, 0.6)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
          }}
        />
      ))}
    </div>
  );
}
