exports.up = (pgm) => {
  pgm.addColumn('users', {
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP')
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('users', 'created_at');
};

