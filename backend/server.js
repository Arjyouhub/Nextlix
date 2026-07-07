import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure db directory exist for fallback
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// ---------------- SEED DATA DEFINITIONS ----------------
const SEED_FILE = path.join(DB_DIR, 'seed.json');

function getSeedData() {
  try {
    if (fs.existsSync(SEED_FILE)) {
      const raw = fs.readFileSync(SEED_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error('Error reading seed.json:', error);
  }
  return {
    projects: [],
    reviews: [],
    analytics: {
      totalViews: 128,
      dailyViews: [
        { date: '2026-07-01', count: 18 },
        { date: '2026-07-02', count: 24 },
        { date: '2026-07-03', count: 32 },
        { date: '2026-07-04', count: 54 }
      ]
    },
    admin: {
      username: 'admin',
      password: 'adminpassword'
    }
  };
}

const defaultSeedData = getSeedData();


// ---------------- MONGOOSE SCHEMAS & MODELS ----------------
const ProjectSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  tech: String,
  desc: String,
  icon: String,
  gradient: String,
  url: String,
  image: String
});
const Project = mongoose.model('Project', ProjectSchema);

const ReviewSchema = new mongoose.Schema({
  id: Number,
  name: String,
  company: String,
  rating: Number,
  comment: String,
  date: String,
  approved: Boolean
});
const Review = mongoose.model('Review', ReviewSchema);

const AnalyticsSchema = new mongoose.Schema({
  totalViews: { type: Number, default: 0 },
  dailyViews: [{ date: String, count: Number }]
});
const Analytics = mongoose.model('Analytics', AnalyticsSchema);

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
const Admin = mongoose.model('Admin', AdminSchema);

// ---------------- DATABASE CONNECTION & SEED FLOW ----------------
let isMongoConnected = false;

if (process.env.MONGODB_URI) {
  console.log('Connecting to MongoDB Atlas...');
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas');
      isMongoConnected = true;
      seedDefaultDataIfEmpty();
    })
    .catch(err => {
      console.warn('MongoDB Atlas connection failed. Falling back to local db.json. Error:', err.message);
      isMongoConnected = false;
    });
} else {
  console.warn('MONGODB_URI not found in .env. Falling back to local db.json.');
}

async function seedDefaultDataIfEmpty() {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(defaultSeedData.projects);
      console.log('Seeded default projects to MongoDB Atlas');
    }
    
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      await Review.insertMany(defaultSeedData.reviews);
      console.log('Seeded default reviews to MongoDB Atlas');
    }

    const analyticsCount = await Analytics.countDocuments();
    if (analyticsCount === 0) {
      await Analytics.create(defaultSeedData.analytics);
      console.log('Seeded default analytics to MongoDB Atlas');
    }

    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(defaultSeedData.admin.password, 10);
      await Admin.create({
        username: defaultSeedData.admin.username,
        password: hashedPassword
      });
      console.log('Seeded default admin credentials to MongoDB Atlas');
    } else {
      // Auto-migrate any unhashed plaintext admin passwords in MongoDB Atlas
      const admins = await Admin.find();
      for (const admin of admins) {
        if (admin.password && !admin.password.startsWith('$2a$') && !admin.password.startsWith('$2b$') && !admin.password.startsWith('$2y$')) {
          console.log(`Hashing plaintext password for MongoDB admin user: ${admin.username}`);
          admin.password = await bcrypt.hash(admin.password, 10);
          await admin.save();
        }
      }
    }
  } catch (error) {
    console.error('Error seeding MongoDB Atlas data:', error);
  }
}

// ---------------- LOCAL DATABASE FALLBACK READ/WRITE ----------------
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const seedCopy = JSON.parse(JSON.stringify(defaultSeedData));
      if (seedCopy.admin && seedCopy.admin.password) {
        seedCopy.admin.password = bcrypt.hashSync(seedCopy.admin.password, 10);
      }
      writeDb(seedCopy);
      return seedCopy;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const db = JSON.parse(raw);
    if (!db.admin) {
      db.admin = { ...defaultSeedData.admin };
    }
    
    // Auto-migrate any unhashed plaintext admin password in local db.json
    if (db.admin && db.admin.password && !db.admin.password.startsWith('$2a$') && !db.admin.password.startsWith('$2b$') && !db.admin.password.startsWith('$2y$')) {
      console.log('Hashing plaintext password for local JSON admin');
      db.admin.password = bcrypt.hashSync(db.admin.password, 10);
      writeDb(db);
    }
    
    return db;
  } catch (error) {
    console.error('Error reading JSON database:', error);
    return defaultSeedData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to JSON database:', error);
  }
}

