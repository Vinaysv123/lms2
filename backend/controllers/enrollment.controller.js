import { allQuery, runQuery, getQuery } from '../db/init-db.js';

export async function enrollCourse(req, res, next) {
  try {
    const { course_id } = req.body;
    const user_id = req.user.id;

    if (!course_id) {
      return res.status(400).json({ error: 'course_id is required' });
    }

    const course = await getQuery('SELECT id FROM courses WHERE id = ?', [course_id]);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const existingEnrollment = await getQuery(
      'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      [user_id, course_id]
    );

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    const result = await runQuery(
      'INSERT INTO enrollments (user_id, course_id, status) VALUES (?, ?, ?)',
      [user_id, course_id, 'in_progress']
    );

    const enrollment = await getQuery('SELECT * FROM enrollments WHERE id = ?', [result.id]);

    res.status(201).json({
      message: 'Enrolled successfully',
      enrollment
    });
  } catch (error) {
    next(error);
  }
}

export async function getStudentEnrollments(req, res, next) {
  try {
    const user_id = req.user.id;

    const enrollments = await allQuery(
      `SELECT e.*, c.title as course_title, c.description as course_description 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       WHERE e.user_id = ? 
       ORDER BY e.enrolled_at DESC`,
      [user_id]
    );

    res.json(enrollments);
  } catch (error) {
    next(error);
  }
}

export async function getCourseEnrollments(req, res, next) {
  try {
    const { course_id } = req.params;

    const course = await getQuery('SELECT * FROM courses WHERE id = ?', [course_id]);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.instructor_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only course instructor or admin can view enrollments' });
    }

    const enrollments = await allQuery(
      `SELECT e.*, u.name, u.email 
       FROM enrollments e 
       JOIN users u ON e.user_id = u.id 
       WHERE e.course_id = ? 
       ORDER BY e.enrolled_at DESC`,
      [course_id]
    );

    res.json(enrollments);
  } catch (error) {
    next(error);
  }
}

export async function updateEnrollmentStatus(req, res, next) {
  try {
    const { enrollment_id } = req.params;
    const { status } = req.body;

    if (!['in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const enrollment = await getQuery('SELECT * FROM enrollments WHERE id = ?', [enrollment_id]);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    const course = await getQuery('SELECT * FROM courses WHERE id = ?', [enrollment.course_id]);
    if (course.instructor_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only course instructor or admin can update enrollment' });
    }

    const completedAt = status === 'completed' ? new Date().toISOString() : null;

    await runQuery(
      'UPDATE enrollments SET status = ?, completed_at = ? WHERE id = ?',
      [status, completedAt, enrollment_id]
    );

    const updatedEnrollment = await getQuery('SELECT * FROM enrollments WHERE id = ?', [enrollment_id]);

    res.json({
      message: 'Enrollment status updated',
      enrollment: updatedEnrollment
    });
  } catch (error) {
    next(error);
  }
}

export async function unenroll(req, res, next) {
  try {
    const { enrollment_id } = req.params;
    const user_id = req.user.id;

    const enrollment = await getQuery('SELECT * FROM enrollments WHERE id = ?', [enrollment_id]);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (enrollment.user_id !== user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Can only unenroll from your own courses' });
    }

    await runQuery('DELETE FROM enrollments WHERE id = ?', [enrollment_id]);

    res.json({ message: 'Unenrolled successfully' });
  } catch (error) {
    next(error);
  }
}
