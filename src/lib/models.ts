import mongoose, { Schema, model, models } from 'mongoose';

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  communityId: { type: Schema.Types.ObjectId, ref: 'Community' },
  unitNumber: String,
  role: { type: String, enum: ['resident', 'admin'], default: 'resident' },
  avatar: String,
}, { timestamps: true });

// Community Schema
const CommunitySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  description: String,
  amenities: [String],
  image: String,
}, { timestamps: true });

// Complaint Schema
const ComplaintSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  communityId: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
  category: { type: String, enum: ['Plumber', 'Electrician', 'General', 'Security', 'Other'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In-Progress', 'Resolved'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
}, { timestamps: true });

// Payment Schema
const PaymentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  communityId: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
  type: { type: String, enum: ['Maintenance', 'Car Wash', 'Event', 'Other'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  dueDate: { type: Date, required: true },
  paidAt: Date,
}, { timestamps: true });

// Booking Schema
const BookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  communityId: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
  amenity: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: String,
  endTime: String,
  status: { type: String, enum: ['Confirmed', 'Cancelled'], default: 'Confirmed' },
}, { timestamps: true });

// Notice Schema
const NoticeSchema = new Schema({
  communityId: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  author: String,
  category: String,
  isPinned: { type: Boolean, default: false },
}, { timestamps: true });

export const User = models.User || model('User', UserSchema);
export const Community = models.Community || model('Community', CommunitySchema);
export const Complaint = models.Complaint || model('Complaint', ComplaintSchema);
export const Payment = models.Payment || model('Payment', PaymentSchema);
export const Booking = models.Booking || model('Booking', BookingSchema);
export const Notice = models.Notice || model('Notice', NoticeSchema);
