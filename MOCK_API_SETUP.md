# Mock API Setup with json-server

The mock API is now running at **http://localhost:3000** with employee data!

## Running the System

You need **2 terminal windows**:

### Terminal 1: Start json-server (Mock API)
```bash
json-server --watch db.json --port 3000
```
✅ This starts the mock API server with the employee database

### Terminal 2: Start React Development Server
```bash
npm run dev
```
✅ This starts your React app at http://localhost:5173

## Initial Data

The mock API comes pre-populated with 6 employees:

| ID | Name | Email | Department | Position | Salary |
|----|------|-------|------------|----------|--------|
| 1 | John Doe | john.doe@example.com | Engineering | Senior Developer | $120,000 |
| 2 | Jane Smith | jane.smith@example.com | Marketing | Marketing Manager | $95,000 |
| 3 | Michael Johnson | michael.johnson@example.com | Sales | Sales Executive | $85,000 |
| 4 | Sarah Williams | sarah.williams@example.com | HR | HR Manager | $90,000 |
| 5 | David Brown | david.brown@example.com | Finance | Financial Analyst | $88,000 |
| 6 | Emily Davis | emily.davis@example.com | Engineering | Frontend Developer | $105,000 |

## Testing the API

### Using curl (or Postman)

**1. Get all employees:**
```bash
curl http://localhost:3000/employees
```

**2. Get single employee:**
```bash
curl http://localhost:3000/employees/1
```

**3. Create new employee:**
```bash
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Wilson",
    "email": "alex.wilson@example.com",
    "department": "Operations",
    "position": "Operations Manager",
    "salary": 92000
  }'
```

**4. Update employee:**
```bash
curl -X PUT http://localhost:3000/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@updated.com",
    "department": "Engineering",
    "position": "Lead Developer",
    "salary": 150000
  }'
```

**5. Delete employee:**
```bash
curl -X DELETE http://localhost:3000/employees/1
```

## Testing in the React App

Open http://localhost:5173 in your browser to:

✅ **View employees** - See the table with all 6 sample employees  
✅ **Add employee** - Click "+ Add Employee" to create a new one  
✅ **Edit employee** - Click "Edit" to modify an employee's information  
✅ **Delete employee** - Click "Delete" and confirm to remove an employee  

Changes are **automatically saved** to `db.json` and will persist between page refreshes!

## API Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "position": "Senior Developer",
    "salary": 120000
  }
}
```

Or in case of error:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Database File

The data is stored in `db.json` - you can:
- Edit it manually to change data
- Delete entries to test empty states
- Reset it anytime by restoring from version control

## json-server Features

- ✅ Auto-generates standard RESTful endpoints
- ✅ Auto-watches for file changes and reloads
- ✅ Supports filtering, sorting, pagination
- ✅ Returns proper HTTP status codes
- ✅ Handles CORS for cross-origin requests

## Stopping the Servers

**json-server:** Press `Ctrl+C` in the terminal  
**React dev server:** Press `Ctrl+C` in the other terminal

## Configuration File

The API endpoint is configured in `.env.local`:
```bash
VITE_API_URL=http://localhost:3003
```

Change this to use a different backend!

## Production API

When ready to use a real API:
1. Deploy your backend (Node.js, Python, Go, etc.)
2. Update `.env.local` with your production URL
3. Rebuild and deploy: `npm run build`

The code is already production-ready - no changes needed! 🚀
