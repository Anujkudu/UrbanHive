# Phase-Wise Plan (Urban Hive)

## Phase-0: Product Definition (Completed)
Goal: lock features, roles, flows, and constraints before DB/API work.
- Roles & permissions matrix
- Module list + status flows
- Notifications/events list
- Decision lock-in (auth, payments demo, amenities approval)

## Phase-1: Data Model + API Map (Next)
Goal: design MongoDB collections and REST endpoints.
- Collections: users, notices, complaints, payments, visitors, events, amenities, amenityBookings, notifications
- Standard fields + indexes
- Role-based access rules
- API list for each module (CRUD + status updates)

## Phase-2: Auth + Role Routing
Goal: working login with role-based dashboard routing.
- Email/password flow
- JWT/session handling (server)
- Frontend route guards

## Phase-3: Core Workflows
Goal: end-to-end data flow for critical modules.
- Complaints pipeline (assign/resolve)
- Payments (demo submit + manager verify)
- Visitors (request/approve/entry)
- Notices (manager → resident)

## Phase-4: Secondary Modules
Goal: complete remaining features.
- Events (manager posts → residents view)
- Amenities (request/approve)
- Profile (edit + update)
- Notifications (in-app)

## Phase-5: UI Integration
Goal: replace static data with live DB data.
- Loading/empty/error states
- Role-appropriate views and buttons

## Phase-6: Security + Validation
Goal: protect data and prevent abuse.
- Server-side role checks
- Input validation and sanitization
- CORS configuration

## Phase-7: Deployment (Render + MongoDB Atlas)
Goal: production-ready deployment.
- Environment variables
- Build & start scripts
- CORS and domain setup
- Health checks

## Phase-8: Polish + Enhancements
Goal: improve UX and scalability.
- Audit logs
- Real payment gateway (future)
- Analytics / monitoring
