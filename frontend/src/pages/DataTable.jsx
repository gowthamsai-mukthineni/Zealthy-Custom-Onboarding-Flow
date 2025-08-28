import { useEffect, useState } from "react";
import { listSubmissions } from "../api/submissionsApi";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { items } = await listSubmissions({ page: 1, limit: 50 });
        setRows(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">📊 Public Data</h1>
            <p className="mt-1 text-sm text-gray-600">
            </p>
          </header>

          {/* Card */}
          <div className="rounded-lg bg-white shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full text-sm">
                <thead className="bg-indigo-50 text-indigo-700">
                  <tr>
                    {[
                      "Email",
                      "About Me",
                      "Street",
                      "City",
                      "State",
                      "Zip",
                      "Birthdate",
                      "Step",
                      "Created",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2 text-left font-semibold border-b border-indigo-100"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Skeleton rows
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        {Array.from({ length: 9 }).map((__, j) => (
                          <td key={j} className="px-4 py-3 border-b">
                            <div className="h-3 w-24 rounded bg-gray-200" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : rows.length === 0 ? (
                    // Empty state
                    <tr>
                      <td
                        colSpan={9}
                        className="px-6 py-12 text-center text-gray-600"
                      >
                        No submissions yet. Fill the{" "}
                        <span className="font-medium text-indigo-600">
                          Onboarding
                        </span>{" "}
                        form to see data here.
                      </td>
                    </tr>
                  ) : (
                    // Data rows
                    rows.map((r) => (
                      <tr
                        key={r._id}
                        className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50/40 transition"
                      >
                        <td className="px-4 py-2 border-b">{r.email}</td>
                        <td className="px-4 py-2 border-b">
                          {r.aboutMe || ""}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {r.address?.street || ""}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {r.address?.city || ""}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {r.address?.state || ""}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {r.address?.zip || ""}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {r.birthdate || ""}
                        </td>
                        <td className="px-4 py-2 border-b">{r.step ?? 0}</td>
                        <td className="px-4 py-2 border-b text-gray-600">
                          {new Date(r.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          {!loading && rows.length > 0 && (
            <p className="mt-4 text-xs text-gray-500">
              Showing {rows.length} submissions
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
