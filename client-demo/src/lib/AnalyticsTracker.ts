interface AnalyticsEvent {
  sessionId: string | null;
  eventType: 'page_view' | 'click';
  url: string;
  timestamp: string | Date;
  elementId?: string;
  elementTag?: string;
  x?: number;
  y?: number;
}

interface HeatmapClick {
  elementId: string;
  x: number;
  y: number;
}

class AnalyticsTracker {
  private apiEndpoint: string;
  private sessionId: string | null;
  private lastEvents: Map<string, number>;

  constructor(apiEndpoint = 'http://104.248.75.249/api/v1/events') {
    this.apiEndpoint = apiEndpoint;
    this.sessionId = null;
    this.lastEvents = new Map();
  }

  private isDuplicate(eventKey: string): boolean {
    const now = Date.now();
    const lastTime = this.lastEvents.get(eventKey);

    if (lastTime && now - lastTime < 500) {
      return true;
    }

    this.lastEvents.set(eventKey, now);
    return false;
  }

  private getCleanUrl(): string {
    return window.location.origin + window.location.pathname;
  }

  private getSessionId(): string | null {
    if (this.sessionId) return this.sessionId;

    if (typeof window === 'undefined') return null;

    let sessionId = localStorage.getItem('session_id');

    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}`;
      localStorage.setItem('session_id', sessionId);
    }

    this.sessionId = sessionId;
    return sessionId;
  }

  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    } catch (err) {
      console.error('Failed to send analytics:', err);
    }
  }

  async getHeatmapData(
    pageUrl: string = this.getCleanUrl()
  ): Promise<HeatmapClick[]> {
    try {
      const res = await fetch(
        `${this.apiEndpoint}/heatmap?url=${encodeURIComponent(pageUrl)}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch heatmap data');
      }

      return (await res.json()) as HeatmapClick[];
    } catch (err) {
      console.error('Heatmap fetch failed:', err);
      return [];
    }
  }

  trackPageView(): void {
    const url = this.getCleanUrl();
    const eventKey = `page_view:${url}`;

    if (this.isDuplicate(eventKey)) {
      console.log('Duplicate page view prevented:', url);
      return;
    }

    this.sendEvent({
      sessionId: this.getSessionId(),
      eventType: 'page_view',
      url,
      timestamp: new Date().toISOString(),
    });
  }

  trackClick(clickEvent: MouseEvent): void {
    const target = (clickEvent.target as HTMLElement | null)?.closest(
      '[data-analytics-id]'
    ) as HTMLElement | null;

    if (!target) return;

    const elementId = target.dataset.analyticsId;
    if (!elementId) return;

    const eventKey = `click:${elementId}`;

    if (this.isDuplicate(eventKey)) {
      console.log('Duplicate click prevented:', elementId);
      return;
    }

    const rect = target.getBoundingClientRect();

    const x = (clickEvent.clientX - rect.left) / rect.width;
    const y = (clickEvent.clientY - rect.top) / rect.height;

    this.sendEvent({
      sessionId: this.getSessionId(),
      eventType: 'click',
      url: this.getCleanUrl(),
      elementId,
      elementTag: target.tagName.toLowerCase(),
      x,
      y,
      timestamp: new Date(),
    });
  }
}

export default AnalyticsTracker;
