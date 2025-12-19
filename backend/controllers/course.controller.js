import { allQuery, runQuery, getQuery } from '../db/init-db.js';
import { validateInput } from '../utils/validation.js';

export async function createCourse(req, res, next) {
  try {
    const { title, description } = req.body;
    const instructor_id = req.user.id;

    const errors = validateInput({ title }, ['title']);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    const result = await runQuery(
      'INSERT INTO courses (title, description, instructor_id) VALUES (?, ?, ?)',
      [title, description || '', instructor_id]
    );

    const course = await getQuery('SELECT * FROM courses WHERE id = ?', [result.id]);

    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllCourses(req, res, next) {
  try {
    const courses = await allQuery('SELECT * FROM courses ORDER BY created_at DESC');
    res.json(courses);
  } catch (error) {
    next(error);
  }
}

export async function getCourseById(req, res, next) {
  try {
    const { id } = req.params;

    const course = await getQuery('SELECT * FROM courses WHERE id = ?', [id]);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
}

export async function updateCourse(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const course = await getQuery('SELECT * FROM courses WHERE id = ?', [id]);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.instructor_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only course instructor or admin can update' });
    }

    await runQuery(
      'UPDATE courses SET title = ?, description = ? WHERE id = ?',
      [title || course.title, description !== undefined ? description : course.description, id]
    );

    const updatedCourse = await getQuery('SELECT * FROM courses WHERE id = ?', [id]);
    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCourse(req, res, next) {
  try {
    const { id } = req.params;

    const course = await getQuery('SELECT * FROM courses WHERE id = ?', [id]);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.instructor_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only course instructor or admin can delete' });
    }

    await runQuery('DELETE FROM courses WHERE id = ?', [id]);

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getAdminCourses(req, res, next) {
  try {
    const courses = await allQuery(
      'SELECT * FROM courses WHERE instructor_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(courses);
  } catch (error) {
    next(error);
  }
}
