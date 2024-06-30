import { toast } from "sonner";

interface useToasterProps {
  id?: string;
  message: string;
  type: "success" | "error" | "warning";
  duration: number;
  position?: "top-left" | "bottom-left" | "top-right" | "bottom-right";
}

export default function useToaster({
  message,
  type,
  id,
  duration,
  position = "bottom-right"
}: useToasterProps) {
  toast[type](message, {
    id,
    duration,
    position
  });
}