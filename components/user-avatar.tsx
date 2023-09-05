import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const UserAvatar = (props: { src?: string; className?: string }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", props.className)}>
      <AvatarImage src={props.src || "https://github.com/shadcn.png"} />
    </Avatar>
  );
};
