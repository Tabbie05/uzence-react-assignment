# React Component Development Assignment - Tayba

A modern React component library featuring reusable InputField and DataTable components built with TypeScript, TailwindCSS, and Storybook.

## 🔗 Links
- **GitHub Repository**: [https://github.com/Tabbie05/uzence-react-assignment](https://github.com/Tabbie05/uzence-react-assignment)

- **Live Storybook**: [https://68a156bd9f0b63ecfb31b29a-hclitpuhlt.chromatic.com/](https://68a156bd9f0b63ecfb31b29a-hclitpuhlt.chromatic.com/)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Tabbie05/react-assignment.git
cd react-assignment

# Install dependencies
npm install

# Run Storybook (recommended for component preview)
npm run storybook
# Access at: http://localhost:6006

# Or run the React app
npm run dev
# Access at: http://localhost:5173
```

## 📁 Project Structure

```
src/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
├── Components/
│   ├── .storybook/
│   │   ├── main.ts
│   │   └── preview.ts
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.stories.tsx
│   │   └── index.ts
│   └── InputField/
│       ├── InputField.tsx
│       ├── InputField.stories.tsx
│       └── index.ts
└── README.md
```

## 🧩 Components

### InputField Component

A fully controlled, accessible input component with dynamic validation and multiple variants.

**Features:**
- **Variants**: `filled` | `outlined` | `ghost`
- **Sizes**: `sm` | `md` | `lg`
- **States**: `disabled` | `invalid` | `loading`
- **Additional Features**:
  - Optional password visibility toggle
  - Clear button functionality
  - Dynamic helper text and error messages
  - Built-in email validation
  - Light/dark mode support
  - Full accessibility with ARIA attributes

**Usage Example:**
```tsx
<InputField
  variant="outlined"
  size="md"
  placeholder="Enter your email"
  type="email"
  helperText="We'll never share your email"
  required
/>
```

### DataTable Component

A generic, type-safe table component built with TypeScript generics for maximum reusability.

**Features:**
- **Generic TypeScript support** for any data type
- **Column sorting** (ascending/descending/none)
- **Row selection** (single & multiple with select-all)
- **Loading states** with skeleton placeholders
- **Empty state** handling with custom messages
- **Size variants**: `sm` | `md` | `lg`
- **Styling options**: striped rows, bordered table
- **Responsive design** with horizontal scroll
- **Keyboard navigation** support
- **Custom cell rendering** via render functions

**Usage Example:**
```tsx
<DataTable
  data={users}
  columns={[
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email' },
    { 
      key: 'actions', 
      title: 'Actions',
      render: (user) => <Button>Edit {user.name}</Button>
    }
  ]}
  size="md"
  striped
  selectable="multiple"
  onRowSelect={handleRowSelect}
/>
```

## 🛠 Tech Stack

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Storybook** for component documentation
- **Vite** for fast development
- **ESLint** for code quality

## 📱 Accessibility

Both components are built with accessibility in mind:
- Proper ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 🎨 Theming

Components support both light and dark themes through TailwindCSS's built-in dark mode utilities.

## 📖 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for deployment




---
<img width="1878" height="800" alt="image" src="https://github.com/user-attachments/assets/53727689-dba3-48d5-85f9-71cec3896460" />
<img width="1769" height="842" alt="image" src="https://github.com/user-attachments/assets/d6dbd9bd-d7b8-4a2e-a524-e35c53999ec9" />
<img width="999" height="856" alt="image" src="https://github.com/user-attachments/assets/ab6932ff-daea-45c9-8205-40485a4d4ed3" />
<img width="1124" height="816" alt="image" src="https://github.com/user-attachments/assets/320fb903-db7b-493f-ab8b-b0f9dda20dfd" />






*Built with ❤️ using modern React development practices*
