import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAdminCourses
} from '../controllers/course.controller.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/admin/my-courses', verifyToken, getAdminCourses);
router.get('/:id', getCourseById);

router.post('/', verifyToken, requireRole('admin'), createCourse);
router.put('/:id', verifyToken, updateCourse);
router.delete('/:id', verifyToken, deleteCourse);

export default router;
