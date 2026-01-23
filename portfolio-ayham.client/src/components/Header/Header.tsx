import { useTranslation } from "react-i18next";
import { MenuItem } from "../../interface/header";
import MenuBar from "../../shared/menuBar/menuBar";
import authStatus from "../authStatus";
import { RiAccountCircleLine } from "react-icons/ri";
import LanguageSwitcher from "../../shared/languageSwitcher/languageSwitcher";
import { useState } from "react";
import Textarea from "../../shared/TextArea/TextArea";
import sweden from "../../assets/images/svg/sweden.svg";
import UK from "../../assets/images/svg/UK.svg";
import { FaCheck, FaPenToSquare } from "react-icons/fa6";
// import { useTranslations } from "../translationContext/translationContext";

const Header: React.FC = () => {
  const { isSignedIn, logout, user } = authStatus();
  const { t } = useTranslation();
  const [editableText, setEditableText] = useState(t("header_text"));
  const [editable, setEditable] = useState(false);
  const handleSubmit = () => {};
  // const translations = useTranslations();
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditableText(e.target.value);
  };

  const handleEditable = () => {
    setEditable(true);
  };

  const profileMenuItems: MenuItem[] = [
    {
      label: "Logout",
      onClick: () => logout(),
    },
  ];
  const LanguageMenuBar = [
    {
      code: "en",
      icon: UK,
      name: t("languages.en"),
    },
    {
      code: "sv",
      icon: sweden,
      name: t("languages.sv"),
    },
  ];

  return (
    <header className="flex min-h-[20vh] flex-col bg-background text-foreground">
      <div className="  flex justify-end py-4">
        {isSignedIn && (
          <div className="pr-4">
            <MenuBar
              icon={<RiAccountCircleLine />}
              menuItems={profileMenuItems}
              isSignedIn={isSignedIn}
              user={user}
            />
          </div>
        )}

        <div className="pr-4">
          <LanguageSwitcher languages={LanguageMenuBar} />
        </div>
      </div>

      <section className="container mx-auto flex flex-col items-center justify-center px-4 py-12 md:py-24 lg:py-32">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("welcome")}
          </h1>
          {isSignedIn && editable ? (
            <div className="flex items-center">
              <Textarea
                name="headerText"
                value={editableText}
                onChange={handleTextChange}
                className="mt-4 text-lg text-muted-foreground bg-transparent border border-input p-0 focus:outline-none"
                autoFocus
              />
              <FaCheck
                onClick={handleSubmit}
                className="bg-primary mt-4 ml-4 h-fit text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <p className="mt-4 text-lg text-muted-foreground">
                {editableText}
              </p>
              {isSignedIn && (
                <>
                  <FaPenToSquare onClick={handleEditable} />
                </>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-center gap-x-6">
            <a
              href="#projects"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {t("project")}
            </a>
            <a
              href="#about"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {t("about")}
            </a>
            <a
              href="#contact"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {t("contact")}
            </a>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
