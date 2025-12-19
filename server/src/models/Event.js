import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    eventType: {
      type: String,
      enum: ['page_view', 'click'],
      required: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
      index: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    x: Number,
    y: Number,
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ sessionId: 1, createdAt: 1 });
eventSchema.index({ url: 1, eventType: 1, createdAt: 1 });

eventSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Event', eventSchema);
