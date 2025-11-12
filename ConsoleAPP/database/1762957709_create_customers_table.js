exports.up = (pgm) => {
  // Customers table
  pgm.createTable('customers', {
    id: 'id',
    first_name: { type: 'varchar(255)', notNull: true },
    last_name: { type: 'varchar(255)', notNull: true },
    role: { type: 'varchar(100)', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
  });

  // Index for role (useful for filtering)
  pgm.createIndex('customers', 'role');
  
  // Index for last_name (useful for searching)
  pgm.createIndex('customers', 'last_name');
};

exports.down = (pgm) => {
  pgm.dropIndex('customers', 'last_name');
  pgm.dropIndex('customers', 'role');
  pgm.dropTable('customers');
};

