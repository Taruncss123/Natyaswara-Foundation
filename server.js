const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// --- Helper Function to Read DB ---
function readDatabase() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading database:", err);
        return {}; // Return empty object on error
    }
}

// --- API Endpoints for Content (GET) ---

// Get all classes
app.get('/api/classes', (req, res) => {
    const db = readDatabase();
    res.json(db.classes || []);
});

// Get all productions
app.get('/api/productions', (req, res) => {
    const db = readDatabase();
    res.json(db.productions || []);
});

// Get all media
app.get('/api/media', (req, res) => {
    const db = readDatabase();
    res.json(db.media || []);
});

// Get all *approved* testimonials
app.get('/api/testimonials', (req, res) => {
    const db = readDatabase();
    const approvedTestimonials = (db.testimonials || []).filter(t => t.approved === true);
    res.json(approvedTestimonials);
});

// Get all blogs
app.get('/api/blogs', (req, res) => {
    const db = readDatabase();
    // Add IDs to blogs if they don't have them (for modal lookup)
    const blogsWithIds = (db.blogs || []).map((blog, index) => ({
        id: blog.id || `blog-${index}`,
        ...blog
    }));
    res.json(blogsWithIds);
});

// --- API Endpoints for Forms (POST) ---
// For a production app, these should write to a real database (e.g., MongoDB, PostgreSQL),
// as Render's filesystem is ephemeral. For now, we just log to the console.

app.post('/api/enroll', (req, res) => {
    console.log('--- NEW ENROLLMENT ---');
    console.log(req.body);
    console.log('------------------------');
    res.status(200).json({ status: 'success', message: 'Enrollment received' });
});

app.post('/api/book-ticket', (req, res) => {
    console.log('--- NEW TICKET BOOKING ---');
    console.log(req.body);
    console.log('----------------------------');
    res.status(200).json({ status: 'success', message: 'Booking received' });
});

app.post('/api/review', (req, res) => {
    // Add 'approved: false' to the submitted review data
    const newReview = { ...req.body, approved: false };
    console.log('--- NEW REVIEW (Awaiting Approval) ---');
    console.log(newReview);
    console.log('--------------------------------------');
    // In a real app, you'd save this to a "reviews" collection in your DB
    res.status(200).json({ status: 'success', message: 'Review received and awaiting approval' });
});

app.post('/api/contact', (req, res) => {
    console.log('--- NEW CONTACT FORM ---');
    console.log(req.body);
    console.log('--------------------------');
    res.status(200).json({ status: 'success', message: 'Contact message received' });
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Natyaswara backend server running on port ${PORT}`);
});