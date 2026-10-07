import React from 'react';

type TabKey = string;

interface TabNavProps {
  labels: Record<TabKey, string>;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function TabNav({ labels, activeTab, onTabChange }: TabNavProps) {
  return (
    <nav>
      {Object.keys(labels).map((k) => (
        <button
          className={activeTab === k ? 'active' : ''}
          onClick={() => onTabChange(k)}
          key={k}
        >
          {labels[k]}
        </button>
      ))}
    </nav>
  );
}
