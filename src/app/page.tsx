import Link from 'next/link';
import { Building, Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-700 flex items-center justify-center shadow-lg">
            <span className="text-white font-extrabold text-2xl tracking-tight">PM</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Propmann</h1>
          <p className="text-muted-foreground text-sm">
            Modern property management platform
          </p>
        </div>

        <div className="grid gap-3">
          <Link href="/manager">
            <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="pt-5 pb-4 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Building className="size-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Manager Dashboard</p>
                  <p className="text-sm text-muted-foreground">Property management & analytics</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/resident">
            <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="pt-5 pb-4 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Smartphone className="size-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Resident Portal</p>
                  <p className="text-sm text-muted-foreground">Mobile-first resident experience</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Demo app &middot; No real data
        </p>
      </div>
    </div>
  );
}
