import React, { useState, useRef, useEffect } from "react";
import i18n from "i18next";
import { Button } from "../../components/ui/button";

interface Language {
  code: string;
  name: string;
  icon: string;
}

interface LanguageSwitcherProps {
  languages: Language[];
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ languages }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsDropdownOpen(false);
  };

  const currentLanguage = i18n.language;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        variant="ghost"
        className="items-center bg-slate-800/60 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 shadow-sm px-2 py-1"
      >
        <img
          src={languages.find((lang) => lang.code === currentLanguage)?.icon}
          className="w-5 h-5 flex"
        />
      </Button>
      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-slate-900 border border-slate-700 shadow-lg">
          <ul className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button 
                  className={`flex items-center w-full px-3 py-2 text-sm text-left truncate transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 ${
                    currentLanguage === lang.code
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-slate-200 hover:bg-slate-800 hover:text-white"
                  }`}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <img src={lang.icon} className="w-5 h-5 mr-2" />
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
