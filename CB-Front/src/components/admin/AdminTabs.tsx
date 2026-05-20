import type { AdminTab } from "../../data/adminType";

type AdminTabsProps = {
  activeTab: AdminTab;
  onChangeTab: (tab: AdminTab) => void;
};

const tabs: { id: AdminTab; label: string }[] = [
  { id: "overview", label: "Обзор" },
  { id: "products", label: "Добавление услуг" },
  { id: "pending", label: "Подтверждение записей" },
  { id: "appointments", label: "Просмотр записей" },
];

export function AdminTabs({ activeTab, onChangeTab }: AdminTabsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChangeTab(tab.id)}
          className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
            activeTab === tab.id
              ? "bg-[#1b2b6b] text-white"
              : "bg-white text-[#1b2b6b] hover:bg-[#eef3ff]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}