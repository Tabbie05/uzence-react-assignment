import React, { useState } from 'react';
import DataTable from './DataTable';
import type { Meta, StoryFn } from '@storybook/react-vite';
import type { DataTableProps, Column } from './DataTable';

// Sample data interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  avatar?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Pending', joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', joinDate: '2023-05-12' },
];

const sampleProducts: Product[] = [
  { id: 1, name: 'MacBook Pro', category: 'Laptops', price: 1999, stock: 15, rating: 4.8 },
  { id: 2, name: 'iPhone 15', category: 'Phones', price: 999, stock: 32, rating: 4.7 },
  { id: 3, name: 'AirPods Pro', category: 'Audio', price: 249, stock: 50, rating: 4.6 },
  { id: 4, name: 'iPad Air', category: 'Tablets', price: 599, stock: 20, rating: 4.5 },
  { id: 5, name: 'Apple Watch', category: 'Wearables', price: 399, stock: 25, rating: 4.4 },
];

export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: `
**DataTable** is a powerful, accessible data table component that provides comprehensive data display and interaction capabilities.

## 🎯 Core Features
- **Tabular Data Display** - Clean, organized data presentation with customizable columns
- **Column Sorting** - Click headers to sort ascending/descending/unsorted
- **Row Selection** - Single/multiple row selection with callbacks and visual feedback
- **Loading States** - Skeleton loading animation with spinner
- **Empty States** - Customizable empty data messaging with icon
- **Responsive Design** - Horizontal scroll on smaller screens while maintaining structure

## 📋 Props & API

\`\`\`typescript
interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  rowKey?: keyof T | ((record: T) => string | number);
  size?: 'sm' | 'md' | 'lg';
  striped?: boolean;
  bordered?: boolean;
  emptyText?: string;
}

interface Column<T = any> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  width?: string | number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}
\`\`\`

## Real-World Use Cases
- **User Management** - Admin panels with user listings, role assignments
- **E-commerce** - Product catalogs with pricing, inventory, ratings
- **Analytics** - Data reporting with sorting and metric comparison
- **Content Management** - File listings, article management, media libraries
- **Financial** - Transaction histories, account summaries, payment records

## Accessibility, theming, best practices, and more are covered in the stories below.
        `,
      },
    },
  },
  argTypes: {
    data: { description: 'Array of data objects to display in the table', control: { type: 'object' } },
    columns: { description: 'Array of column configuration objects', control: { type: 'object' } },
    loading: { description: 'Show loading skeleton and spinner', control: { type: 'boolean' } },
    selectable: { description: 'Enable row selection with checkboxes', control: { type: 'boolean' } },
    onRowSelect: { description: 'Callback fired when row selection changes', action: 'rowSelect' },
    rowKey: { description: 'Property name or function to generate unique row keys', control: { type: 'text' } },
    size: { description: 'Table size variant affecting padding and text size', control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    striped: { description: 'Enable alternating row background colors', control: { type: 'boolean' } },
    bordered: { description: 'Show table borders', control: { type: 'boolean' } },
    emptyText: { description: 'Custom message shown when no data is available', control: { type: 'text' } },
  },
} as Meta<DataTableProps>;

