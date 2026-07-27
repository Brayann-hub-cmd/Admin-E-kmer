import { FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function Reports() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-950">{t('reports.title')}</h1>
        <p className="text-gray-500 mt-2">{t('reports.subtitle')}</p>
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-500 mx-auto flex items-center justify-center text-2xl">
          <FaExclamationTriangle />
        </div>
        <h2 className="text-xl font-semibold mt-5 text-gray-950">{t('reports.moduleNotConnected')}</h2>
        <p className="text-gray-500 mt-2">
          {t('reports.noEndpoint')}
        </p>
      </div>
    </div>
  );
}
