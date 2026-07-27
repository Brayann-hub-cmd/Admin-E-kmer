import { FaBell } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function Notifications() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">{t('notifications.title')}</h1>
          <p className="text-gray-500 mt-2">{t('notifications.subtitle')}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 mx-auto flex items-center justify-center text-2xl">
          <FaBell />
        </div>
        <h2 className="text-xl font-semibold mt-5 text-gray-950">{t('notifications.moduleNotConnected')}</h2>
        <p className="text-gray-500 mt-2">
          {t('notifications.comingSoon')}
        </p>
      </div>
    </div>
  );
}
