import React, { useState } from 'react';
import InputField from './InputField';
import type { Meta, StoryFn } from '@storybook/react-vite';
import type { InputFieldProps } from './InputField';

export default {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    docs: {
      description: {
        component: `
# InputField Component

**InputField** is a fully controlled, accessible input component built with React and TypeScript that provides a comprehensive solution for form inputs.

## Features

- **Variants**: \`filled\`, \`outlined\`, \`ghost\` - Different visual styles for various UI contexts
- **Sizes**: \`sm\`, \`md\`, \`lg\` - Responsive sizing options
- **States**: Normal, disabled, invalid, loading - Complete state management
- **Input Types**: Text, password, email, number - Common input types support
- **Interactive Elements**: Clear button, password visibility toggle
- **Theming**: Full light & dark mode support via Tailwind CSS
- **Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation

## Anatomy

\`\`\`
InputField
├── Label (optional)
│   └── Required indicator (*)
├── Input Container
│   ├── Input Element
│   └── Action Buttons Container
│       ├── Loading Spinner
│       ├── Clear Button
│       └── Password Toggle
└── Helper/Error Text (optional)
\`\`\`

## Accessibility Features

- **ARIA Labels**: Proper labeling and descriptions
- **Keyboard Navigation**: Full keyboard support with focus management
- **Screen Reader**: Compatible with assistive technologies
- **Focus States**: Clear visual focus indicators
- **Error Announcement**: Error messages announced as alerts

## Best Practices

**✅ Do's**
- Use clear, descriptive labels
- Provide helpful error messages
- Use appropriate input types
- Keep helper text concise
- Test with keyboard navigation

**❌ Don'ts**
- Don't use placeholder as label replacement
- Avoid unclear error messages
- Don't disable without clear indication
- Avoid overly long helper text
- Don't ignore loading states

## Theming

The component automatically adapts to light and dark themes using Tailwind's dark mode classes. Colors and styles are carefully chosen to maintain proper contrast ratios.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input field',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'HTML input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
    },
    invalid: {
      control: 'boolean',
      description: 'Shows error state styling',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    clearable: {
      control: 'boolean',
      description: 'Shows clear button when input has value',
    },
    passwordToggle: {
      control: 'boolean',
      description: 'Shows password visibility toggle button',
    },
    required: {
      control: 'boolean',
      description: 'Marks field as required with asterisk',
    },
  },
  tags: ['autodocs'],
} as Meta<InputFieldProps>;

// Dynamic template for interactive stories
const Template: StoryFn<InputFieldProps> = (args) => {
  const [value, setValue] = useState(args.value || '');
  const [helper, setHelper] = useState(args.helperText || '');
  const [error, setError] = useState(args.errorMessage || '');
  const [isInvalid, setIsInvalid] = useState(args.invalid || false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    // Dynamic validation based on input type and label
    if (args.type === 'email' || args.label?.toLowerCase().includes('email')) {
      if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setError('Please enter a valid email address');
        setIsInvalid(true);
      } else {
        setError('');
        setIsInvalid(false);
        setHelper(val ? 'Email format is correct' : 'Enter your email address');
      }
    } else if (args.label?.toLowerCase().includes('username')) {
      if (!val) {
        setHelper('Username is required');
        setError('');
        setIsInvalid(false);
      } else if (val.length < 3) {
        setHelper('Username must be at least 3 characters');
        setError('');
        setIsInvalid(false);
      } else if (val.length > 20) {
        setError('Username must be less than 20 characters');
        setIsInvalid(true);
      } else {
        setHelper('Username looks good!');
        setError('');
        setIsInvalid(false);
      }
    } else if (args.type === 'password' || args.label?.toLowerCase().includes('password')) {
      if (!val) {
        setHelper('Password is required');
        setError('');
        setIsInvalid(false);
      } else if (val.length < 8) {
        setHelper('Password should be at least 8 characters');
        setError('');
        setIsInvalid(false);
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val)) {
        setHelper('Add uppercase, lowercase, and numbers for stronger security');
        setError('');
        setIsInvalid(false);
      } else {
        setHelper('Strong password!');
        setError('');
        setIsInvalid(false);
      }
    }

    args.onChange?.(e);
  };

  return (
    <div className="max-w-md">
      <InputField
        {...args}
        value={value}
        onChange={handleChange}
        helperText={args.errorMessage ? undefined : helper}
        errorMessage={error || args.errorMessage}
        invalid={isInvalid || args.invalid}
      />
    </div>
  );
};

/**
 * **Default Story** - Basic username input with dynamic validation
 * 
 * Demonstrates the default appearance and behavior of the InputField component.
 * Features live validation that provides helpful feedback as you type.
 */
export const Default = Template.bind({});
Default.args = {
  label: 'Username',
  placeholder: 'Enter your username',
  helperText: 'Choose a unique username',
  variant: 'outlined',
  size: 'md',
};

/**
 * **Email Validation** - Email input with real-time validation
 * 
 * Shows how to handle email validation with immediate feedback.
 * Try typing an invalid email to see the error state.
 */
export const EmailValidation = Template.bind({});
EmailValidation.args = {
  label: 'Email Address',
  placeholder: 'name@example.com',
  type: 'email',
  variant: 'outlined',
  size: 'md',
  required: true,
};

/**
 * **Password Field** - Secure password input with toggle
 * 
 * Demonstrates password input with visibility toggle and strength feedback.
 * Includes real-time password strength validation.
 */
export const PasswordField = Template.bind({});
PasswordField.args = {
  label: 'Password',
  placeholder: 'Create a strong password',
  type: 'password',
  passwordToggle: true,
  variant: 'outlined',
  size: 'md',
  required: true,
};

/**
 * **With Clear Button** - Input field with clear functionality
 * 
 * Shows the clear button functionality. Type something and see the clear button appear.
 */
export const WithClearButton = Template.bind({});
WithClearButton.args = {
  label: 'Search Query',
  placeholder: 'Type to search...',
  clearable: true,
  variant: 'filled',
  size: 'md',
};

/**
 * **Disabled State** - Non-interactive input field
 * 
 * Demonstrates the disabled appearance and behavior.
 */
export const Disabled: StoryFn<InputFieldProps> = () => (
  <div className="max-w-md">
    <InputField
      label="Disabled Field"
      value="Cannot edit this"
      placeholder="This field is disabled"
      disabled
      helperText="This field cannot be modified"
      variant="outlined"
      size="md"
    />
  </div>
);

/**
 * **Error State** - Input field with error message
 * 
 * Shows how error states are displayed with proper styling and messaging.
 */
export const ErrorState: StoryFn<InputFieldProps> = () => {
  const [value, setValue] = useState('invalid-email');
  
  return (
    <div className="max-w-md">
      <InputField
        label="Email Address"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your email"
        invalid
        errorMessage="Please enter a valid email address"
        variant="outlined"
        size="md"
        required
      />
    </div>
  );
};

/**
 * **Loading State** - Input field with loading indicator
 * 
 * Demonstrates the loading state with spinner animation.
 */
export const LoadingState: StoryFn<InputFieldProps> = () => {
  const [value, setValue] = useState('');
  
  return (
    <div className="max-w-md">
      <InputField
        label="Processing Input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        loading
        helperText="Processing your input..."
        variant="outlined"
        size="md"
      />
    </div>
  );
};

/**
 * **All Variants** - Comparison of different visual styles
 * 
 * Shows all three variants side by side for easy comparison.
 */
export const AllVariants: StoryFn = () => {
  const [values, setValues] = useState({ filled: '', outlined: '', ghost: '' });
  
  const handleChange = (variant: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [variant]: e.target.value }));
  };

  return (
    <div className="space-y-6 max-w-md">
      <InputField
        label="Filled Variant"
        value={values.filled}
        onChange={handleChange('filled')}
        placeholder="Filled style input"
        variant="filled"
        size="md"
        helperText="Background filled style"
      />
      <InputField
        label="Outlined Variant"
        value={values.outlined}
        onChange={handleChange('outlined')}
        placeholder="Outlined style input"
        variant="outlined"
        size="md"
        helperText="Border outlined style"
      />
      <InputField
        label="Ghost Variant"
        value={values.ghost}
        onChange={handleChange('ghost')}
        placeholder="Ghost style input"
        variant="ghost"
        size="md"
        helperText="Minimal ghost style"
      />
    </div>
  );
};

/**
 * **All Sizes** - Comparison of different sizes
 * 
 * Demonstrates small, medium, and large size variations.
 */
export const AllSizes: StoryFn = () => {
  const [values, setValues] = useState({ sm: '', md: '', lg: '' });
  
  const handleChange = (size: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [size]: e.target.value }));
  };

  return (
    <div className="space-y-6 max-w-md">
      <InputField
        label="Small Size"
        value={values.sm}
        onChange={handleChange('sm')}
        placeholder="Small input field"
        size="sm"
        variant="outlined"
        helperText="Compact size for tight spaces"
      />
      <InputField
        label="Medium Size"
        value={values.md}
        onChange={handleChange('md')}
        placeholder="Medium input field"
        size="md"
        variant="outlined"
        helperText="Standard size for most use cases"
      />
      <InputField
        label="Large Size"
        value={values.lg}
        onChange={handleChange('lg')}
        placeholder="Large input field"
        size="lg"
        variant="outlined"
        helperText="Prominent size for emphasis"
      />
    </div>
  );
};

/**
 * **Complete Feature Showcase** - All features combined
 * 
 * Comprehensive example showing multiple features working together.
 */
export const CompleteShowcase: StoryFn = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    search: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000); // Simulate API call
    }
  };

  return (
    <div className="max-w-md space-y-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Registration Form
      </h3>
      
      <InputField
        label="Username"
        value={formData.username}
        onChange={handleChange('username')}
        placeholder="Choose a username"
        variant="filled"
        size="md"
        required
        invalid={!!errors.username}
        errorMessage={errors.username}
        helperText={!errors.username ? "Must be at least 3 characters" : undefined}
      />
      
      <InputField
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        placeholder="your@email.com"
        variant="filled"
        size="md"
        required
        invalid={!!errors.email}
        errorMessage={errors.email}
        helperText={!errors.email ? "We'll never share your email" : undefined}
      />
      
      <InputField
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        placeholder="Create a secure password"
        variant="filled"
        size="md"
        required
        passwordToggle
        invalid={!!errors.password}
        errorMessage={errors.password}
        helperText={!errors.password ? "At least 8 characters recommended" : undefined}
      />
      
      <InputField
        label="Search"
        value={formData.search}
        onChange={handleChange('search')}
        placeholder="Search for anything..."
        variant="outlined"
        size="md"
        clearable
        helperText="Optional search field with clear button"
      />
      
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </div>
  );
};