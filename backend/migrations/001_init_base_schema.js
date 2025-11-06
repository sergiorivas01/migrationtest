exports.up = (pgm) => {
  // Users table
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(320)', notNull: true },
    phone: { type: 'varchar(50)' },
    city: { type: 'varchar(120)' },
    company: { type: 'varchar(255)' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
  });

  // Unique email for users
  pgm.addConstraint('users', 'users_email_unique', {
    unique: ['email'],
  });

  // Posts table
  pgm.createTable('posts', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    body: { type: 'text' },
    user_id: { type: 'integer', notNull: true },
  });

  // FK posts.user_id -> users.id
  pgm.addConstraint('posts', 'posts_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'cascade',
    },
  });

  // Index for posts.user_id
  pgm.createIndex('posts', 'user_id');

  // Todos table
  pgm.createTable('todos', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    completed: { type: 'boolean', notNull: true, default: false },
  });

  // Helpful index on completed
  pgm.createIndex('todos', 'completed');
};

exports.down = (pgm) => {
  pgm.dropIndex('todos', 'completed');
  pgm.dropTable('todos');

  pgm.dropIndex('posts', 'user_id');
  pgm.dropConstraint('posts', 'posts_user_id_fkey');
  pgm.dropTable('posts');

  pgm.dropConstraint('users', 'users_email_unique');
  pgm.dropTable('users');
};


