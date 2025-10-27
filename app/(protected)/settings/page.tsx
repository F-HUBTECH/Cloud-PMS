import ProtectedLayout from "@/components/protected-layout";

export default function SettingPage() {
  return (
    <ProtectedLayout pageTitle="Settings">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">

        </div>
      </div>
    </ProtectedLayout>
  );
}
