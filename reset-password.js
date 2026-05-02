// Connect to the epcr database
db = db.getSiblingDB('epcr');

// BCrypt hash for "password123" - this is a known working hash
const newPasswordHash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

// Update the password for Ashutosh93
const result = db.users.updateOne(
    { username: 'Ashutosh93' },
    { 
        $set: { 
            password: newPasswordHash,
            updatedAt: new Date()
        } 
    }
);

if (result.modifiedCount > 0) {
    print('✅ Password reset successfully for user: Ashutosh93');
    print('');
    print('Login credentials:');
    print('  Username: Ashutosh93');
    print('  Password: password123');
    print('');
    print('Please try logging in now with these credentials.');
} else {
    print('❌ Failed to reset password. User might not exist.');
}

// Show the updated user
print('\nUpdated user details:');
const user = db.users.findOne({ username: 'Ashutosh93' }, { password: 0 });
printjson(user);
