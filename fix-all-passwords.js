// Fix all user passwords in the database
// This script will reset all passwords to "password123" with a known working hash

db = db.getSiblingDB('epcr');

// This is a BCrypt hash for "password123" that we know works
const workingHash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

print('========================================');
print('Resetting All User Passwords');
print('========================================');
print('');

// Get all users
const users = db.users.find({}, {username: 1}).toArray();

print(`Found ${users.length} users`);
print('');

// Update each user
users.forEach(user => {
    const result = db.users.updateOne(
        { _id: user._id },
        { 
            $set: { 
                password: workingHash,
                updatedAt: new Date()
            } 
        }
    );
    
    if (result.modifiedCount > 0) {
        print(`✅ ${user.username} - Password reset`);
    } else {
        print(`⚠️  ${user.username} - No change needed`);
    }
});

print('');
print('========================================');
print('Password Reset Complete');
print('========================================');
print('');
print('All users now have password: password123');
print('');
print('Test accounts:');
print('  admin / password123');
print('  paramedic1 / password123');
print('  qamanager / password123');
print('  Ashutosh93 / password123');
print('');
