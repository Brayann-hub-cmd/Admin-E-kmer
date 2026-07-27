import { FaGlobe, FaLock, FaMoneyBillWave, FaStore } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-950">{t('settings.title')}</h1>
        <p className="text-gray-500 mt-1">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[320px]">
          <div className="flex items-center gap-4 mb-8">
            <FaGlobe className="text-orange-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-950">{t('settings.general')}</h2>
          </div>

          <div className="space-y-7">
            <label className="block">
              <span className="text-gray-500">{t('settings.platformName')}</span>
              <input defaultValue="E-Kmer" className="w-full border border-gray-200 rounded-xl p-4 mt-3 text-lg outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-500">{t('settings.supportEmail')}</span>
              <input defaultValue="support@ekmer.com" className="w-full border border-gray-200 rounded-xl p-4 mt-3 text-lg outline-none" />
            </label>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[320px]">
          <div className="flex items-center gap-4 mb-8">
            <FaLock className="text-red-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-950">{t('settings.security')}</h2>
          </div>

          <div className="space-y-6 text-lg">
            <label className="flex items-center justify-between">
              <span>{t('settings.twoFactor')}</span>
              <input type="checkbox" />
            </label>
            <label className="flex items-center justify-between">
              <span>{t('settings.adminValidation')}</span>
              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[320px]">
          <div className="flex items-center gap-4 mb-8">
            <FaStore className="text-blue-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-950">{t('settings.marketplace')}</h2>
          </div>

          <div className="space-y-7">
            <label className="block">
              <span className="text-gray-500">{t('settings.commission')}</span>
              <input type="number" defaultValue="5" className="w-full border border-gray-200 rounded-xl p-4 mt-3 text-lg outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-500">{t('settings.maxImages')}</span>
              <input type="number" defaultValue="10" className="w-full border border-gray-200 rounded-xl p-4 mt-3 text-lg outline-none" />
            </label>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-7 shadow-sm min-h-[320px]">
          <div className="flex items-center gap-4 mb-8">
            <FaMoneyBillWave className="text-green-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-950">{t('settings.payments')}</h2>
          </div>

          <div className="space-y-6 text-lg">
            <label className="flex items-center justify-between">
              <span>{t('settings.orangeMoney')}</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span>{t('settings.mtnMoney')}</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span>{t('settings.bankCard')}</span>
              <input type="checkbox" />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
