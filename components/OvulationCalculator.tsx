'use client';

import { useState } from 'react';
import { addDays, format } from 'date-fns';
import Image from 'next/image';
import OvulationImg from '@/public/images/ovulationsecimg.png';

interface Results {
  ovulationDate: string;
  fertileWindow: string;
  nextPeriod: string;
}

interface GestationInfo {
  gestationalAge: string;
  dueDate: string;
  firstTrimester: string;
  secondTrimesterEnd: string;
  thirdTrimesterEnd: string;
}

export default function OvulationCalculator() {
  const [startDate, setStartDate] = useState<string>('');
  const [gestationInfo, setGestationInfo] = useState<GestationInfo | null>(null);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [results, setResults] = useState<Results | null>(null);

  const calculateOvulation = () => {
    if (!startDate || isNaN(new Date(startDate).getTime())) {
      alert('Please select a valid start date.');
      return;
    }

    const start = new Date(startDate);
    const ovulationDate = addDays(start, cycleLength - 14);
    const fertileStart = addDays(ovulationDate, -4);
    const fertileEnd = addDays(ovulationDate, 1);
    const nextPeriod = addDays(start, cycleLength);

    setResults({
      ovulationDate: format(ovulationDate, 'EEE MMM dd yyyy'),
      fertileWindow: `${format(fertileStart, 'EEE MMM dd yyyy')} - ${format(
        fertileEnd,
        'EEE MMM dd yyyy'
      )}`,
      nextPeriod: format(nextPeriod, 'EEE MMM dd yyyy'),
    });

    const today = new Date();
    const gestationalAgeInDays = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const gestationalWeeks = Math.floor(gestationalAgeInDays / 7);
    const gestationalDays = gestationalAgeInDays % 7;
    const dueDate = addDays(start, 280);

    const firstTrimesterEnd = addDays(start, 13 * 7);
    const secondTrimesterEnd = addDays(start, 27 * 7);
    const thirdTrimesterEnd = dueDate;

    setGestationInfo({
      gestationalAge: `${gestationalWeeks} weeks and ${gestationalDays} days`,
      dueDate: format(dueDate, 'EEE MMM dd yyyy'),
      firstTrimester: `${format(start, 'EEE MMM dd yyyy')} – ${format(
        firstTrimesterEnd,
        'EEE MMM dd yyyy'
      )}`,
      secondTrimesterEnd: format(secondTrimesterEnd, 'EEE MMM dd yyyy'),
      thirdTrimesterEnd: format(thirdTrimesterEnd, 'EEE MMM dd yyyy'),
    });
  };

  const resetForm = () => {
    setStartDate('');
    setCycleLength(28);
    setResults(null);
    setGestationInfo(null);
  };

  return (
    <div className="p-4 sm:p-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 min-h-screen">
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-7 text-purple-900 dark:text-purple-200 mt-5">
          Determine Your{' '}
          <span className="text-pink-700 dark:text-pink-400">Ovulation Cycle</span>
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 px-4">
          Use this calculator to pinpoint your most fertile days by identifying when you're likely ovulating.
          If conception occurs, the calculator will also provide estimated pregnancy milestones.
        </p>
      </div>

      <div className="bg-pink-50 dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-xl mx-auto mb-20">
        <div className="flex justify-center mb-10">
          <Image
            src={OvulationImg}
            alt="Ovulation illustration"
            width={320}
            height={320}
            className="w-64 h-auto"
            priority
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-semibold dark:text-gray-200">
            Last Period Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-semibold dark:text-gray-200">
            Cycle Length (in days)
          </label>
          <input
            type="number"
            min={20}
            max={40}
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="w-full p-2 rounded border border-gray-300 bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={calculateOvulation}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {results && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-700 dark:text-pink-400">
            Ovulation Results
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-pink-100 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 dark:text-gray-200">Fertile Window</h3>
              <p className="bg-pink-200 dark:bg-pink-900 px-4 py-2 rounded-lg mb-3 font-medium">
                {results.fertileWindow}
              </p>
              <p className="text-sm dark:text-gray-300">
                The most fertile days in your cycle where conception is most likely.
              </p>
            </div>
            
            <div className="bg-pink-100 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 dark:text-gray-200">Ovulation Date</h3>
              <p className="bg-pink-200 dark:bg-pink-900 px-4 py-2 rounded-lg mb-3 font-medium">
                {results.ovulationDate}
              </p>
              <p className="text-sm dark:text-gray-300">
                Estimated date of ovulation when the egg is released.
              </p>
            </div>
            
            <div className="bg-pink-100 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 dark:text-gray-200">Next Period</h3>
              <p className="bg-pink-200 dark:bg-pink-900 px-4 py-2 rounded-lg mb-3 font-medium">
                {results.nextPeriod}
              </p>
              <p className="text-sm dark:text-gray-300">
                Your next period is expected around this date.
              </p>
            </div>
          </div>
        </div>
      )}

      {gestationInfo && (
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-700 dark:text-pink-400">
            Pregnancy Milestones
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-pink-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-3 dark:text-gray-200">Gestational Age</h3>
              <p className="mb-4 dark:text-gray-300">
                {gestationInfo.gestationalAge}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Estimated due date: {gestationInfo.dueDate}
              </p>
            </div>
            
            <div className="bg-pink-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-3 dark:text-gray-200">First Trimester</h3>
              <p className="mb-4 dark:text-gray-300">
                {gestationInfo.firstTrimester}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Baby's organs and nervous system develop.
              </p>
            </div>
            
            <div className="bg-pink-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-3 dark:text-gray-200">Second Trimester</h3>
              <p className="mb-4 dark:text-gray-300">
                Ends on {gestationInfo.secondTrimesterEnd}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Baby's organs mature and movements begin.
              </p>
            </div>
            
            <div className="bg-pink-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-3 dark:text-gray-200">Third Trimester</h3>
              <p className="mb-4 dark:text-gray-300">
                Ends on {gestationInfo.thirdTrimesterEnd}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Baby gains weight and prepares for birth.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400 mt-12 mb-8">
        <p>
          <strong>Note:</strong> This tool provides general estimates only. Consult with a healthcare provider for medical advice.
        </p>
      </div>
    </div>
  );
}