# API Integration Documentation

## Project

FixItNow - Home Service Platform

Frontend: Next.js + TypeScript

Backend API:
https://fixitnow-backend-uy5z.vercel.app

---

## 1. Authentication APIs

### Register

**Method:** POST

**Endpoint:**
`/api/users/register`

**Frontend Usage:**
Used for customer and technician registration.

**Frontend File:**
`app/(authGroup)/_actions/authActions.ts`

---

### Login

**Method:** POST

**Endpoint:**
`/api/auth/login`

**Frontend Usage:**
Used for user login and authentication.

**Frontend File:**
`app/(authGroup)/_actions/authActions.ts`

After successful login, authentication tokens are stored in HTTP-only cookies.

---

## 2. Service APIs

### Get All Services

**Method:** GET

**Endpoint:**
`/api/services`

**Frontend Usage:**
Displays available home services.

**Frontend Files:**

- `app/(publicGroup)/_actions/getServices.ts`
- `app/(publicGroup)/services/page.tsx`

---

### Create Service

**Method:** POST

**Endpoint:**
`/api/services`

**Frontend Usage:**
Technicians can create a service with title, description, price and category.

**Frontend File:**
Technician service management page.

---

### Delete Service

**Method:** DELETE

**Endpoint:**
`/api/services/:id`

**Frontend Usage:**
Technicians can delete their services.

**Frontend File:**
`app/(dashboardGroup)/technician-dashboard/_actions/technicianServiceActions.ts`

---

## 3. Category APIs

### Get Categories

**Method:** GET

**Endpoint:**
`/api/categories`

**Frontend Usage:**
Used to display service categories and filter services.

**Frontend Files:**

- `app/(publicGroup)/_actions/technicianCategoryActions.ts`
- Technician service management

---

### Create Category

**Method:** POST

**Endpoint:**
`/api/categories`

**Frontend Usage:**
Admin can create a new service category.

**Frontend File:**
`app/(dashboardGroup)/admin-dashboard/categories`

---

### Update Category

**Method:** PATCH

**Endpoint:**
`/api/categories/:id`

**Frontend Usage:**
Admin can update an existing category.

**Frontend File:**
Admin category management page.

---

### Delete Category

**Method:** DELETE

**Endpoint:**
`/api/categories/:id`

**Frontend Usage:**
Admin can remove a service category.

**Frontend File:**
Admin category management page.

---

## 4. Technician APIs

### Get All Technicians

**Method:** GET

**Endpoint:**
`/api/technicians`

**Frontend Usage:**
Displays available technicians.

**Frontend File:**
`app/(publicGroup)/_actions/getTechnicians.ts`

---

### Get Technician By ID

**Method:** GET

**Endpoint:**
`/api/technicians/:id`

**Frontend Usage:**
Displays technician profile, experience, rating, location and services.

**Frontend File:**
`app/(publicGroup)/_actions/getTechnicianById.ts`

---

### Technician Profile

**Method:** GET

**Endpoint:**
`/api/technician/profile`

**Frontend Usage:**
Used in the technician dashboard to display technician profile information.

**Frontend File:**
Technician dashboard profile page.

---

### Update Technician Profile

**Method:** PATCH

**Endpoint:**
`/api/technician/profile`

**Frontend Usage:**
Technicians can update experience, skills, location and profile information.

**Frontend File:**
Technician profile management.

---

## 5. Availability APIs

### Get Availability

**Method:** GET

**Endpoint:**
`/api/technician/availability`

**Frontend Usage:**
Displays technician available working hours and time slots.

**Frontend File:**
Technician availability page.

---

### Update Availability

**Method:** PATCH

**Endpoint:**
`/api/technician/availability`

**Frontend Usage:**
Technicians can set or update their available working hours.

**Frontend File:**
Technician availability scheduler.

---

## 6. Booking APIs

### Create Booking

**Method:** POST

**Endpoint:**
`/api/bookings`

**Frontend Usage:**
Customers can create booking requests by selecting a technician, service, date and time.

**Frontend File:**
Customer booking flow.

---

### Get Customer Bookings

**Method:** GET

**Endpoint:**
`/api/bookings`

**Frontend Usage:**
Displays customer's booking history and current booking status.

**Frontend File:**
`app/(dashboardGroup)/customer-dashboard/_actions/customerBookingActions.ts`

