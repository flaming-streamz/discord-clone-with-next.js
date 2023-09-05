"use client";

import { Plus, Settings } from "lucide-react";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

import { ActionTooltip } from "@/components/action-tooltip";

interface Props {
  label: string;
  sectionType: "channels" | "memmbers";
  channelType?: ChannelType;
  role?: MemberRole;
  server?: ServerWithMembersWithProfiles;
}

export const ServerSection = (props: Props) => {
  const { channelType, label, sectionType, role, server } = props;
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create channel" side="top">
          <button
            onClick={() => onOpen("createChannel")}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "memmbers" && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("servermMembers", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition"
          >
            <Settings className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
