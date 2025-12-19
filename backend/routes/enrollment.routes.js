import express from 'express';
import {
  enrollCourse,
  getStudentEnrollments,
  getCourseEnrollments,
  updateEnrollmentStatus,
  unenroll
} from '../controllers/enrollment.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, enrollCourse);
router.get('/my-enrollments', verifyToken, getStudentEnrollments);
router.get('/course/:course_id', verifyToken, getCourseEnrollments);
router.put('/:enrollment_id', verifyToken, updateEnrollmentStatus);
router.delete('/:enrollment_id', verifyToken, unenroll);

export default router;
