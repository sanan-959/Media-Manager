import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TeamMemberList } from '../components/team/TeamMemberList';
import { InviteMemberModal } from '../components/team/InviteMemberModal';
import { WorkflowBanner } from '../components/team/WorkflowBanner';
import { UserPlus } from 'lucide-react';

export const TeamView: React.FC = () => {
  const { teamMembers, updateTeamMemberRole, removeTeamMember } = useApp();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            Team & Approvals
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Collaborate with creators, managers, and reviewers with role-based access control
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold btn-brand-primary rounded-lg cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Visual Approval Workflow Pipeline Banner */}
      <WorkflowBanner />

      {/* Team Members List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Active Workspace Members ({teamMembers.length})
          </h3>
        </div>

        <TeamMemberList
          members={teamMembers}
          onUpdateRole={updateTeamMemberRole}
          onRemoveMember={removeTeamMember}
        />
      </div>

      {/* Invite Modal */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
};
