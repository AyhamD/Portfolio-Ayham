import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Textarea } from "../components/ui/textarea";
import { useEffect, useState } from "react";
import { useAuth } from "../context.tsx/authContext";
import { Button } from "../components/ui/button";
import { contentAPI } from "../services/authService";
import { Card } from "../components/ui/card";
import type { aboutProps, personal } from "../interface/interfaces";
import { Input } from "../components/ui/input";

export const AdminAbout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const [aboutData, setAboutData] = useState<aboutProps | null>(null); // EN
  const [aboutSummarySv, setAboutSummarySv] = useState<string>(""); // SV summary
  const [aboutHighlightsSv, setAboutHighlightsSv] = useState<string[]>([]); // SV highlights
  const [personalData, setPersonalData] = useState<personal | null>(null); // EN
  const [personalTaglineSv, setPersonalTaglineSv] = useState<string>(""); // SV tagline
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    } else if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadData = async () => {
    try {
      const [aboutEnRes, aboutSvRes, personalEnRes, personalSvRes] =
        await Promise.all([
          contentAPI.getAbout("en"),
          contentAPI.getAbout("sv"),
          contentAPI.getPersonal("en"),
          contentAPI.getPersonal("sv"),
        ]);

      setAboutData(aboutEnRes.data);
      setAboutSummarySv(aboutSvRes.data.summary ?? "");
      setAboutHighlightsSv(aboutSvRes.data.highlights ?? []);

      setPersonalData(personalEnRes.data);
      setPersonalTaglineSv(personalSvRes.data.tagline ?? "");
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        // Save EN
        contentAPI.updateAbout({
          language: "en",
          summary: aboutData?.summary,
          highlights: aboutData?.highlights,
          languages: aboutData?.languages,
        }),
        // Save SV
        contentAPI.updateAbout({
          language: "sv",
          summary: aboutSummarySv,
          highlights: aboutHighlightsSv,
          languages: aboutData?.languages,
        }),

        contentAPI.updatePersonal({
          language: "en",
          name: personalData?.name,
          title: personalData?.title,
          email: personalData?.email,
          location: personalData?.location,
          tagline: personalData?.tagline,
          cvUrl: personalData?.cvUrl,
        }),
        contentAPI.updatePersonal({
          language: "sv",
          name: personalData?.name,
          title: personalData?.title,
          email: personalData?.email,
          location: personalData?.location,
          tagline: personalTaglineSv,
          cvUrl: personalData?.cvUrl,
        }),
      ]);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setSaving(false);
    }
  };

  const addHighlight = () => {
    if (aboutData) {
      setAboutData({
        ...aboutData,
        highlights: [...(aboutData.highlights ?? []), ""],
      });
    }
  };

  const updateHighlight = (index: number, value: string) => {
    if (aboutData) {
      const newHighlights = [...(aboutData.highlights ?? [])];
      newHighlights[index] = value;
      setAboutData({ ...aboutData, highlights: newHighlights });
    }
  };

  const removeLanguage = (index: number) => {
    if (aboutData) {
      const newLanguages = [...(aboutData.languages ?? [])];
      newLanguages.splice(index, 1);
      setAboutData({ ...aboutData, languages: newLanguages });
    }
  };

  const updateLanguage = (
    index: number,
    field: "name" | "level",
    value: string
  ) => {
    if (aboutData) {
      const newLanguages = [...(aboutData.languages ?? [])];
      newLanguages[index] = {
        ...newLanguages[index],
        [field]: value,
      };
      setAboutData({ ...aboutData, languages: newLanguages });
    }
  };

  const removeHighlight = (index: number) => {
    if (aboutData) {
      const newHighlights = [...(aboutData.highlights ?? [])];
      newHighlights.splice(index, 1);
      setAboutData({ ...aboutData, highlights: newHighlights });
    }
  };
  const addLanguage = () => {
    if (aboutData) {
      setAboutData({
        ...aboutData,
        languages: [...(aboutData.languages ?? []), { name: "", level: "" }],
      });
    }
  };

  if (loading || !aboutData || !personalData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">
                Personal & About
              </h1>
            </div>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Personal Information */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Full Name
                </label>
                <Input
                  value={personalData?.name}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      name: e.target.value,
                    })
                  }
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Title
                </label>
                <Input
                  value={personalData?.title}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, title: e.target.value })
                  }
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">
                CV URL
              </label>
              <Input
                placeholder="/cv/ayham-cv.pdf or https://..."
                value={personalData?.cvUrl ?? ""}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    cvUrl: e.target.value,
                  })
                }
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Tagline (EN)
                </label>
                <Input
                  value={personalData?.tagline}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      tagline: e.target.value,
                    })
                  }
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Tagline (SV)
                </label>
                <Input
                  value={personalTaglineSv}
                  onChange={(e) => setPersonalTaglineSv(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  value={personalData?.email}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, email: e.target.value })
                  }
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Location
                </label>
                <Input
                  value={personalData?.location}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      location: e.target.value,
                    })
                  }
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* About Summary for EN and SV */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              About Summary (EN)
            </h2>
            <Textarea
              value={aboutData?.summary}
              onChange={(e) =>
                setAboutData({ ...aboutData, summary: e.target.value })
              }
              rows={6}
              className="bg-slate-900 border-slate-700 text-white resize-none"
            />
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              About Summary (SV)
            </h2>
            <Textarea
              value={aboutSummarySv}
              onChange={(e) => setAboutSummarySv(e.target.value)}
              rows={6}
              className="bg-slate-900 border-slate-700 text-white resize-none"
            />
          </Card>
        </div>

        {/* Highlights EN */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Highlights (EN)</h2>
            <Button
              onClick={addHighlight}
              size="sm"
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </div>
          <div className="space-y-3">
            {aboutData?.highlights?.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  placeholder="Enter a highlight"
                  className="bg-slate-900 border-slate-700 text-white flex-1"
                />
                <Button
                  onClick={() => removeHighlight(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Highlights SV */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Highlights (SV)</h2>
            <Button
              onClick={() =>
                setAboutHighlightsSv([...(aboutHighlightsSv ?? []), ""])
              }
              size="sm"
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </div>
          <div className="space-y-3">
            {aboutHighlightsSv.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={highlight}
                  onChange={(e) => {
                    const newHighlights = [...aboutHighlightsSv];
                    newHighlights[index] = e.target.value;
                    setAboutHighlightsSv(newHighlights);
                  }}
                  placeholder="Enter a highlight (SV)"
                  className="bg-slate-900 border-slate-700 text-white flex-1"
                />
                <Button
                  onClick={() => {
                    const newHighlights = [...aboutHighlightsSv];
                    newHighlights.splice(index, 1);
                    setAboutHighlightsSv(newHighlights);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Languages */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Languages</h2>
            <Button
              onClick={addLanguage}
              size="sm"
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
          </div>
          <div className="space-y-3">
            {aboutData?.languages?.map((lang, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={lang.name}
                  onChange={(e) =>
                    updateLanguage(index, "name", e.target.value)
                  }
                  placeholder="Language name"
                  className="bg-slate-900 border-slate-700 text-white flex-1"
                />
                <Input
                  value={lang.level}
                  onChange={(e) =>
                    updateLanguage(index, "level", e.target.value)
                  }
                  placeholder="Level (e.g., Native, Fluent)"
                  className="bg-slate-900 border-slate-700 text-white flex-1"
                />
                <Button
                  onClick={() => removeLanguage(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};
