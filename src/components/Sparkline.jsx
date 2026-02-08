import React from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts';

export default function Sparkline({ data = [], color = '#3b82f6', height = 40 }) {
  const formatted = data.map((v, i) => ({ i, value: v }));

  return (
    <div className="sparkline" style={{ width: 100, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formatted} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="i" hide />
          <YAxis hide />
          <Tooltip formatter={(value) => [value, '']} />
          <Area type="monotone" dataKey="value" stroke={color} fill="url(#sparkGradient)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
