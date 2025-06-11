import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TemplateField {
  name: string;
  type: 'text' | 'number' | 'date' | 'email' | 'boolean';
  required: boolean;
  validation?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  status: 'active' | 'inactive';
  lastUpdated: string;
}

interface ValidationIssue {
  field: string;
  severity: 'error' | 'warning';
  message: string;
  suggestion?: string;
}

interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  extractedData: Record<string, any>;
}

interface HistoryItem {
  id: string;
  fileName: string;
  fileSize: string;
  template: string;
  status: 'success' | 'warning' | 'error';
  issuesCount: number;
  processedAt: string;
  extractedData: Record<string, any>;
  validationResults: ValidationResult;
}

interface ValidationContextType {
  templates: Template[];
  validationHistory: HistoryItem[];
  addTemplate: (template: Omit<Template, 'id' | 'status' | 'lastUpdated'>) => void;
  updateTemplate: (id: string, template: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  processForm: (file: File, templateId: string) => ValidationResult;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'W-4 Tax Form',
    description: 'Employee tax withholding form',
    fields: [
      { name: 'Employee Name', type: 'text', required: true },
      { name: 'SSN', type: 'text', required: true },
      { name: 'Address', type: 'text', required: true },
      { name: 'Filing Status', type: 'text', required: true },
      { name: 'Signature Date', type: 'date', required: true },
    ],
    status: 'active',
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    name: 'Healthcare Compliance',
    description: 'Medical facility compliance form',
    fields: [
      { name: 'Facility Name', type: 'text', required: true },
      { name: 'License Number', type: 'text', required: true },
      { name: 'Inspection Date', type: 'date', required: true },
      { name: 'Compliance Officer', type: 'text', required: true },
      { name: 'Status', type: 'text', required: true },
    ],
    status: 'active',
    lastUpdated: '1 week ago'
  },
  {
    id: '3',
    name: 'Financial Disclosure',
    description: 'Annual financial disclosure form',
    fields: [
      { name: 'Entity Name', type: 'text', required: true },
      { name: 'Reporting Period', type: 'date', required: true },
      { name: 'Total Assets', type: 'number', required: true },
      { name: 'Total Liabilities', type: 'number', required: true },
      { name: 'Authorized Signature', type: 'text', required: true },
    ],
    status: 'active',
    lastUpdated: '3 days ago'
  }
];

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    fileName: 'employee_w4_john_doe.pdf',
    fileSize: '1.2 MB',
    template: 'W-4 Tax Form',
    status: 'success',
    issuesCount: 0,
    processedAt: new Date().toISOString(),
    extractedData: {
      'Employee Name': 'John Doe',
      'SSN': '***-**-1234',
      'Address': '123 Main St, Anytown, USA',
      'Filing Status': 'Single',
      'Signature Date': '2024-01-15'
    },
    validationResults: {
      isValid: true,
      issues: [],
      extractedData: {}
    }
  },
  {
    id: '2',
    fileName: 'clinic_compliance_form.pdf',
    fileSize: '2.8 MB',
    template: 'Healthcare Compliance',
    status: 'warning',
    issuesCount: 2,
    processedAt: new Date(Date.now() - 86400000).toISOString(),
    extractedData: {
      'Facility Name': 'Downtown Medical Clinic',
      'License Number': 'HC-2024-001',
      'Inspection Date': '2024-01-10',
      'Compliance Officer': 'Dr. Sarah Smith',
      'Status': 'Compliant'
    },
    validationResults: {
      isValid: false,
      issues: [
        {
          field: 'Inspection Date',
          severity: 'warning',
          message: 'Inspection date is more than 30 days old',
          suggestion: 'Consider scheduling a new inspection'
        }
      ],
      extractedData: {}
    }
  },
  {
    id: '3',
    fileName: 'financial_disclosure_2024.pdf',
    fileSize: '1.8 MB',
    template: 'Financial Disclosure',
    status: 'error',
    issuesCount: 3,
    processedAt: new Date(Date.now() - 172800000).toISOString(),
    extractedData: {
      'Entity Name': 'ABC Corporation',
      'Reporting Period': '2024-01-01',
      'Total Assets': '$1,250,000',
      'Total Liabilities': '$850,000'
    },
    validationResults: {
      isValid: false,
      issues: [
        {
          field: 'Authorized Signature',
          severity: 'error',
          message: 'Missing required signature',
          suggestion: 'Ensure the form is properly signed by an authorized representative'
        },
        {
          field: 'Total Assets',
          severity: 'warning',
          message: 'Asset value seems unusually high',
          suggestion: 'Verify the accuracy of the reported asset value'
        }
      ],
      extractedData: {}
    }
  }
];

export const ValidationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [validationHistory, setValidationHistory] = useState<HistoryItem[]>(mockHistory);

  const addTemplate = (templateData: Omit<Template, 'id' | 'status' | 'lastUpdated'>) => {
    const newTemplate: Template = {
      ...templateData,
      id: Date.now().toString(),
      status: 'active',
      lastUpdated: 'just now'
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const updateTemplate = (id: string, templateData: Partial<Template>) => {
    setTemplates(prev => prev.map(template => 
      template.id === id 
        ? { ...template, ...templateData, lastUpdated: 'just now' }
        : template
    ));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const processForm = (file: File, templateId: string): ValidationResult => {
    const template = templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    // Simulate AI processing and data extraction
    const extractedData: Record<string, any> = {};
    const issues: ValidationIssue[] = [];

    // Mock data extraction based on template fields
    template.fields.forEach(field => {
      if (field.name === 'Employee Name') {
        extractedData[field.name] = 'Jane Smith';
      } else if (field.name === 'SSN') {
        extractedData[field.name] = '***-**-5678';
      } else if (field.name === 'Address') {
        extractedData[field.name] = '456 Oak Ave, Somewhere, USA';
      } else if (field.name === 'Filing Status') {
        extractedData[field.name] = 'Married';
      } else if (field.name === 'Signature Date') {
        extractedData[field.name] = '2024-01-20';
      } else if (field.name === 'Facility Name') {
        extractedData[field.name] = 'Eastside Health Center';
      } else if (field.name === 'License Number') {
        extractedData[field.name] = 'HC-2024-002';
      } else if (field.name === 'Inspection Date') {
        extractedData[field.name] = '2024-01-18';
      } else if (field.name === 'Compliance Officer') {
        extractedData[field.name] = 'Dr. Michael Johnson';
      } else if (field.name === 'Status') {
        extractedData[field.name] = 'Pending Review';
      } else {
        extractedData[field.name] = `Sample ${field.name}`;
      }

      // Simulate validation issues
      if (Math.random() < 0.3 && field.required) {
        issues.push({
          field: field.name,
          severity: Math.random() < 0.5 ? 'error' : 'warning',
          message: `${field.name} requires verification`,
          suggestion: `Please review the ${field.name} field for accuracy`
        });
      }
    });

    const result: ValidationResult = {
      isValid: issues.filter(i => i.severity === 'error').length === 0,
      issues,
      extractedData
    };

    // Add to history
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      template: template.name,
      status: issues.filter(i => i.severity === 'error').length > 0 ? 'error' : 
              issues.length > 0 ? 'warning' : 'success',
      issuesCount: issues.length,
      processedAt: new Date().toISOString(),
      extractedData,
      validationResults: result
    };

    setValidationHistory(prev => [historyItem, ...prev]);

    return result;
  };

  return (
    <ValidationContext.Provider value={{
      templates,
      validationHistory,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      processForm
    }}>
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};