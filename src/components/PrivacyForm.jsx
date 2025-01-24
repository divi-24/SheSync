import React, { useState } from 'react';
import { Lock, Unlock, AlertCircle } from 'lucide-react';

export function PrivacyForm({ onSave }) {
  const [privacySettings, setPrivacySettings] = useState({
    shareCycleDuration: false,
    shareLastPeriodInfo: false,
    shareMoodData: false,
    shareSymptoms: false,
    shareSleepData: false,
    shareNextPeriodPrediction: false,
  });

  const handleToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    onSave(privacySettings);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Privacy Settings</h2>
      
      <div className="space-y-4">
        <ToggleItem
          label="Share Cycle Duration"
          isOn={privacySettings.shareCycleDuration}
          onToggle={() => handleToggle('shareCycleDuration')}
        />
        <ToggleItem
          label="Share Last Period Information"
          isOn={privacySettings.shareLastPeriodInfo}
          onToggle={() => handleToggle('shareLastPeriodInfo')}
        />
        <ToggleItem
          label="Share Mood Data"
          isOn={privacySettings.shareMoodData}
          onToggle={() => handleToggle('shareMoodData')}
        />
        <ToggleItem
          label="Share Symptoms"
          isOn={privacySettings.shareSymptoms}
          onToggle={() => handleToggle('shareSymptoms')}
        />
        <ToggleItem
          label="Share Sleep Data"
          isOn={privacySettings.shareSleepData}
          onToggle={() => handleToggle('shareSleepData')}
        />
        <ToggleItem
          label="Share Next Period Prediction"
          isOn={privacySettings.shareNextPeriodPrediction}
          onToggle={() => handleToggle('shareNextPeriodPrediction')}
        />
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-300"
        >
          Save Privacy Settings
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 flex items-start">
        <AlertCircle className="mr-2 flex-shrink-0 mt-1" size={16} />
        <p>
          Your privacy is important to us. These settings control what information is shared with the parent dashboard. You can change these settings at any time.
        </p>
      </div>
    </div>
  );
};

const ToggleItem = ({ label, isOn, onToggle }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
        isOn ? 'bg-pink-600' : 'bg-gray-400'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

// export default PrivacyForm;

