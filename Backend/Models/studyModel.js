import mongoose from "mongoose";

const StudyMaterialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [10000, "Content cannot exceed 10,000 characters"],
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [2000, "Summary cannot exceed 2,000 characters"],
    },
    flashcards: [
      {
        question: {
          type: String,
          required: [true, "Flashcard question is required"],
          trim: true,
          maxlength: [500, "Flashcard question cannot exceed 500 characters"],
        },
        answer: {
          type: String,
          required: [true, "Flashcard answer is required"],
          trim: true,
          maxlength: [1000, "Flashcard answer cannot exceed 1,000 characters"],
        },
      },
    ],
    mindMap: {
      type: mongoose.Schema.Types.Mixed, // Flexible JSON structure
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  }
);

// Indexes for faster queries
StudyMaterialSchema.index({ userId: 1 }); // Index on userId for faster lookups
StudyMaterialSchema.index({ title: "text", content: "text" }); // Text index for search

// Virtual for formatted createdAt date
StudyMaterialSchema.virtual("formattedCreatedAt").get(function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Middleware to update the updatedAt field before saving
StudyMaterialSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to find study materials by user ID
StudyMaterialSchema.statics.findByUserId = function (userId) {
  return this.find({ userId });
};

// Instance method to generate a short summary (example)
StudyMaterialSchema.methods.generateSummary = function () {
  return this.content.substring(0, 100) + "..."; // Truncate content for a summary
};

const StudyMaterial = mongoose.model("StudyMaterial", StudyMaterialSchema);
export default StudyMaterial;