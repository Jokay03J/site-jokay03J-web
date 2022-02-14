import { useState, useEffect, Fragment } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from '@headlessui/react';
import { KeyIcon } from '@heroicons/react/outline';
import { useNavigate } from "react-router-dom";
import { app } from "../util/firebase";
import md5 from "md5";
import ModalNewPassword from "./ModalNewPassword";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function SettingsForm() {

  const [avatarState, setAvatarState] = useState(null);

  const [modalopen, setModalOpen] = useState(false);
  const [emailHash, setEmailHash] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {

    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setEmailHash(md5(user.email))
        setEmail(user.email)
      } else {
        // User is signed out
        // ...
        navigate("/login")
      }
    });

    return () => {

    }

  }, []);

  return (
    <>
      {/* settings form */}
      <div className="space-y-6 m-3 xs:m-1">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-500">
                {t("profileNav")}
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      nom d'utilisateur
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        https://jokay03J.tk/profile/
                      </span>
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="jokay03J"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    {t("aboutNav")}
                  </label>
                  <div className="mt-1">
                    <textarea
                      disabled
                      id="about"
                      name="about"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 bg-stone-100 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="disabled"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="mt-1 flex items-center space-x-5">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <img src={`https://0.gravatar.com/avatar/${emailHash}`} />
                    </span>
                    <label
                      htmlFor="file-upload"
                      className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span>{t("uploadFileSetting")}</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => { handleFileChange(e.currentTarget.files[0], user) }} />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{t("infoNavTitle")}</h3>
              <p className="mt-1 text-sm text-gray-500">{t("infoNavText")}</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      {t("email")}
                    </label>
                    <input
                      disabled
                      type="text"
                      name="email-address"
                      id="email-address"
                      value={email}
                      autoComplete="email"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg text-red-600 font-medium leading-6">{t("dangerNav")}</h3>
              <p className="mt-1 text-sm text-gray-500">{(t("dangerNavText"))}</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6">
                <button type="button" className="ml-3 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">supprimer votre compte</button>
                <button type="button" onClick={() => setModalOpen(true)} className="ml-3 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-stone-100 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-100">modifier votre mot de passe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="ml-3 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {/* modal change password */}
        <ModalNewPassword open={modalopen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  )
}

function handleFileChange(avatarState, userState) {

  console.log(avatarState);

  // Get a non-default Storage bucket
  const firebaseApp = getApp(app);
  const storage = getStorage(app, "gs://cdn-jokay.appspot.com/");

  const storageRef = ref(storage, 'avatar/');
  let nameFile
  switch (avatarState.type) {

    case "image/jpeg":
      nameFile = `${userState.uid}.jpeg`
      break;

    case "image/png":
      nameFile = `${userState.uid}.png`
      break;

    case "image/svg+xml":
      nameFile = `${userState.uid}.svg`
      break;

  }

  let blob = avatarState.slice(0, avatarState.size, avatarState.type);
  const newFile = new File([blob], nameFile, { type: avatarState.type });

  //'file' comes from the Blob or File API
  uploadBytes(storageRef, newFile).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });

}