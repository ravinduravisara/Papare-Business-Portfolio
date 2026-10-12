# 📡 API Specification: ThePapare Events REST API

Base URL: `/api/v1`

All responses follow standard JSON structures:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional human-readable confirmation"
}
```

---

## 1. Public Endpoints

### 1.1 Health Check
- **`GET /api/v1/health`**
- **Response `200`**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-10-12T16:47:00.000Z",
    "service": "ThePapare Events API",
    "version": "1.0.0",
    "database": "connected"
  }
  ```

### 1.2 Projects
- **`GET /api/v1/projects`**
  - **Query Parameters**:
    - `category`: string (e.g. `Automotive Experiences`, `Corporate Events`)
    - `featured`: boolean (`true` or `false`)
    - `search`: string
  - Returns only published projects sorted by `displayOrder`.
- **`GET /api/v1/projects/:slug`**
  - Returns single published project matching `:slug`. Returns `404` if not found or unpublished.

### 1.3 Services
- **`GET /api/v1/services`**
  - Returns published services sorted by `displayOrder`.
- **`GET /api/v1/services/:slug`**
  - Returns single published service matching `:slug`. Returns `404` if not found.

### 1.4 Clients
- **`GET /api/v1/clients`**
  - Returns visible client partner brands sorted by `displayOrder`.

### 1.5 Website Settings
- **`GET /api/v1/settings`**
  - Returns active corporate brand details, contact information, social URLs, and default SEO tags.

### 1.6 Page Content
- **`GET /api/v1/pages/:slug`**
  - Returns dynamic page sections for `:slug` (e.g. `home`, `about`).

### 1.7 Submit Inquiry
- **`POST /api/v1/inquiries`**
  - Rate Limited: 10 inquiries per 15 minutes.
  - Validated via `inquirySchema`.
  - **Payload**:
    ```json
    {
      "fullName": "Ruwan Perera",
      "company": "Dialog Axiata",
      "email": "ruwan@dialog.lk",
      "phone": "+94 77 123 4567",
      "service": "Events & Experiences",
      "projectDate": "November 2026",
      "budget": "LKR 5,000,000",
      "message": "Planning an annual corporate summit for 800 attendees.",
      "privacyConsent": true
    }
    ```
  - **Response `201`**: Stored in MongoDB and triggers asynchronous SMTP notification.

---

## 2. Authentication Endpoints

- **`POST /api/v1/auth/login`**
  - Rate Limited: 15 attempts per 15 minutes.
  - Body: `{ "email": "...", "password": "..." }`
  - Creates HTTP-only secure cookie session `thepapare.sid`.
- **`POST /api/v1/auth/logout`**
  - Destroys active session and revokes cookie.
- **`GET /api/v1/auth/me`**
  - Returns active admin session user if authenticated, or `401 Unauthorized`.

---

## 3. Protected Administration Endpoints (Requires Session)

### Projects
- `GET /api/v1/projects/admin/all` - Returns all projects including unpublished drafts.
- `POST /api/v1/projects` - Create project.
- `PATCH /api/v1/projects/:id` - Update project attributes.
- `DELETE /api/v1/projects/:id` - Remove project.

### Services
- `GET /api/v1/services/admin/all` - Returns all services.
- `POST /api/v1/services` - Create service.
- `PATCH /api/v1/services/:id` - Update service.
- `DELETE /api/v1/services/:id` - Delete service.

### Clients
- `GET /api/v1/clients/admin/all` - Returns all clients.
- `POST /api/v1/clients` - Add client.
- `PATCH /api/v1/clients/:id` - Edit client.
- `DELETE /api/v1/clients/:id` - Remove client.

### Inquiries
- `GET /api/v1/inquiries` - List inquiries with filtering by status, service, and search query.
- `GET /api/v1/inquiries/:id` - Get full inquiry details.
- `PATCH /api/v1/inquiries/:id` - Update status (`New`, `Contacted`, `In Progress`, `Completed`, `Archived`).
- `DELETE /api/v1/inquiries/:id` - Remove/archive inquiry record.

### Media
- `POST /api/v1/media` - Multipart file upload (`file` key, max 25MB) to Cloudinary.
- `GET /api/v1/media` - List uploaded assets.
- `DELETE /api/v1/media/:id` - Safe removal from Cloudinary and MongoDB.

### Settings
- `GET /api/v1/settings/stats` - Returns dashboard overview analytics.
- `PATCH /api/v1/settings` - Update corporate site settings.

