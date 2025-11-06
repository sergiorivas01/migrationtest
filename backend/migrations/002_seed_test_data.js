exports.up = (pgm) => {
  // Seed users (avoid duplicates by email)
  pgm.sql(`
    INSERT INTO users (name, email, phone, city, company)
    SELECT * FROM (
      VALUES
        ('Alice Johnson', 'alice@example.com', '555-1001', 'Seattle', 'Contoso'),
        ('Bob Smith', 'bob@example.com', '555-1002', 'New York', 'Fabrikam'),
        ('Carol Perez', 'carol@example.com', '555-1003', 'Austin', 'Adventure Works')
    ) AS v(name, email, phone, city, company)
    WHERE NOT EXISTS (
      SELECT 1 FROM users u WHERE u.email = v.email
    );
  `);

  // Seed posts linked to users by email (avoid duplicates by title + author)
  pgm.sql(`
    INSERT INTO posts (title, body, user_id)
    SELECT p.title, p.body, u.id
    FROM (
      VALUES
        ('Hello Azure', 'First post in Azure!', 'alice@example.com'),
        ('Tips & Tricks', 'Some useful tips...', 'alice@example.com'),
        ('My Journey', 'Sharing my journey.', 'bob@example.com')
    ) AS p(title, body, user_email)
    JOIN users u ON u.email = p.user_email
    WHERE NOT EXISTS (
      SELECT 1 FROM posts px
      WHERE px.title = p.title AND px.user_id = u.id
    );
  `);

  // Seed todos (avoid duplicates by title)
  pgm.sql(`
    INSERT INTO todos (title, completed)
    SELECT * FROM (
      VALUES
        ('Set up CI pipeline', true),
        ('Configure SSL for DB', true),
        ('Write API docs', false)
    ) AS t(title, completed)
    WHERE NOT EXISTS (
      SELECT 1 FROM todos td WHERE td.title = t.title
    );
  `);
};

exports.down = (pgm) => {
  // Remove seeded data
  pgm.sql(`
    DELETE FROM posts
    WHERE (title, user_id) IN (
      SELECT 'Hello Azure', id FROM users WHERE email = 'alice@example.com'
      UNION ALL
      SELECT 'Tips & Tricks', id FROM users WHERE email = 'alice@example.com'
      UNION ALL
      SELECT 'My Journey', id FROM users WHERE email = 'bob@example.com'
    );

    DELETE FROM todos WHERE title IN (
      'Set up CI pipeline',
      'Configure SSL for DB',
      'Write API docs'
    );

    DELETE FROM users WHERE email IN (
      'alice@example.com',
      'bob@example.com',
      'carol@example.com'
    );
  `);
};


