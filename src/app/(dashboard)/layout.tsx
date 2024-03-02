const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="mx-5 my-5 p-5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
