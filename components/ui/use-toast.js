"use client"

import { useToastContext } from "./toast"

export function useToast() {
  const { toast } = useToastContext()
  return { toast }
}
