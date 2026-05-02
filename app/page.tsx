"use client";

import { useState, useMemo } from 'react';
import leaderboardData from '../data/leaderboard.json';
import Link from 'next/link';

// --- Custom SVG Sort Icon Component ---
const SortIcon = ({ sortKey, currentSortConfig }: { sortKey: string, currentSortConfig: { key: string, direction: 'asc' | 'desc' } }) => {
  const isActive = currentSortConfig.key === sortKey;
  const direction = currentSortConfig.direction;

  return (
    <svg 
      className="inline-block ml-2 w-3 h-4 align-middle" 
      viewBox="0 0 10 16" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Upward Triangle (Lights up when ASC) */}
      <polygon
        points="5,0 10,7 0,7"
        fill="currentColor"
        className={`transition-colors duration-150 ${isActive && direction === 'asc' ? 'text-blue-600' : 'text-gray-300'}`}
      />
      {/* Downward Triangle (Lights up when DESC) */}
      <polygon
        points="0,9 10,9 5,16"
        fill="currentColor"
        className={`transition-colors duration-150 ${isActive && direction === 'desc' ? 'text-blue-600' : 'text-gray-300'}`}
      />
    </svg>
  );
};

export default function Home() {

  // State to track which column we are sorting by, and in what direction
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({
    key: 'accuracy', // Default sort
    direction: 'desc'
  });

  // The sorting function
  const sortedData = useMemo(() => {
    let sortableItems = [...leaderboardData];
    sortableItems.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortableItems;
  }, [sortConfig]);

  // Function to handle clicks on the table headers
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Helper to render the up/down arrows
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <span className="text-gray-300 ml-1">↕</span>;
    return sortConfig.direction === 'asc' ? <span className="text-blue-600 ml-1">▲</span> : <span className="text-blue-600 ml-1">▼</span>;
  };

  return (
    <main className="max-w-5xl mx-auto p-8 font-sans text-gray-900">
      <header className="mb-12 border-b pb-6 text-center">
        <h1 className="text-4xl font-bold mb-4">[PLACEHOLDER: RegBench: A Benchmark for Complex Regulatory Reasoning]</h1>
        <p className="text-lg text-gray-600 mb-4">
          Anonymous submission for NeurIPS 2026.
        </p>
        <nav className="flex gap-4 justify-center">
          <Link href="/" className="text-blue-600 hover:underline font-medium">Leaderboard</Link>
          <Link href="/submit" className="text-blue-600 hover:underline font-medium">Submit Results</Link>
          <a href="#" className="text-blue-600 hover:underline font-medium">[PLACEHOLDER: Download Dataset]</a>
          <a href="#" className="text-blue-600 hover:underline font-medium">[PLACEHOLDER: Read the Paper]</a>
        </nav>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About the Dataset</h2>
        <p className="leading-relaxed text-gray-700 mb-4">
          [PLACEHOLDER: Paper's abstract here. Paper's abstract here. Paper's abstract here. Paper's abstract here. Paper's abstract here. Paper's abstract here. Paper's abstract here. Paper's abstract here. Paper's abstract here. Paper's abstract here.]
        </p>
      </section>

      <section className="mb-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Dataset Example</h2>
        <div className="text-sm text-gray-800 space-y-3 font-mono">
          <p><strong>Domain:</strong> [PLACEHOLDER: e.g., basel_12cfr217]</p>
          <p><strong>Question:</strong> [PLACEHOLDER: Insert a sample question here, e.g., "A Board-regulated institution acting as an advanced approaches bank..."]</p>
          <p><strong>Expected Derivation:</strong> [PLACEHOLDER: Insert the step-by-step reasoning chain required to arrive at the answer.]</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Current Leaderboard</h2>
        <div className="overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900">Rank</th>
                
                {/* Clickable Headers with Custom Sort Icons */}
                <th 
                  className="px-3 py-3.5 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-200 select-none group" 
                  onClick={() => requestSort('modelName')}
                >
                  Model <SortIcon sortKey="modelName" currentSortConfig={sortConfig} />
                </th>
                
                <th 
                  className="px-3 py-3.5 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-200 select-none group" 
                  onClick={() => requestSort('accuracy')}
                >
                  Accuracy <SortIcon sortKey="accuracy" currentSortConfig={sortConfig} />
                </th>
                
                <th 
                  className="px-3 py-3.5 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-200 select-none group" 
                  onClick={() => requestSort('reasoningScore')}
                >
                  Reasoning Score <SortIcon sortKey="reasoningScore" currentSortConfig={sortConfig} />
                </th>
                
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Methodology</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedData.map((row, index) => (
                <tr key={row.modelName} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-semibold">{row.modelName}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-mono">{row.accuracy.toFixed(1)}%</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-mono">{row.reasoningScore.toFixed(2)}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{row.methodology}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}