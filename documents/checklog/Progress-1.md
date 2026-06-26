# Progress Log 1

Date: 2026-04-05

## Summary
- Project direction confirmed: Render + MongoDB backend.
- Phase-0 completed (requirements + flows locked).
- Login demo mode implemented for 3 roles (resident/manager/worker).

## Phase-0 Decisions (Locked)
- Auth: Email/password.
- Payments: Demo/replica only (no real gateway yet).
- Amenities: Manager approval required.

## Roles & Access (Baseline)
- Resident: notices, events, amenities booking request, complaints, payments (demo), visitors pre-approval, profile edit.
- Manager: create notices/events, review/assign complaints, verify payments, approve visitors, approve amenities, manage residents/workers.
- Worker: view assigned tasks, update status, profile update, notifications.

## Core Flows (Baseline)
- Complaints: Resident → Manager assigns → Worker updates → Manager closes → Resident notified.
- Payments (demo): Resident submits → Manager approves/rejects → Resident sees status.
- Visitors: Resident requests → Manager approves/denies → Resident sees status.
- Amenities: Resident requests → Manager approves/denies → Resident sees status.
- Notices/Events: Manager posts → Residents view.

## Notes
- Demo credentials for login (temporary):
  - resident@urbanhive.com / resident123
  - manager@urbanhive.com / manager123
  - worker@urbanhive.com / worker123
