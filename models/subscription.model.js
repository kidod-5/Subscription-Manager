import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    minLength: [3, "Subscription name must be at least 3 characters long"],
    maxLength: [50, "Subscription name may not exceed 50 characters long"],
  },
  price: {
    type: Number,
    required: [true, "Subscription price is required"],
    min: [0, "Price must be a positive number"],
  },
  currency:{
    type: String,
    required: [true, "Currency is required"],
    enum: ["USD", "EUR", "GBP"],
    default: "USD",
  },
  interval: {
    type: String,
    required: [true, "Subscription interval is required"],
    enum: ["daily", "weekly", "monthly", "yearly"],
  },
  category: {
    type: String,
    enum: ["entertainment", "education", "utilities", "lifestyle", "other"],
  },
  paymentMethod:
  {
    type: String,
    required: [true, "Payment method is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "canceled", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Start date must be before or equal to today",
    },
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "Renewal date must be after start date",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },


}({ timestamps: true }));

subscriptionSchema.pre("save", function (next) {
  
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.interval]);
  }

  if(this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