// ---------------- API ENDPOINTS ----------------

// PROJECTS ENDPOINTS
app.get('/api/projects', async (req, res) => {
  if (isMongoConnected) {
    try {
      const projects = await Project.find();
      return res.json(projects);
    } catch (e) {
      console.error('Mongo fetch projects failed, falling back:', e);
    }
  }
  const db = readDb();
  res.json(db.projects || []);
});

app.post('/api/projects', async (req, res) => {
  const projectData = {
    title: req.body.title || 'Untitled Project',
    category: req.body.category || 'web',
    tech: req.body.tech || 'React',
    desc: req.body.desc || '',
    icon: req.body.icon || 'fa-globe',
    gradient: req.body.gradient || 'bg-gradient-cyan',
    url: req.body.url || '',
    image: req.body.image || ''
  };

  if (isMongoConnected) {
    try {
      const newProj = new Project({ id: Date.now(), ...projectData });
      await newProj.save();
      return res.status(201).json(newProj);
    } catch (e) {
      console.error('Mongo save project failed, falling back:', e);
    }
  }

  const db = readDb();
  const newProj = { id: Date.now(), ...projectData };
  db.projects = db.projects || [];
  db.projects.push(newProj);
  writeDb(db);
  res.status(201).json(newProj);
});

app.delete('/api/projects/:id', async (req, res) => {
  const idStr = req.params.id;
  if (isMongoConnected) {
    try {
      if (mongoose.Types.ObjectId.isValid(idStr)) {
        await Project.findByIdAndDelete(idStr);
      } else {
        await Project.deleteOne({ id: parseInt(idStr, 10) });
      }
      return res.json({ success: true, message: 'Project deleted successfully from Atlas' });
    } catch (e) {
      console.error('Mongo delete project failed, falling back:', e);
    }
  }

  const db = readDb();
  const id = parseInt(idStr, 10);
  db.projects = (db.projects || []).filter(p => p.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Project deleted successfully from JSON DB' });
});


// REVIEWS ENDPOINTS
app.get('/api/reviews', async (req, res) => {
  if (isMongoConnected) {
    try {
      const reviews = await Review.find();
      return res.json(reviews);
    } catch (e) {
      console.error('Mongo fetch reviews failed, falling back:', e);
    }
  }
  const db = readDb();
  res.json(db.reviews || []);
});

app.post('/api/reviews', async (req, res) => {
  const reviewData = {
    name: req.body.name || 'Anonymous User',
    company: req.body.company || 'Visitor',
    rating: parseInt(req.body.rating, 10) || 5,
    comment: req.body.comment || '',
    date: new Date().toISOString().split('T')[0],
    approved: req.body.approved !== undefined ? req.body.approved : true
  };

  if (isMongoConnected) {
    try {
      const newRev = new Review({ id: Date.now(), ...reviewData });
      await newRev.save();
      return res.status(201).json(newRev);
    } catch (e) {
      console.error('Mongo save review failed, falling back:', e);
    }
  }

  const db = readDb();
  const newRev = { id: Date.now(), ...reviewData };
  db.reviews = db.reviews || [];
  db.reviews.push(newRev);
  writeDb(db);
  res.status(201).json(newRev);
});

app.put('/api/reviews/:id/approve', async (req, res) => {
  const idStr = req.params.id;
  if (isMongoConnected) {
    try {
      let rev = null;
      if (mongoose.Types.ObjectId.isValid(idStr)) {
        rev = await Review.findById(idStr);
      } else {
        rev = await Review.findOne({ id: parseInt(idStr, 10) });
      }

      if (rev) {
        rev.approved = !rev.approved;
        await rev.save();
        return res.json({ success: true, message: 'Review approval toggled successfully' });
      }
    } catch (e) {
      console.error('Mongo approve review failed, falling back:', e);
    }
  }

  const db = readDb();
  const id = parseInt(idStr, 10);
  let updated = false;
  db.reviews = (db.reviews || []).map(r => {
    if (r.id === id) {
      r.approved = !r.approved;
      updated = true;
    }
    return r;
  });
  if (updated) {
    writeDb(db);
    res.json({ success: true, message: 'Review approval toggled successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Review not found' });
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  const idStr = req.params.id;
  if (isMongoConnected) {
    try {
      if (mongoose.Types.ObjectId.isValid(idStr)) {
        await Review.findByIdAndDelete(idStr);
      } else {
        await Review.deleteOne({ id: parseInt(idStr, 10) });
      }
      return res.json({ success: true, message: 'Review deleted successfully' });
    } catch (e) {
      console.error('Mongo delete review failed, falling back:', e);
    }
  }

  const db = readDb();
  const id = parseInt(idStr, 10);
  db.reviews = (db.reviews || []).filter(r => r.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Review deleted successfully' });
});


// ANALYTICS ENDPOINTS
app.get('/api/analytics', async (req, res) => {
  if (isMongoConnected) {
    try {
      let stats = await Analytics.findOne();
      if (!stats) {
        stats = await Analytics.create({ totalViews: 0, dailyViews: [] });
      }
      return res.json(stats);
    } catch (e) {
      console.error('Mongo fetch analytics failed, falling back:', e);
    }
  }
  const db = readDb();
  res.json(db.analytics || { totalViews: 0, dailyViews: [] });
});

app.post('/api/analytics/view', async (req, res) => {
  const todayStr = new Date().toISOString().split('T')[0];

  if (isMongoConnected) {
    try {
      let stats = await Analytics.findOne();
      if (!stats) {
        stats = new Analytics({ totalViews: 0, dailyViews: [] });
      }

      stats.totalViews += 1;
      const dailyIndex = stats.dailyViews.findIndex(dv => dv.date === todayStr);
      if (dailyIndex > -1) {
        stats.dailyViews[dailyIndex].count += 1;
      } else {
        stats.dailyViews.push({ date: todayStr, count: 1 });
      }

      await stats.save();
      return res.json(stats);
    } catch (e) {
      console.error('Mongo save pageview failed, falling back:', e);
    }
  }

  const db = readDb();
  db.analytics = db.analytics || { totalViews: 0, dailyViews: [] };
  db.analytics.totalViews = (db.analytics.totalViews || 0) + 1;
  const dailyIndex = db.analytics.dailyViews.findIndex(dv => dv.date === todayStr);
  if (dailyIndex > -1) {
    db.analytics.dailyViews[dailyIndex].count += 1;
  } else {
    db.analytics.dailyViews.push({ date: todayStr, count: 1 });
  }
  writeDb(db);
  res.json(db.analytics);
});

// ADMIN AUTH & SETTINGS ENDPOINTS
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  if (isMongoConnected) {
    try {
      const admin = await Admin.findOne({ username });
      if (admin && await bcrypt.compare(password, admin.password)) {
        return res.json({ success: true, message: 'Logged in successfully' });
      }
    } catch (e) {
      console.error('Mongo admin login failed, falling back:', e);
    }
  }

  const db = readDb();
  if (db.admin && db.admin.username === username && await bcrypt.compare(password, db.admin.password)) {
    return res.json({ success: true, message: 'Logged in successfully' });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password credentials.' });
});

app.put('/api/admin/settings', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (isMongoConnected) {
      try {
        let admin = await Admin.findOne();
        if (!admin) {
          admin = new Admin({ username, password: hashedPassword });
        } else {
          admin.username = username;
          admin.password = hashedPassword;
        }
        await admin.save();
        return res.json({ success: true, message: 'Admin credentials updated successfully in Atlas' });
      } catch (e) {
        console.error('Mongo admin settings update failed, falling back:', e);
      }
    }

    const db = readDb();
    db.admin = { username, password: hashedPassword };
    writeDb(db);
    res.json({ success: true, message: 'Admin credentials updated successfully in JSON DB' });
  } catch (error) {
    console.error('Error hashing updated credentials:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
