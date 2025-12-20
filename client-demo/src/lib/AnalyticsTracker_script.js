class AnalyticsTracker {
  constructor(apiEndpoint = 'http://localhost:3001/api/v1/events') {
    this.apiEndpoint = apiEndpoint;
    this.sessionId = null;
    this.initialized = false;
    this.lastEvents = new Map();
  }

  isDuplicate(eventKey) {
    const now = Date.now();
    const lastTime = this.lastEvents.get(eventKey);

    if (lastTime && now - lastTime < 500) {
      return true;
    }

    this.lastEvents.set(eventKey, now);
    return false;
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
    const url = this.getCleanUrl();
    const eventKey = `page_view:${url}`;

    if (this.isDuplicate(eventKey)) {
      console.log('Duplicate page view prevented:', url);
      return;
    }

    this.sendEvent({
      sessionId: this.getSessionId(),
      eventType: 'page_view',
      url: url,
      timestamp: new Date().toISOString(),
    });
  }

  trackClick(clickEvent) {
    const target = clickEvent.target.closest('[data-analytics-id]');

    if (!target) return;

    const elementId = target.dataset.analyticsId;
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
      elementId: target.dataset.analyticsId,
      elementTag: target.tagName.toLowerCase(),
      x,
      y,
      timestamp: new Date(),
    });
  }
}

export default AnalyticsTracker;
