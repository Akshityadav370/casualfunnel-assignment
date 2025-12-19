class AnalyticsTracker {
  constructor(apiEndpoint = 'http://localhost:3001/api/v1/events') {
    this.apiEndpoint = apiEndpoint;
    this.sessionId = null;
    this.initialized = false;
  }

  getCleanUrl() {
    return window.location.origin + window.location.pathname;
  }

  getSessionId() {
    if (this.sessionId) return this.sessionId;

    if (typeof window === 'undefined') return null;

    let sessionId = localStorage.getItem('session_id');

    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36)}`;
      localStorage.setItem('session_id', sessionId);
    }

    this.sessionId = sessionId;
    return sessionId;
  }

  async sendEvent(event) {
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

  async getHeatmapData(pageUrl = this.getCleanUrl()) {
    try {
      const res = await fetch(
        `${this.apiEndpoint}/heatmap?url=${encodeURIComponent(pageUrl)}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch heatmap data');
      }

      return await res.json();
    } catch (err) {
      console.error('Heatmap fetch failed:', err);
      return [];
    }
  }

  trackPageView() {
    if (typeof window === 'undefined') return;

    this.sendEvent({
      session_id: this.getSessionId(),
      event_type: 'page_view',
      url: this.getCleanUrl(),
      timestamp: new Date().toISOString(),
    });
  }

  trackClick(clickEvent) {
    const target = clickEvent.target.closest('[data-analytics-id]');

    if (!target) return;

    const rect = target.getBoundingClientRect();

    const x = (clickEvent.clientX - rect.left) / rect.width;
    const y = (clickEvent.clientY - rect.top) / rect.height;

    this.sendEvent({
      eventType: 'click',
      url: this.getCleanUrl(),
      elementId: target.dataset.analyticsId,
      elementTag: target.tagName.toLowerCase(),
      x,
      y,
      timestamp: new Date(),
    });
  }

  init() {
    if (typeof window === 'undefined' || this.initialized) return;

    this.trackPageView();

    document.addEventListener('click', (e) => {
      this.trackClick(e);
    });

    this.initialized = true;
  }
}

export default AnalyticsTracker;
