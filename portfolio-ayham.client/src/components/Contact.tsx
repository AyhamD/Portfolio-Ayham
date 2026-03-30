import { useState } from "react";
import { Download, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "../hook/useToast";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "react-i18next";

interface PersonalContactData {
  email: string;
  location: string;
  cvUrl?: string;
}

export const Contacts = ({ personal }: { personal: PersonalContactData }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast({
      title: t("contact_view.messageSent"),
      description: t("contact_view.thankYouMessage"),
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const handleDownloadCV = () => {
    if (!personal.cvUrl) {
      toast({
        title: t("contact_view.cvDownload"),
        description: t("contact_view.cvDownloadSoon"),
      });
      return;
    }

    toast({
      title: t("contact_view.cvDownload"),
      description: t("contact_view.cvDownloadSoon"),
    });

    window.open(personal.cvUrl, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("contact_view.getInTouch")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t("contact_view.interestedInWorkingTogether")}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t("contact_view.email")}</h3>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t("contact_view.location")}</h3>
                  <p className="text-slate-400">{personal.location}</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleDownloadCV}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              {t("contact_view.downloadCV")}
            </Button>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4"
            >
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  {t("contact_view.name")}
                </label>
                <Input
                  type="text"
                  placeholder={t("contact_view.yourName")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  {t("contact_view.email")}
                </label>
                <Input
                  type="email"
                  placeholder={t("contact_view.yourEmail")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  {t("contact_view.message")}
                </label>
                <Textarea
                  placeholder={t("contact_view.yourMessage")}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300"
              >
                {t("contact_view.sendMessage")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
