import { useEffect, useState } from "react";
import { useConfig } from "../ConfigContext";

function Button({
  children,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97] disabled:opacity-50";
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm",
    secondary:
      "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
    ghost: "text-indigo-700 hover:bg-indigo-50 focus:ring-indigo-300",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

const LABELS = {
  aboutMe: "About Me",
  address: "Address",
  birthdate: "Birthdate",
};

export default function Admin() {
  const { config, setConfig, ALLOWED, loading } = useConfig();
  const [page2, setPage2] = useState(new Set(config.page2Components));
  const [page3, setPage3] = useState(new Set(config.page3Components));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    setPage2(new Set(config.page2Components || []));
    setPage3(new Set(config.page3Components || []));
  }, [config]);

  const toggle = (set, key) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  };

  const save = async () => {
    const p2 = Array.from(page2),
      p3 = Array.from(page3);
    if (!p2.length || !p3.length)
      return setError("Each page must have at least one component.");
    setError("");
    setSaving(true);
    try {
      await setConfig({ page2Components: p2, page3Components: p3 });
      setSavedAt(new Date());
    } catch (e) {
      console.error(e);
      setError("Failed to save configuration. Try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setSavedAt(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-6xl animate-pulse space-y-4">
          <div className="h-8 w-64 rounded bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Header */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900">
              ⚙️ Admin Settings
            </h1>
            <p className="mt-1 text-sm text-gray-600">
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Options */}
            <div className="flex-1 rounded-lg bg-white shadow p-6 space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-800 border-b pb-2">
                  Page 2 Components
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {ALLOWED.map((k) => (
                    <label
                      key={k}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        checked={page2.has(k)}
                        onChange={() => setPage2((prev) => toggle(prev, k))}
                      />
                      <span className="text-sm">{LABELS[k]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-800 border-b pb-2">
                  Page 3 Components
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {ALLOWED.map((k) => (
                    <label
                      key={k}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        checked={page3.has(k)}
                        onChange={() => setPage3((prev) => toggle(prev, k))}
                      />
                      <span className="text-sm">{LABELS[k]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
              )}

              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setPage2(new Set(config.page2Components));
                    setPage3(new Set(config.page3Components));
                  }}
                >
                  Reset
                </Button>
                <Button variant="primary" onClick={save} disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </div>

            {/* Preview */}
            <aside className="w-full lg:w-1/3 rounded-lg bg-white shadow p-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">
                Current Configuration
              </h2>
              <div className="space-y-2 text-sm bg-gray-50 rounded-md p-3">
                <p>
                  <strong>Page 2:</strong>{" "}
                  {config.page2Components?.length
                    ? config.page2Components.join(", ")
                    : "None"}
                </p>
                <p>
                  <strong>Page 3:</strong>{" "}
                  {config.page3Components?.length
                    ? config.page3Components.join(", ")
                    : "None"}
                </p>
              </div>

              {savedAt && (
                <p className="mt-3 text-xs text-green-700">
                  ✅ Saved at {savedAt.toLocaleTimeString()}
                </p>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
