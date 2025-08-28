import { useMemo, useState, useEffect } from "react";
import AboutMe from "../components/AboutMe";
import Address from "../components/Address";
import Birthdate from "../components/Birthdate";
import { useConfig } from "../ConfigContext";
import { upsertSubmission } from "../api/submissionsApi";

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

export default function Wizard() {
  const { config } = useConfig();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setShowBack(step > 1);
  }, [step]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    aboutMe: "",
    address: { street: "", city: "", state: "", zip: "" },
    birthdate: "",
  });

  const page2 = useMemo(() => config.page2Components || [], [config]);
  const page3 = useMemo(() => config.page3Components || [], [config]);

  const renderComponents = (keys) => (
    <div className="space-y-5">
      {keys.map((key) => {
        if (key === "aboutMe") {
          return (
            <AboutMe
              key={key}
              value={formData.aboutMe}
              onChange={(v) => setFormData({ ...formData, aboutMe: v })}
            />
          );
        }
        if (key === "address") {
          return (
            <Address
              key={key}
              value={formData.address}
              onChange={(v) => setFormData({ ...formData, address: v })}
            />
          );
        }
        if (key === "birthdate") {
          return (
            <Birthdate
              key={key}
              value={formData.birthdate}
              onChange={(v) => setFormData({ ...formData, birthdate: v })}
            />
          );
        }
        return null;
      })}
    </div>
  );

  const saveProgress = async (currentStep) => {
    if (!formData.email) {
      alert("Enter email first (used as unique id).");
      return false;
    }
    setSaving(true);
    try {
      await upsertSubmission({
        email: formData.email,
        aboutMe: formData.aboutMe,
        address: formData.address,
        birthdate: formData.birthdate,
        step: currentStep - 1,
      });
      setSavedTick(true);
      setTimeout(() => setSavedTick(false), 1500);
      return true;
    } catch (e) {
      console.error(e);
      alert("Save failed");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const next = async () => {
    const ok = await saveProgress(step);
    if (ok) setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));
  const finish = async () => {
    const ok = await saveProgress(step);
    if (ok) alert("All steps saved! Check the Data page to confirm.");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {/* Header */}
          <header>
            <h1 className="text-3xl font-bold text-gray-900">🚀 Onboarding</h1>
            <p className="mt-1 text-sm text-gray-600">
              Complete the steps below to finish onboarding.
            </p>
          </header>

          {/* Stepper */}
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex-1 flex items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition
                  ${
                    step >= n
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-500 border-gray-300"
                  }`}
                >
                  {n}
                </div>
                {n < 3 && (
                  <div
                    className={`flex-1 h-[2px] ${
                      step > n ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form content */}
          <div className="rounded-lg bg-white shadow p-6 space-y-5">
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
              
                </p>
              </div>
            )}

            {step === 2 && renderComponents(page2)}
            {step === 3 && renderComponents(page3)}

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <span className="text-xs text-gray-500 h-5">
                {savedTick ? "Saved ✓" : ""}
              </span>
              <div className="flex gap-3">
                {showBack && (
                  <Button variant="secondary" onClick={back} disabled={saving}>
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button variant="primary" onClick={next} disabled={saving}>
                    {saving ? "Saving…" : "Next"}
                  </Button>
                ) : (
                  <Button variant="primary" onClick={finish} disabled={saving}>
                    {saving ? "Saving…" : "Finish"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-xs text-gray-500 text-center">
            Step {step} of 3
          </footer>
        </div>
      </div>
    </div>
  );
}
