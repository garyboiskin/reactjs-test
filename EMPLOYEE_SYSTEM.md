# Employee Management System

A complete React + TypeScript application for managing employees with full CRUD operations (Create, Read, Update, Delete) via an external API.

## Features

✅ **Add Employees** - Create new employee records with name, email, department, position, and salary  
✅ **Update Employees** - Edit existing employee information  
✅ **Delete Employees** - Remove employees with confirmation  
✅ **View Employees** - Display all employees in a professional table format  
✅ **Form Validation** - Client-side validation for required fields  
✅ **Error Handling** - Graceful error messages and retry capability  
✅ **Loading States** - Visual feedback during API operations  
✅ **Responsive Design** - Works on desktop and mobile devices

## Project Structure

```
src/
├── components/
│   ├── EmployeeManager.tsx       # Main container component
│   ├── EmployeeForm.tsx          # Form for add/edit operations
│   └── EmployeeList.tsx          # Table display of employees
├── services/
│   └── employeeService.ts        # API communication layer
├── types/
│   └── Employee.ts               # TypeScript interfaces
├── styles/
│   ├── EmployeeForm.css
│   ├── EmployeeList.css
│   └── EmployeeManager.css
├── App.tsx                       # Main App component
└── main.tsx                      # Entry point
```

## Configuration

### Setting Your API Endpoint

The application uses environment variables to configure the API endpoint. By default, it looks for `VITE_API_URL`.

**Option 1: Create a `.env.local` file** (recommended)

```bash
# .env.local
VITE_API_URL=https://your-api.com/api
```

**Option 2: Edit `src/services/employeeService.ts`**

```typescript
const API_BASE_URL = 'https://your-api.com/api'; // Replace with your API URL
```

## API Requirements

Your API endpoint should support these operations:

### 1. **GET /employees** - Fetch all employees
```json
Request:  GET /api/employees
Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "department": "Engineering",
      "position": "Senior Developer",
      "salary": 120000
    }
  ]
}
```

### 2. **GET /employees/:id** - Fetch single employee
```json
Request:  GET /api/employees/1
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Engineering",
    "position": "Senior Developer",
    "salary": 120000
  }
}
```

### 3. **POST /employees** - Create new employee
```json
Request:  POST /api/employees
Body:
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "department": "Marketing",
  "position": "Marketing Manager",
  "salary": 100000
}
Response:
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "department": "Marketing",
    "position": "Marketing Manager",
    "salary": 100000
  }
}
```

### 4. **PUT /employees/:id** - Update employee
```json
Request:  PUT /api/employees/1
Body:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering",
  "position": "Lead Developer",
  "salary": 150000
}
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "position": "Lead Developer",
    "salary": 150000
  }
}
```

### 5. **DELETE /employees/:id** - Delete employee
```json
Request:  DELETE /api/employees/1
Response:
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

## Employee Model

```typescript
interface Employee {
  id?: string | number;
  name: string;              // Required
  email: string;             // Required
  department: string;        // Required
  position: string;          // Required
  salary?: number;           // Optional
}
```

## Available Scripts

```bash
# Start development server (HMR enabled)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Development Server

Start the dev server with hot module replacement:

```bash
npm run dev
```

The application will open at **http://localhost:5173**

## Error Handling

The application handles the following scenarios:

- **Network errors** - Displays error message and allows retry
- **API errors** - Shows specific error messages from the API
- **Validation errors** - Form validation on submit
- **Loading states** - Disables buttons during API calls
- **Confirmation dialogs** - Confirms deletion before removing

## Testing the Application

Without a real API, you can:

1. **Mock the API** - Create a mock server using tools like:
   - [json-server](https://github.com/typicode/json-server)
   - [MSW (Mock Service Worker)](https://mswjs.io/)
   - [Mirage JS](https://miragejs.com/)

2. **Example with json-server**:
   ```bash
   npm install -g json-server
   echo '{"employees": []}' > db.json
   json-server --watch db.json --port 3000
   # Then set VITE_API_URL=http://localhost:3000
   ```

3. **Use a backend framework** - Deploy a Node.js/Python/Go backend with employee endpoints

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Styling

The application uses custom CSS with:
- Clean, professional design
- Mobile-responsive tables and forms
- Color-coded action buttons
- Smooth transitions and hover effects

Customize colors by editing the CSS files in `src/styles/`

## TypeScript

Full TypeScript support with:
- Type-safe API calls
- Interfaces for data models
- Strict mode enabled
- Type-only imports for better tree-shaking

## Performance

- Code splitting enabled via Vite
- Lazy loading of components
- Optimized CSS bundling
- ~60KB gzipped bundle size

## Next Steps

1. **Configure your API endpoint** in `.env.local`
2. **Run the dev server** with `npm run dev`
3. **Test the UI** - Add, edit, delete employees
4. **Deploy** - Build with `npm run build` and deploy the `dist/` folder

## Support

For issues or questions:
- Check TypeScript errors: `tsc --noEmit`
- Run linter: `npm run lint`
- Check browser console for API errors
- Verify API endpoint is correct and accessible
