'use client';

import { Mail, Phone, MapPin, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ResidentHeader } from '@/components/resident/resident-header';
import { residentProfile } from '@/data/profile';
import { formatRM, formatDate, getInitials } from '@/lib/format';

export default function ResidentProfilePage() {
  const profile = residentProfile;

  return (
    <>
      <ResidentHeader title="Profile" subtitle="My account" />

      <div className="px-4 -mt-3 space-y-4">
        {/* Profile card */}
        <Card>
          <CardContent className="pt-5 pb-4 flex flex-col items-center text-center">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <p className="text-base font-semibold mt-3">{profile.name}</p>
            <p className="text-xs text-muted-foreground">{profile.propertyName} · Unit {profile.unit}</p>
          </CardContent>
        </Card>

        {/* Contact info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="size-4 text-muted-foreground" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="size-4 text-muted-foreground" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="size-4 text-muted-foreground" />
              <span>Floor {profile.floor}, Unit {profile.unit}</span>
            </div>
          </CardContent>
        </Card>

        {/* Lease details */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Lease Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Rent</span>
              <span className="font-medium">{formatRM(profile.monthlyRent)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lease Start</span>
              <span>{formatDate(profile.leaseStart)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lease End</span>
              <span>{formatDate(profile.leaseEnd)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Outstanding Balance</span>
              <span className="font-medium">{formatRM(profile.outstandingBalance)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {profile.documents.map((doc) => (
              <div key={doc.name} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="rounded-md bg-primary/10 p-1.5">
                  <FileText className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{doc.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
