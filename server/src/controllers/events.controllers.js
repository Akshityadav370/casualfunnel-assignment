import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllSessions = async (req, res) => {
  const sessions = await Event.aggregate([
    {
      $group: {
        _id: '$sessionId',
        eventCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        sessionId: '$_id',
        eventCount: 1,
      },
    },
    {
      $sort: { eventCount: -1 },
    },
  ]);

  res.json(sessions);
};

export const getAllEventsBySessionId = async (req, res) => {
  const events = await Event.find({
    sessionId: req.params.sessionId,
  }).sort({ createdAt: 1 });

  res.json(events);
};

export const getHeapMapData = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'url query param required' });
  }

  const clicks = await Event.find(
    {
      url,
      eventType: 'click',
    },
    { x: 1, y: 1, createdAt: 1, _id: 0, elementId: 1, elementTag: 1 }
  ).sort({ createdAt: 1 });

  res.json(clicks);
};
