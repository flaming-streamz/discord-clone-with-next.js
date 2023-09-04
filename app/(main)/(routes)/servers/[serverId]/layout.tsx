import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async (props: { children: React.ReactNode; params: { serverId: string } }) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn;

  const server = await db.server.findUnique({
    where: {
      id: props.params.serverId,
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      {/* server sidebar channels container */}
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={server.id} />
      </div>

      <main className="h-full md:pl-60">{props.children}</main>
    </div>
  );
};

export default ServerIdLayout;
