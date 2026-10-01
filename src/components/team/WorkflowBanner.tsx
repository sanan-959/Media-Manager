import React from 'react';
import { ShieldCheck, Clock, Send, FileEdit } from 'lucide-react';

export const WorkflowBanner: React.FC = () => {
  const steps = [
    { title: 'Draft', desc: 'Creator drafts post', icon: <FileEdit className="w-3.5 h-3.5 text-slate-400" /> },
    { title: 'In Review', desc: 'Manager checks', icon: <Clock className="w-3.5 h-3.5 text-amber-400" /> },
    { title: 'Approved', desc: 'Ready for queue', icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> },
    { title: 'Scheduled', desc: 'Queued on calendar', icon: <Clock className="w-3.5 h-3.5 text-purple-400" /> },
    { title: 'Published', desc: 'Live on channels', icon: <Send className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-xl text-white shadow-md space-y-2.5">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          Content Approval Pipeline
        </h4>
        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
          Strict Enterprise Controls
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="p-2.5 bg-slate-900/80 border border-slate-800/90 rounded-lg relative flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-mono text-slate-400">Step {idx + 1}</span>
              {step.icon}
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">{step.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
