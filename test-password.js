// Test if the password hash matches
const bcrypt = require('bcryptjs');

const password = 'password123';
const hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

console.log('Testing password:', password);
console.log('Against hash:', hash);
console.log('');

bcrypt.compare(password, hash, function(err, result) {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Match result:', result);
        if (result) {
            console.log('✅ Password matches!');
        } else {
            console.log('❌ Password does NOT match!');
        }
    }
});

// Also generate a new hash to compare
bcrypt.hash(password, 10, function(err, newHash) {
    if (err) {
        console.error('Error generating hash:', err);
    } else {
        console.log('');
        console.log('New hash generated:', newHash);
        console.log('');
        
        // Test the new hash
        bcrypt.compare(password, newHash, function(err, result) {
            if (result) {
                console.log('✅ New hash works correctly');
            } else {
                console.log('❌ New hash failed');
            }
        });
    }
});
