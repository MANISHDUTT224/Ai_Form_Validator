import React from 'react';
import { useValidation } from '../contexts/ValidationContext';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { validationHistory, templates } = useValidation();

  const stats = [
    {
      name: 'Forms Processed',
      value: validationHistory.length.toString(),
      icon: FileText,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Success Rate',
      value: '94.2%',
      icon: CheckCircle,
      color: 'green',
      change: '+2.4%',
      changeType: 'positive'
    },
    {
      name: 'Issues Found',
      value: '23',
      icon: AlertTriangle,
      color: 'yellow',
      change: '-8%',
      changeType: 'negative'
    },
    {
      name: 'Avg Processing Time',
      value: '2.3s',
      icon: Clock,
      color: 'purple',
      change: '-0.5s',
      changeType: 'positive'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'form_processed',
      title: 'W-4 Form Validated',
      description: 'Successfully processed with 2 minor issues',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'template_created',
      title: 'New Template Added',
      description: 'Healthcare Compliance Form template created',
      time: '1 hour ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'form_failed',
      title: 'Form Validation Failed',
      description: 'Tax Form missing required signatures',
      time: '3 hours ago',
      status: 'error'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Monitor your compliance form validation activity and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`flex items-center ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                {stat.change}
              </span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    item.status === 'success' ? 'bg-green-500' :
                    item.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                <Upload className="h-5 w-5 mr-2" />
                Upload New Form
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <FileText className="h-5 w-5 mr-2" />
                Create Template
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Activity className="h-5 w-5 mr-2" />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Overview */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Templates</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    template.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {template.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{template.fields.length} fields</span>
                  <span>Updated {template.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;