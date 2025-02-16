'use client';

import { useState, type ChangeEvent } from 'react';
import { Card, Text } from '@tremor/react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'url' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  validate?: (value: string) => string | undefined;
}

interface FormState {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface KnowledgeBaseFormProps {
  fields: FormField[];
  initialState: FormState;
  onSubmit: (data: FormState) => void;
  submitLabel: string;
  className?: string;
}

export default function KnowledgeBaseForm({
  fields,
  initialState,
  onSubmit,
  submitLabel,
  className = '',
}: KnowledgeBaseFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: FormField, value: string): string | undefined => {
    if (field.required && (!value || value.trim() === '')) {
      return `${field.label} is required`;
    }

    if (field.type === 'url' && value) {
      try {
        new URL(value);
      } catch {
        return 'Please enter a valid URL';
      }
    }

    return field.validate?.(value);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const error = validateField(field, formState[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formState);
      setFormState(initialState);
      setTouched({});
      setErrors({});
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormState((prev: FormState) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const field = fields.find(f => f.name === name);
      if (field) {
        const error = validateField(field, value);
        setErrors((prev: FormErrors) => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev: Record<string, boolean>) => ({ ...prev, [name]: true }));
    const field = fields.find(f => f.name === name);
    if (field) {
      const error = validateField(field, formState[field.name]);
      setErrors((prev: FormErrors) => ({ ...prev, [name]: error }));
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      value: formState[field.name],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        handleChange(field.name, e.target.value),
      onBlur: () => handleBlur(field.name),
      className: `w-full bg-black/20 border ${errors[field.name] ? 'border-red-500' : 'border-white/10'} 
                 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 
                 focus:ring-accent outline-none`,
      placeholder: field.placeholder,
      'aria-label': field.label,
      'aria-invalid': errors[field.name] ? true : false,
      'aria-describedby': errors[field.name] ? `${field.name}-error` : undefined,
      required: field.required,
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} className={`${commonProps.className} h-32`} />;
      case 'select':
        return (
          <select {...commonProps}>
            {field.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return <input {...commonProps} type={field.type} />;
    }
  };

  return (
    <Card className={`glass-card p-6 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field.name}>
            <Text className="text-white/70 mb-2">{field.label}</Text>
            {renderField(field)}
            {errors[field.name] && touched[field.name] && (
              <Text id={`${field.name}-error`} className="text-red-500 text-sm mt-1">
                {errors[field.name]}
              </Text>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button type="submit" className="button-primary" aria-label={submitLabel}>
            {submitLabel}
          </button>
        </div>
      </form>
    </Card>
  );
}
