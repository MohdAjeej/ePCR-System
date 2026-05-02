// Connect to the epcr database
db = db.getSiblingDB('epcr');

// Check if user already exists
const existingUser = db.users.findOne({ username: 'Ashutosh93' });

if (existingUser) {
    print('User Ashutosh93 already exists!');
} else {
    // Create the user with BCrypt hashed password
    // Note: This is a pre-hashed password for "password123"
    // In production, passwords should be hashed by the backend
    const user = {
        username: 'Ashutosh93',
        email: 'ashutosh93@example.com',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // password123
        role: 'PARAMEDIC',
        organizationId: null,
        organizationName: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    db.users.insertOne(user);
    print('User Ashutosh93 created successfully!');
    print('Username: Ashutosh93');
    print('Password: password123');
    print('Role: PARAMEDIC');
}

// List all users
print('\nAll users in database:');
db.users.find({}, { username: 1, email: 1, role: 1 }).forEach(printjson);