// User columns configuration
const userColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    render: (value, record) => (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {value.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  { key: 'email', title: 'Email', sortable: true },
  {
    key: 'role',
    title: 'Role',
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
        : value === 'Editor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }`}>{value}</span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    render: (value) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : value === 'Inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      }`}>
        <span className={`w-2 h-2 rounded-full mr-1 ${
          value === 'Active' ? 'bg-green-400'
          : value === 'Inactive' ? 'bg-red-400' : 'bg-yellow-400'
        }`}></span>
        {value}
      </span>
    ),
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
];

// Product columns configuration
const productColumns: Column<Product>[] = [
  { key: 'name', title: 'Product Name', sortable: true },
  { key: 'category', title: 'Category', sortable: true },
  {
    key: 'price',
    title: 'Price',
    sortable: true,
    render: (value) => `$${value.toLocaleString()}`,
  },
  {
    key: 'stock',
    title: 'Stock',
    sortable: true,
    render: (value) => (
      <span className={`font-medium ${value < 20 ? 'text-red-600' : 'text-green-600'}`}>{value}</span>
    ),
  },
  {
    key: 'rating',
    title: 'Rating',
    sortable: true,
    render: (value) => (
      <div className="flex items-center">
        <span className="text-yellow-400 mr-1">★</span>
        <span>{value}</span>
      </div>
    ),
  },
];

// Template for interactive stories
const Template: StoryFn<DataTableProps<User>> = (args) => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  return (
    <div className="space-y-4">
      <DataTable {...args} onRowSelect={setSelectedRows} />
      {selectedRows.length > 0 && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-medium">Selected {selectedRows.length} row(s):</p>
          <ul className="mt-2 space-y-1">
            {selectedRows.map((row) => (
              <li key={row.id} className="text-sm">{row.name} ({row.email})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * Default table with basic user data, selection enabled, and interactive feedback.
 */
export const Default = Template.bind({});
Default.args = {
  data: sampleUsers,
  columns: userColumns,
  selectable: true,
};

/**
 * Loading state demonstration showing skeleton animation and disabled interactions.
 */
export const Loading = Template.bind({});
Loading.args = {
  data: sampleUsers,
  columns: userColumns,
  loading: true,
};

/**
 * Empty state when no data is available, with customized messaging.
 */
export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns: userColumns,
  emptyText: "No users found. Try adding some users to get started.",
};

/**
 * Product table with different data structure, custom formatting, and value calculations.
 */
export const ProductTable: StoryFn<DataTableProps<Product>> = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  return (
    <div className="space-y-4">
      <DataTable
        data={sampleProducts}
        columns={productColumns}
        selectable
        onRowSelect={setSelectedProducts}
      />
      {selectedProducts.length > 0 && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="font-medium">Selected Products: {selectedProducts.length}</p>
          <p className="text-sm text-gray-600">
            Total Value: ${selectedProducts.reduce((sum, product) => sum + product.price, 0).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Comprehensive showcase of all size variants and visual options.
 */
export const SizesAndVariants = () => {
  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
  const limitedData = sampleUsers.slice(0, 3);
  const basicColumns = userColumns.slice(0, 3);

  return (
    <div className="space-y-8">
      {sizes.map((size) => (
        <div key={size} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize">{size} Size Variants</h3>
          <div className="grid gap-6">
            {/* Regular */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-600">Regular (Bordered)</h4>
              <DataTable data={limitedData} columns={basicColumns} size={size} />
            </div>
            {/* Striped */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-600">Striped Rows</h4>
              <DataTable data={limitedData} columns={basicColumns} size={size} striped />
            </div>
            {/* Borderless */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-600">No Borders</h4>
              <DataTable data={limitedData} columns={basicColumns} size={size} bordered={false} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Selection behavior demonstration with different interaction patterns.
 */
export const SelectionModes = () => {
  const [multipleSelected, setMultipleSelected] = useState<User[]>([]);
  const limitedData = sampleUsers.slice(0, 3);
  const basicColumns = userColumns.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* No Selection */}
      <div className="space-y-2">
        <h3 className="font-semibold">Read-Only Mode (No Selection)</h3>
        <p className="text-sm text-gray-600">Pure display table without interactive selection.</p>
        <DataTable data={limitedData} columns={basicColumns} selectable={false} />
      </div>
      {/* Multiple Selection with Feedback */}
      <div className="space-y-2">
        <h3 className="font-semibold">Multiple Selection with Feedback</h3>
        <p className="text-sm text-gray-600">Use checkboxes to select multiple rows with real-time feedback.</p>
        <DataTable
          data={limitedData}
          columns={basicColumns}
          selectable
          onRowSelect={setMultipleSelected}
        />
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-medium">
            Selected: {multipleSelected.length > 0
              ? multipleSelected.map(u => u.name).join(', ')
              : 'None selected'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Advanced implementation showcasing complex custom rendering, computed values, and real-world interaction patterns like action buttons.
 */
export const AdvancedFeatures = () => {
  const [selectedAdvanced, setSelectedAdvanced] = useState<User[]>([]);
  // Enhanced columns
  const advancedColumns: Column<User>[] = [
    {
      key: 'name',
      title: 'User Profile',
      sortable: true,
      width: '250px',
      render: (value, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {value.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      title: 'Role & Status',
      sortable: true,
      render: (value, record) => (
        <div className="space-y-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : value === 'Editor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>{value}</span>
          <div>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              record.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : record.status === 'Inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                record.status === 'Active' ? 'bg-green-400'
                : record.status === 'Inactive' ? 'bg-red-400' : 'bg-yellow-400'
              }`}></span>
              {record.status}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'joinDate',
      title: 'Member Since',
      sortable: true,
      render: (value) => {
        const date = new Date(value);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (
          <div>
            <div className="font-medium">{date.toLocaleDateString()}</div>
            <div className="text-sm text-gray-500">{diffDays} days ago</div>
          </div>
        );
      },
    },
    {
      key: 'id',
      title: 'Actions',
      render: (value, record) => (
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium transition-colors"
            onClick={() => alert(`Edit user: ${record.name}`)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium transition-colors"
            onClick={() => alert(`Delete user: ${record.name}`)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Advanced Features Demo</h3>
        <p className="text-sm text-gray-600">
          Complex rendering, computed values, action buttons, and enhanced visual design.
        </p>
      </div>
      <DataTable
        data={sampleUsers}
        columns={advancedColumns}
        selectable
        onRowSelect={setSelectedAdvanced}
        striped
        size="lg"
      />
      {selectedAdvanced.length > 0 && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100">
            Advanced Selection Summary
          </h4>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Selected {selectedAdvanced.length} user(s):
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 ml-4">
              {selectedAdvanced.map((user) => (
                <li key={user.id} className="flex justify-between">
                  <span>{user.name} ({user.role})</span>
                  <span className={`font-medium ${
                    user.status === 'Active' ? 'text-green-600'
                    : user.status === 'Inactive' ? 'text-red-600' : 'text-yellow-600'
                  }`}>{user.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Accessibility demonstration focusing on keyboard navigation, screen reader support, and ARIA attributes.
 */
export const AccessibilityDemo = () => {
  const [keyboardSelected, setKeyboardSelected] = useState<User[]>([]);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Accessibility Features</h3>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-medium text-yellow-900 dark:text-yellow-100">
            🔍 Try These Accessibility Features:
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
            <li>• <strong>Tab Navigation:</strong> Tab through sortable column headers</li>
            <li>• <strong>Keyboard Sorting:</strong> Press Enter or Space on focused headers</li>
            <li>• <strong>Screen Reader:</strong> Sort state changes announced automatically</li>
            <li>• <strong>Focus Indicators:</strong> Clear visual focus on interactive elements</li>
            <li>• <strong>ARIA Labels:</strong> Descriptive labels for checkboxes and buttons</li>
          </ul>
        </div>
      </div>
      <DataTable
        data={sampleUsers.slice(0, 3)}
        columns={userColumns}
        selectable
        onRowSelect={setKeyboardSelected}
        bordered
      />
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm font-medium">
          Screen Reader Announcements: Sort changes and selection updates are automatically announced
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Current selection: {keyboardSelected.length} items selected
        </p>
      </div>
    </div>
  );
};