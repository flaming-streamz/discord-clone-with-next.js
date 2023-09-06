import { Hash, Menu } from "lucide-react";

interface Props {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = (props: Props) => {
  const { name, serverId, type, imageUrl } = props;
  return (
    <div className="text-md font-semibold flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <Menu className="w-5 h-5" />
      {type === "channel" && <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
};
