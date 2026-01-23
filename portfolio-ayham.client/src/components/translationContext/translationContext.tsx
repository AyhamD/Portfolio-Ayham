// import {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   ReactNode,
// } from "react";

// const API_URL = import.meta.env.VITE_API_URL;

// interface Translations {
//   [key: string]: string;
// }

// interface TranslationProviderProps {
//   children?: ReactNode;
// }
// const TranslationContext = createContext<Translations | undefined>(undefined);

// export const useTranslations = () => {
//   const context = useContext(TranslationContext);
//   if (!context) {
//     throw new Error(
//       "useTranslations must be used within a TranslationProvider"
//     );
//   }
//   return context;
// };

// export const TranslationProvider: React.FC<TranslationProviderProps> = ({
//   children,
// }) => {
//   const [translations, setTranslations] = useState({});

//   useEffect(() => {
//     const loadTranslations = async () => {
//       try {
//         const response = await fetch(`${API_URL}/translations`);
//         const data = await response.json();
//         setTranslations(data);
//       } catch (error) {
//         console.error("Failed to load translations:", error);
//       }
//     };

//     loadTranslations();
//   }, []);

//   return (
//     <TranslationContext.Provider value={translations}>
//       {children}
//     </TranslationContext.Provider>
//   );
// };
