import '../src/index.css';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' }, // Tailwind dark gray
      ],
    },
  },
};

export default preview;