---

### Get Single Booking

**Method:** GET

**Endpoint:**
`/api/bookings/:id`

**Frontend Usage:**
Displays details of a specific booking.

---

### Cancel Booking

**Method:** PATCH

**Endpoint:**
`/api/bookings/:id/cancel`

**Frontend Usage:**
Customers can cancel eligible bookings.

**Frontend File:**
`app/(dashboardGroup)/_actions/cancelBooking.ts`

---

## 7. Technician Booking Management

### Get Technician Bookings

**Method:** GET

**Endpoint:**
`/api/bookings`

**Frontend Usage:**
Displays incoming booking requests for technicians.

**Frontend File:**
`app/(dashboardGroup)/technician-dashboard/_actions/technicianBookingActions.ts`

---

### Accept Booking

**Method:** PATCH

**Endpoint:**
`/api/bookings/:id`

**Frontend Usage:**
Technician accepts a requested booking.

**Status:**
`ACCEPTED`

---

### Decline Booking

**Method:** PATCH

**Endpoint:**
`/api/bookings/:id`

**Frontend Usage:**
Technician declines a requested booking.

**Status:**
`DECLINED`

---

### Start Job

**Method:** PATCH

**Endpoint:**
`/api/bookings/:id`

**Frontend Usage:**
Technician starts an accepted and paid job.

**Status:**
`IN_PROGRESS`

---

### Complete Job

**Method:** PATCH

**Endpoint:**
`/api/bookings/:id`

**Frontend Usage:**
Technician marks the service as completed.

**Status:**
`COMPLETED`

---

## 8. Payment APIs

### Create Payment

**Method:** POST

**Endpoint:**
`/api/payments/create`

**Frontend Usage:**
Creates a payment session after the technician accepts a booking.

**Frontend File:**
`app/(dashboardGroup)/_actions/customerPaymentActions.ts`

---

### Payment Gateway

FixItNow uses SSLCommerz sandbox payment integration.

Customer is redirected to the SSLCommerz checkout page to complete the payment.

---

### Payment Success

**Frontend Route:**

`/payment/success`

Used to show successful payment information.

---

### Payment Cancel

**Frontend Route:**

`/payment/cancel`

Used when the customer cancels the payment process.

---

## 9. Review APIs

### Create Review

**Method:** POST

**Endpoint:**
`/api/reviews`

**Frontend Usage:**
Customers can submit a review after completing a service.

**Frontend File:**
`app/(dashboardGroup)/technician-dashboard/_actions/reviewActions.ts`

---

## 10. Admin APIs

### Get Users

**Method:** GET

**Endpoint:**
`/api/users`

**Frontend Usage:**
Admin can view registered users.

**Frontend File:**
Admin user management page.

---

### Ban User

**Method:** PATCH

**Endpoint:**
`/api/users/:id`

**Frontend Usage:**
Admin can ban a user.

---

### Unban User

**Method:** PATCH

**Endpoint:**
`/api/users/:id`

**Frontend Usage:**
Admin can unban a previously banned user.

---

### Admin Statistics

**Method:** GET

**Endpoint:**
Admin statistics endpoints are consumed by the Admin Dashboard.

**Frontend Usage:**

- Total users
- Customers
- Technicians
- Banned users
- Platform activity

**Frontend File:**
`app/(dashboardGroup)/admin-dashboard/page.tsx`

---

## 11. Authentication & Protected Routes

FixItNow uses JWT based authentication.

Authentication tokens are stored using HTTP-only cookies.

Next.js middleware/proxy checks the authentication token and user role before allowing access to protected dashboard routes.

### Roles

- CUSTOMER
- TECHNICIAN
- ADMIN

### Protected Areas

Customer:

`/customer-dashboard`

Technician:

`/technician-dashboard`

Admin:

`/admin-dashbard`

---

## 12. Error Handling

API errors are handled on the frontend using:

- Form validation
- Error messages
- Toast/alert notifications
- Loading states
- Empty states
- `error.tsx`
- `not-found.tsx`

The UI displays user-friendly messages when API requests fail.

---

## 13. API Response Handling

The frontend checks API response status and handles the returned success/message/data fields.

Example:

```ts
// if (!res.ok || !result.success) {
//   throw new Error(
//     result.message || "Something went wrong."
//   );
// }

