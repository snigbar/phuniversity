import { TCourse, TPreRequisiteCourses } from './course.interface'
import mongoose, { Schema } from 'mongoose'

const preRequisiteSchema = new mongoose.Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
)

const courseSchema = new mongoose.Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    preRequisiteCourse: [preRequisiteSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const CourseModel = mongoose.model<TCourse>('Course', courseSchema)

export default CourseModel
