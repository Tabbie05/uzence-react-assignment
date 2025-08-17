import React, { useState, useMemo } from 'react';
import clsx from 'clsx';

export interface Column<T = any> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  width?: string | number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T = any> {
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

type SortDirection = 'asc' | 'desc' | null;

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey = 'id',
  size = 'md',
  striped = false,
  bordered = true,
  emptyText = 'No data available',
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Generate row key
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue === bValue) return 0;
      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  // Handle sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    if (sortColumn === column.key) {
      // Toggle sort direction
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortColumn(null);
      } else setSortDirection('asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  // Handle row selection
  const handleRowSelect = (record: T, checked: boolean) => {
    let newSelectedRows: T[];
    if (checked) {
      newSelectedRows = [...selectedRows, record];
    } else {
      newSelectedRows = selectedRows.filter(
        (row) => getRowKey(row, 0) !== getRowKey(record, 0)
      );
    }
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...sortedData] : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Check if row is selected
  const isRowSelected = (record: T): boolean => {
    return selectedRows.some(
      (row) => getRowKey(row, 0) === getRowKey(record, 0)
    );
  };

  // Check if all rows are selected
  const isAllSelected = sortedData.length > 0 && selectedRows.length === sortedData.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < sortedData.length;

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const paddingClasses = {
    sm: 'px-2 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  };

  // Table classes
  const tableClasses = clsx(
    'w-full',
    sizeClasses[size],
    {
      'border border-gray-200 dark:border-gray-700': bordered,
      'opacity-60': loading,
    }
  );

  const headerClasses = clsx(
    'bg-gray-50 dark:bg-gray-800',
    paddingClasses[size],
    'font-semibold text-left border-b border-gray-200 dark:border-gray-700'
  );

  const cellClasses = clsx(
    paddingClasses[size],
    'border-b border-gray-100 dark:border-gray-800 last:border-b-0'
  );

  // Loading state
  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded mb-1"></div>
          ))}
        </div>
        <div className="text-center py-4 text-gray-500">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  // Empty state
  if (!sortedData.length) {
    return (
      <div className={tableClasses}>
        <table className="w-full">
          <thead>
            <tr>
              {selectable && (
                <th className={clsx(headerClasses, 'w-12')}>
                  <input
                    type="checkbox"
                    disabled
                    className="rounded border-gray-300"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={clsx(headerClasses, {
                    'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700': column.sortable,
                  })}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-lg">{emptyText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className={tableClasses}>
        <thead>
          <tr>
            {selectable && (
              <th className={clsx(headerClasses, 'w-12')}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={clsx(headerClasses, {
                  'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 user-select-none': 
                    column.sortable,
                })}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
                role={column.sortable ? 'button' : undefined}
                tabIndex={column.sortable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleSort(column);
                  }
                }}
                aria-sort={
                  sortColumn === column.key
                    ? sortDirection === 'asc' ? 'ascending' : 'descending'
                    : 'none'
                }
              >
                <div className="flex items-center justify-between">
                  <span>{column.title}</span>
                  {column.sortable && (
                    <span className="ml-2 text-gray-400">
                      {sortColumn === column.key ? (
                        sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '↕️'
                      ) : (
                        '↕️'
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((record, index) => {
            const key = getRowKey(record, index);
            const isSelected = isRowSelected(record);
            return (
              <tr
                key={key}
                className={clsx(
                  'transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50',
                  {
                    'bg-gray-50 dark:bg-gray-800/30': striped && index % 2 === 1,
                    'bg-blue-50 dark:bg-blue-900/20': isSelected,
                  }
                )}
              >
                {selectable && (
                  <td className={cellClasses}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleRowSelect(record, e.target.checked)}
                      className="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      aria-label={`Select row ${index + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={String(column.key)} className={cellClasses}>
                    {column.render
                      ? column.render(record[column.key], record, index)
                      : String(record[column.key] || '')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;