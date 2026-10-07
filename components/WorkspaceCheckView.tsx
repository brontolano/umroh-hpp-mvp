'use client';

import { useState } from 'react';

type WorkspaceStatus = 'initializing' | 'ready' | 'ready-check';

const INITIAL_STATUS: WorkspaceStatus = 'ready';

const env = {
  node: 'v26.5.1',
  npm: '11.17.0',
  build: 'passed',
};

export function WorkspaceCheckView() {
  const [status, setStatus] = useState<WorkspaceStatus>(INITIAL_STATUS);

  const refresh = () => {
    setStatus((prev) => (prev === 'ready' ? 'ready-check' : 'ready'));
  };

  return (
    <section className="card" style={{ marginTop: '24px' }}>
      <p className="eyebrow">Workspace</p>
      <h2>Status board</h2>
      <p className="caption" style={{ margin: 0, color: 'var(--muted)' }}>Internal tools workspace health.</p>
      <dl style={{ margin: 0, padding: 0, display: 'grid', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <dt style={{ margin: 0, minWidth: '90px' }}>Status</dt>
          <dd style={{ margin: 0 }}>{status}</dd>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <dt style={{ margin: 0, minWidth: '90px' }}>Node</dt>
          <dd style={{ margin: 0 }}>{env.node}</dd>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <dt style={{ margin: 0, minWidth: '90px' }}>NPM</dt>
          <dd style={{ margin: 0 }}>{env.npm}</dd>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <dt style={{ margin: 0, minWidth: '90px' }}>Build</dt>
          <dd style={{ margin: 0 }}>{env.build}</dd>
        </div>
      </dl>
      <button type="button" className="primary" onClick={refresh} style={{ marginTop: '12px' }}>
        Refresh status
      </button>
    </section>
  );
}
