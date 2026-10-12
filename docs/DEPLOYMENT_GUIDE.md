# 🚀 Deployment Guide: ThePapare Events

This guide covers production deployment on a Linux Ubuntu/Debian VPS using Nginx, PM2, or Docker Compose.

---

## 1. Prerequisites

- Linux Server (Ubuntu 22.04 LTS or 24.04 LTS recommended)
- Node.js v22+ and npm
- MongoDB Atlas cluster URI or local MongoDB instance
- Domain pointed to VPS IP (`thepapare.events` and `www.thepapare.events`)
- Cloudinary credentials (for uploaded production media)
- SMTP credentials (for inquiry email notifications)

---

## 2. Option A: Bare-Metal / PM2 Deployment (Recommended)

### Step 1: Clone & Configure
```bash
git clone <repository_url> /var/www/thepapare-events
cd /var/www/thepapare-events
cp .env.example .env
nano .env # Populate MONGODB_URI, SESSION_SECRET, CLOUDINARY, SMTP
```

### Step 2: Install & Build
```bash
npm install
npm run build
```

### Step 3: Seed Initial Data
```bash
npm run seed
```

### Step 4: Start Process Manager (PM2)
```bash
npm install -g pm2
pm2 start infrastructure/pm2/ecosystem.config.js
pm2 save
pm2 startup
```

### Step 5: Configure Nginx & SSL
```bash
sudo cp infrastructure/nginx/thepapare.conf /etc/nginx/sites-available/thepapare.events
sudo ln -s /etc/nginx/sites-available/thepapare.events /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install SSL with Certbot
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d thepapare.events -d www.thepapare.events
```

---

## 3. Option B: Docker Compose Deployment

```bash
# Build and run containers in background
docker compose up -d --build

# View logs
docker compose logs -f

# Run database seed inside api container
docker compose exec api npm run seed
```

---

## 4. Verification

1. **API Health**: Visit `https://thepapare.events/api/v1/health`
2. **Public Website**: Visit `https://thepapare.events/`
3. **Administration Console**: Visit `https://thepapare.events/admin/login`
   - Default Initial Admin: `admin@thepapare.events`
   - Initial Password: as configured in `.env` (`AdminPapare2026!Secure`)

