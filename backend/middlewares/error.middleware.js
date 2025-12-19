export function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err.message.includes('UNIQUE constraint failed')) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  if (err.message.includes('FOREIGN KEY')) {
    return res.status(400).json({ error: 'Invalid reference' });
  }

  res.status(500).json({ error: 'Internal server error' });
}

export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
