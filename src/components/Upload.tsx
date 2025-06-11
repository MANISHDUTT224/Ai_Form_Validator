import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload as UploadIcon, 
  File, 
  X, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Loader2
} from 'lucide-react';
import { useValidation } from '../contexts/ValidationContext';

interface UploadedFile {
  file: File;
  preview: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  extractedData?: any;
  validationResults?: any;
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { processForm, templates } = useValidation();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]?.id || '');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate processing
    newFiles.forEach((uploadedFile, index) => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.file === uploadedFile.file 
            ? { ...f, status: 'processing' }
            : f
        ));
        
        // Simulate completion
        setTimeout(() => {
          const result = processForm(uploadedFile.file, selectedTemplate);
          setFiles(prev => prev.map(f => 
            f.file === uploadedFile.file 
              ? { 
                  ...f, 
                  status: 'completed',
                  extractedData: result.extractedData,
                  validationResults: result.validationResults
                }
              : f
          ));
        }, 2000 + index * 500);
      }, 500);
    });
  }, [processForm, selectedTemplate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Forms</h1>
        <p className="mt-2 text-gray-600">
          Upload compliance forms for AI-powered validation and data extraction
        </p>
      </div>

      {/* Template Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Validation Template
        </label>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-lg text-blue-600">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-lg text-gray-900 mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, DOC, DOCX, PNG, JPG up to 10MB each
            </p>
          </div>
        )}
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Processing Files ({files.length})
          </h2>
          <div className="space-y-4">
            {files.map((uploadedFile, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <File className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {uploadedFile.status === 'uploading' && (
                      <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                    )}
                    {uploadedFile.status === 'processing' && (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                    {uploadedFile.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {uploadedFile.status === 'error' && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    <button
                      onClick={() => removeFile(uploadedFile.file)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Status Messages */}
                <div className="mb-3">
                  {uploadedFile.status === 'uploading' && (
                    <p className="text-sm text-blue-600">Uploading file...</p>
                  )}
                  {uploadedFile.status === 'processing' && (
                    <p className="text-sm text-yellow-600">
                      Processing with AI... Extracting data and validating fields
                    </p>
                  )}
                  {uploadedFile.status === 'completed' && (
                    <p className="text-sm text-green-600">
                      Processing complete! Data extracted and validated.
                    </p>
                  )}
                  {uploadedFile.status === 'error' && (
                    <p className="text-sm text-red-600">
                      Processing failed. Please try again.
                    </p>
                  )}
                </div>

                {/* Validation Results */}
                {uploadedFile.validationResults && (
                  <div className="border-t border-gray-200 pt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Extracted Data</h4>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm">
                          {Object.entries(uploadedFile.extractedData).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-1">
                              <span className="text-gray-600">{key}:</span>
                              <span className="text-gray-900">{value as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Validation Results</h4>
                        <div className="space-y-2">
                          {uploadedFile.validationResults.issues.map((issue: any, i: number) => (
                            <div key={i} className={`p-2 rounded-lg text-sm ${
                              issue.severity === 'error' 
                                ? 'bg-red-50 text-red-700' 
                                : 'bg-yellow-50 text-yellow-700'
                            }`}>
                              <div className="flex items-center">
                                {issue.severity === 'error' ? (
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                ) : (
                                  <Clock className="h-4 w-4 mr-2" />
                                )}
                                <span className="font-medium">{issue.field}</span>
                              </div>
                              <p className="mt-1 ml-6">{issue.message}</p>
                              {issue.suggestion && (
                                <p className="mt-1 ml-6 text-xs opacity-75">
                                  Suggestion: {issue.suggestion}
                                </p>
                              )}
                            </div>
                          ))}
                          {uploadedFile.validationResults.issues.length === 0 && (
                            <div className="p-2 bg-green-50 text-green-700 rounded-lg text-sm">
                              <CheckCircle className="h-4 w-4 inline mr-2" />
                              All validations passed successfully!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;