import { useState } from "react";
import type { ProductCreate } from "../../data/adminType";
import { apiFetch } from "../../Functions/apiFetch";

export function AddProductTab() {
  const [product, setProduct] = useState<ProductCreate>({
    Name: "",
    Price: 0,
    Description: "",
    Duration: 0,
  });

  function handleProductChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;


    let newValue: string | number = value;

    if (name === "Price" || name === "Duration") {
      newValue = value === "" ? 0 : parseFloat(value); 
    }

    setProduct((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  async function handleSubmitProduct(e: React.FormEvent) {
    e.preventDefault();

    const response = await apiFetch("/product", {
      method: "POST",
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      console.log("Ошибка при отправке данных на сервер");
    }



    setProduct({
      Name: "",
      Price: 0,
      Description: "",
      Duration: 0,
    });
  }

  function handleClearForm() {
    setProduct({
      Name: "",
      Price: 0,
      Description: "",
      Duration: 0,
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[28px] bg-white p-6 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
        <h2 className="text-3xl font-extrabold text-[#1b2b6b]">
          Добавление продукта
        </h2>

        <p className="mt-2 text-slate-500">
          Создайте новую услугу или продукт, который будет отображаться в
          каталоге.
        </p>

        <form onSubmit={handleSubmitProduct} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
              Название
            </label>

            <input
              type="text"
              name="Name"
              value={product.Name}
              onChange={handleProductChange}
              placeholder="Например: Вакцинация"
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
              Стоимость
            </label>

            <input
              name="Price"
              value={product.Price || ""}
              onChange={handleProductChange}
              placeholder="Например: 500"
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
              Длительность, ч.
            </label>

            <input
              name="Duration"
              value={product.Duration || ""}
              onChange={handleProductChange}
              placeholder="Например: 30"
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
              Описание
            </label>

            <textarea
              name="Description"
              value={product.Description}
              onChange={handleProductChange}
              rows={5}
              placeholder="Кратко опишите продукт или услугу"
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95"
            >
              Сохранить
            </button>

            <button
              type="button"
              onClick={handleClearForm}
              className="rounded-full bg-[#eef3ff] px-6 py-3 text-sm font-semibold text-[#1b2b6b] transition hover:bg-[#e5edff]"
            >
              Очистить
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-[28px] bg-[#a8e2ba] p-6 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
        <h2 className="text-3xl font-extrabold text-black">
          Предпросмотр продукта
        </h2>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
          <h3 className="text-2xl font-extrabold text-black">
            {product.Name || "Название продукта"}
          </h3>

          <p className="mt-3 min-h-18 text-slate-700">
            {product.Description ||
              "Описание продукта будет отображаться здесь."}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[#eef3ff] px-4 py-2 font-semibold text-[#1b2b6b]">
              Цена: {product.Price || 0} MDL
            </span>

            <span className="rounded-full bg-[#eef3ff] px-4 py-2 font-semibold text-[#1b2b6b]">
              {product.Duration || 0} ч.
            </span>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black"
            >
              Записаться
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white/50 p-5">
          <p className="text-sm leading-6 text-slate-700">
            Здесь показан пример того, как продукт будет выглядеть в карточке
            каталога. 
          </p>
        </div>
      </div>
    </div>
  );
}