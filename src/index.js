import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          profileNav: "Informations",
          aboutNav: "About",
          infoNavTitle: "Personnal information",
          infoNavText: "Information for contact you",
          email: "Email adress",
          uploadFileSetting: "upload a file",
          dangerNav: "Danger zone",
          dangerNavText: "control your account(password,delete account)",
          changePasswordTitle: "Change your password",
          changePasswordText: "Change your password,disconnected all session"
        },
      },
      fr: {
        translation: {
          profileNav: "Informations",
          aboutNav: "A propos",
          infoNavTitle: "Information personnel",
          infoNavText: "Information pour vous contacter",
          uploadFileSetting: "envoyer un fichier",
          email: "Adresse email",
          dangerNav: "Zone de danger",
          dangerNavText: "Controler votre compte(mot de passe,suppression de compte)",
          changePasswordTitle: "Changer votre mot de passe",
          changePasswordText: "Changer votre mot de passe rendra toute vos sessions invalide"
        },
      },
    },
    lng: "fr",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);