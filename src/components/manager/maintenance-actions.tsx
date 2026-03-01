'use client';

import { MoreHorizontal, Eye, UserPlus, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import type { MaintenanceRequest } from '@/types';

interface MaintenanceActionsProps {
  request: MaintenanceRequest;
}

export function MaintenanceActions({ request }: MaintenanceActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toast.info(`Viewing details for ${request.id}`)}>
          <Eye className="size-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.success(`${request.id} assigned to technician`)}>
          <UserPlus className="size-4 mr-2" />
          Assign
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.success(`Status updated for ${request.id}`)}>
          <RefreshCw className="size-4 mr-2" />
          Update Status
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast.success(`${request.id} closed`)}>
          <XCircle className="size-4 mr-2" />
          Close
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
