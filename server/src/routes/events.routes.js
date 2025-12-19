import express from 'express';
import {
  createEvent,
  getAllEventsBySessionId,
  getAllSessions,
  getHeapMapData,
} from '../controllers/events.controllers.js';

const eventsRouter = express.Router();

eventsRouter.post('/', createEvent);

eventsRouter.get('/sessions', getAllSessions);

eventsRouter.get('/session/:sessionId', getAllEventsBySessionId);

eventsRouter.get('/heatmap', getHeapMapData);

export default eventsRouter;
