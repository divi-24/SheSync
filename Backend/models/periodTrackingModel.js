import mongoose from "mongoose";

const periodTrackingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    cycleDuration: { type: Number },
    lastPeriodStart: { type: Date },
    lastPeriodDuration: { type: Number },
    moodTypes: [{ type: String }],
    moodSeverity: { type: String },
    moodDate: { type: Date },
    symptoms: [{ type: String }],
    symptomSeverities: { type: Map, of: String },
    symptomDate: { type: Date },
    sleepDuration: { type: Number },
    sleepQuality: { type: String },
    nextPeriodPrediction: { type: Date },
  },
  { timestamps: true }
);

export const PeriodTracking = mongoose.model(
  "PeriodTracking",
  periodTrackingSchema
);