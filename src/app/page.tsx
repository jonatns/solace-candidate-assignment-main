"use client";

import { useState } from "react";
import { useAdvocates } from "./hooks/useAdvocates";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching } = useAdvocates(searchTerm);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Solace Advocates</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Search</label>
        <div className="flex gap-2">
          <input
            className="border rounded px-3 py-2 w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search advocates..."
          />
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2"
            onClick={() => setSearchTerm("")}
          >
            Reset
          </button>
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Searching for: <span className="font-semibold">{searchTerm}</span>
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                First Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Last Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                City
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Degree
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Specialties
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Experience (yrs)
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.data?.map((advocate, idx) => (
              <tr
                key={advocate.phoneNumber || idx}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-2">{advocate.firstName}</td>
                <td className="px-4 py-2">{advocate.lastName}</td>
                <td className="px-4 py-2">{advocate.city}</td>
                <td className="px-4 py-2">{advocate.degree}</td>
                <td className="px-4 py-2">
                  <ul className="list-disc list-inside text-sm">
                    {advocate.specialties.map((s, sIdx) => (
                      <li key={sIdx}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2">{advocate.yearsOfExperience}</td>
                <td className="px-4 py-2">{advocate.phoneNumber}</td>
              </tr>
            ))}
            {!isFetching && !data?.data?.length && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No advocates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
