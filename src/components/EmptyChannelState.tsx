
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface EmptyChannelStateProps {
  onClick: () => void;
}

const EmptyChannelState: React.FC<EmptyChannelStateProps> = ({ onClick }) => {
  return (
    <Card className="border-dashed">
      <CardContent className="py-10 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Plus className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No channels yet</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Add your first WhatsApp channel to start tracking contacts
        </p>
        <Button onClick={onClick}>Add Channel</Button>
      </CardContent>
    </Card>
  );
};

export default EmptyChannelState;
