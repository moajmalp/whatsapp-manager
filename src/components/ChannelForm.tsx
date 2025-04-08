
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ChannelFormData, Channel } from "@/types";

interface ChannelFormProps {
  mode: "add" | "edit";
  data: ChannelFormData | Channel;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onChange: (data: ChannelFormData | Channel) => void;
}

const ChannelForm: React.FC<ChannelFormProps> = ({
  mode,
  data,
  isSubmitting,
  onCancel,
  onSubmit,
  onChange,
}) => {
  const isAdd = mode === "add";
  const formData = data as ChannelFormData | Channel;
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isAdd ? "Add New Channel" : "Edit Channel"}</DialogTitle>
        <DialogDescription>
          {isAdd 
            ? "Create a new WhatsApp Web channel to track contacts"
            : "Make changes to the WhatsApp channel"
          }
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor={`${mode}-name`}>Channel Name</Label>
          <Input 
            id={`${mode}-name`}
            placeholder="e.g. Sales Team" 
            value={formData.name}
            onChange={(e) => onChange({
              ...formData,
              name: e.target.value
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-phone`}>Phone Number</Label>
          <Input 
            id={`${mode}-phone`}
            placeholder="e.g. +1234567890" 
            value={formData.phoneNumber}
            onChange={(e) => onChange({
              ...formData,
              phoneNumber: e.target.value
            })}
          />
          {isAdd && (
            <p className="text-xs text-muted-foreground">
              This should be the phone number associated with the WhatsApp account
            </p>
          )}
        </div>
      </div>
      
      <DialogFooter>
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSubmit}
          disabled={!formData.name || !formData.phoneNumber || isSubmitting}
        >
          {isSubmitting 
            ? (isAdd ? "Creating..." : "Saving...") 
            : (isAdd ? "Create Channel" : "Save Changes")
          }
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ChannelForm;
