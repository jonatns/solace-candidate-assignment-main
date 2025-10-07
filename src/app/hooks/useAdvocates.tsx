import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};

export function useAdvocates(
  searchTerm: string,
  sortBy: string,
  direction: "asc" | "desc"
) {
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  return useQuery<{ data: Advocate[] }>({
    queryKey: ["advocates", debouncedSearchTerm, sortBy, direction],
    queryFn: async () => {
      const res = await fetch("/api/advocates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: debouncedSearchTerm,
          sortBy,
          direction,
        }),
      });
      if (!res.ok) throw new Error("Failed to fetch advocates");
      return res.json();
    },
  });
}
