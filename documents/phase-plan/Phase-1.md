# Phase-1 Spec (Locked)

## Scope
Phase-1 defines the MongoDB data model and the REST API map for Urban Hive (Render + MongoDB stack).

## Collections
1) users
- _id
- name
- email (unique)
- passwordHash
- role (resident | manager | worker)
- flatNo (resident only)
- designation (manager only, optional)
- workerType (worker only, optional)
- buildingId (optional for multi-society)
- createdAt, updatedAt

Indexes:
- email (unique)
- role, buildingId

2) notices
- _id
- title
- message
- createdBy (managerId)
- targetScope (all | building | role)
- targetRole (optional)
- buildingId
- createdAt

Indexes:
- buildingId, createdAt

3) complaints
- _id
- title
- description
- residentId
- managerId
- workerId (optional)
- status (new | assigned | in_progress | resolved | closed)
- priority (low | medium | high)
- timeline (array of updates)
- createdAt, updatedAt

Indexes:
- residentId, managerId, workerId, status, buildingId

4) payments (demo)
- _id
- residentId
- managerId
- amount
- status (pending | approved | rejected)
- mode (cash | upi | card | bank)
- receiptUrl (optional)
- month
- createdAt, verifiedAt

Indexes:
- residentId, status, month

5) visitors
- _id
- residentId
- managerId
- name
- phone
- visitDate
- status (requested | approved | denied | entered)
- createdAt, updatedAt

Indexes:
- residentId, status, visitDate

6) events
- _id
- title
- description
- date
- createdBy (managerId)
- buildingId
- createdAt

Indexes:
- buildingId, date

7) amenities
- _id
- name
- description
- availability (optional time slots)
- createdBy (managerId)
- buildingId
- createdAt

Indexes:
- buildingId

8) amenityBookings
- _id
- amenityId
- residentId
- managerId
- date
- timeSlot
- status (requested | approved | declined | completed)
- createdAt, updatedAt

Indexes:
- amenityId, residentId, status, date

9) notifications
- _id
- userId
- type (notice | complaint | payment | visitor | amenity)
- title
- message
- refId (id of related doc)
- read (boolean)
- createdAt

Indexes:
- userId, read, createdAt

## API Map (REST)
Auth:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Users (Manager only):
- GET /api/users?role=resident|worker
- POST /api/users (create worker/resident)
- PATCH /api/users/:id

Notices:
- POST /api/notices (manager)
- GET /api/notices (role filtered)
- DELETE /api/notices/:id (manager)

Complaints:
- POST /api/complaints (resident)
- GET /api/complaints (role filtered)
- PATCH /api/complaints/:id (assign/update/close)

Payments (demo):
- POST /api/payments (resident)
- GET /api/payments (role filtered)
- PATCH /api/payments/:id/verify (manager approve/reject)

Visitors:
- POST /api/visitors (resident)
- GET /api/visitors (role filtered)
- PATCH /api/visitors/:id (manager approve/deny/entered)

Events:
- POST /api/events (manager)
- GET /api/events (all)

Amenities:
- POST /api/amenities (manager)
- GET /api/amenities (all)

Amenity Bookings:
- POST /api/amenity-bookings (resident)
- GET /api/amenity-bookings (role filtered)
- PATCH /api/amenity-bookings/:id (manager approve/decline)

Notifications:
- GET /api/notifications (user)
- PATCH /api/notifications/:id/read

## Role Rules (Summary)
- Resident: create complaints/payments/visitors/amenity bookings; view own records.
- Manager: assign/verify/approve + create notices/events/amenities.
- Worker: view assigned complaints/tasks only.
