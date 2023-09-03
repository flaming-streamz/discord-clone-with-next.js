const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0"></div>
      <main className="md:pl-[72px] h-full">{props.children}</main>
    </div>
  );
};

export default MainLayout;
