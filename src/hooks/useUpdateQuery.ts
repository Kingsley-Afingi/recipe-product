"use client"
import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useUpdateQuery = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryParams = useCallback(
    (newParams: Record<string, string>) => {
      const currentParams = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(newParams)) {
        if (value === "" || value === "all" || value === "Filter recipes By") {
          currentParams.delete(key) // Remove the parameter if the value is empty or default
        } else {
          currentParams.set(key, value) // Set or update the parameter if it has a value
        }
      }

      // Update the URL without a full page reload
      router.replace(`${pathname}?${currentParams.toString()}`)
    },
    [router, pathname, searchParams],
  )

  return updateQueryParams
}
