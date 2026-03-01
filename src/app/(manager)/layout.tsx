import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { PropertyProvider } from '@/context/PropertyContext';
import { AppSidebar } from '@/components/manager/app-sidebar';
import { properties } from '@/data/properties';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PropertyProvider properties={properties}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </PropertyProvider>
  );
}
