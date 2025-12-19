const API_BASE_URL = '/api';

export const auth = {
  setToken(token) {
    localStorage.setItem('auth_token', token);
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  removeToken() {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async register(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (response.ok) {
      this.setToken(data.token);
    }
    return { ok: response.ok, data };
  },

  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      this.setToken(data.token);
    }
    return { ok: response.ok, data };
  },

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeader()
    });
    return response.json();
  },

  logout() {
    this.removeToken();
  },

  getAuthHeader() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};

export const courses = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/courses`);
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`);
    return response.json();
  },

  async create(title, description) {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      },
      body: JSON.stringify({ title, description })
    });
    return response.json();
  },

  async update(id, title, description) {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      },
      body: JSON.stringify({ title, description })
    });
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: auth.getAuthHeader()
    });
    return response.json();
  },

  async getAdminCourses() {
    const response = await fetch(`${API_BASE_URL}/courses/admin/my-courses`, {
      headers: auth.getAuthHeader()
    });
    return response.json();
  }
};

export const enrollments = {
  async enroll(courseId) {
    const response = await fetch(`${API_BASE_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      },
      body: JSON.stringify({ course_id: courseId })
    });
    return response.json();
  },

  async getMyEnrollments() {
    const response = await fetch(`${API_BASE_URL}/enrollments/my-enrollments`, {
      headers: auth.getAuthHeader()
    });
    return response.json();
  },

  async getCourseEnrollments(courseId) {
    const response = await fetch(`${API_BASE_URL}/enrollments/course/${courseId}`, {
      headers: auth.getAuthHeader()
    });
    return response.json();
  },

  async updateStatus(enrollmentId, status) {
    const response = await fetch(`${API_BASE_URL}/enrollments/${enrollmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  async unenroll(enrollmentId) {
    const response = await fetch(`${API_BASE_URL}/enrollments/${enrollmentId}`, {
      method: 'DELETE',
      headers: auth.getAuthHeader()
    });
    return response.json();
  }
};
