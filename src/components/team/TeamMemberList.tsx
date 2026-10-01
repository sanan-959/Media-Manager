import React from 'react';
import type { TeamMember, TeamRole } from '../../types';
import { getRoleInfo } from '../../utils/helpers';
import { Dropdown } from '../common/Dropdown';
import { MoreHorizontal } from 'lucide-react';

interface TeamMemberListProps {
  members: TeamMember[];
  onUpdateRole: (id: string, role: TeamRole) => void;
  onRemoveMember: (id: string) => void;
}

export const TeamMemberList: React.FC<TeamMemberListProps> = ({
  members,
  onUpdateRole,
  onRemoveMember,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-2xs">
      <table className="w-full text-left border-collapse min-w-[620px]">
        <thead>
          <tr className="border-b border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <th className="py-2.5 px-3.5">Member</th>
            <th className="py-2.5 px-3.5">Role</th>
            <th className="py-2.5 px-3.5">Status</th>
            <th className="py-2.5 px-3.5">Posts Created</th>
            <th className="py-2.5 px-3.5">Last Active</th>
            <th className="py-2.5 px-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs text-slate-700 dark:text-slate-300 font-medium">
          {members.map((member) => {
            const roleInfo = getRoleInfo(member.role);
            return (
              <tr key={member.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-2.5 px-3.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{member.name}</p>
                      <p className="text-[11px] text-slate-400">{member.email}</p>
                    </div>
                  </div>
                </td>

                <td className="py-2.5 px-3.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${roleInfo.badgeClass}`}
                  >
                    {roleInfo.label}
                  </span>
                </td>

                <td className="py-2.5 px-3.5">
                  {member.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                      ● Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 text-[11px]">
                      ● Pending
                    </span>
                  )}
                </td>

                <td className="py-2.5 px-3.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                  {member.postsCreated} posts
                </td>

                <td className="py-2.5 px-3.5 text-slate-400 text-[11px]">
                  {member.lastActive}
                </td>

                <td className="py-2.5 px-3.5 text-right">
                  <Dropdown
                    trigger={
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    }
                    items={[
                      { id: 'admin', label: 'Make Admin', onClick: () => onUpdateRole(member.id, 'admin') },
                      { id: 'manager', label: 'Make Manager', onClick: () => onUpdateRole(member.id, 'manager') },
                      { id: 'creator', label: 'Make Content Creator', onClick: () => onUpdateRole(member.id, 'creator') },
                      { id: 'reviewer', label: 'Make Reviewer', onClick: () => onUpdateRole(member.id, 'reviewer') },
                      { id: 'rm', label: 'Remove Member', onClick: () => onRemoveMember(member.id), isDanger: true },
                    ]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
