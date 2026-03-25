const http = require('http');

function test(path) {
    const req = http.get(`http://localhost:5000${path}`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(`\n--- Test ${path} ---`);
            console.log('Status code:', res.statusCode);
            if (res.statusCode !== 404) {
                console.log('Response body:', data);
            }
        });
    });
    req.on('error', (e) => {
        console.error('Request error:', e.message);
    });
    req.end();
}

test('/api/students/recent');
test('/api/v1/students/recent');
test('/api/v1/admin/dashboard');
