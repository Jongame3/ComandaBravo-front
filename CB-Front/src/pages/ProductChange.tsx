import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../Functions/apiFetch";
import type { Product } from "../data/adminType";
import { useToast } from "../components/ToastContext";
import Header from "../components/Header";

export default function ProductChange() {
  let params = useParams();
  const navigate = useNavigate();
  const {showToast} = useToast();

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    duration: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!params.productId) {
        setErrorMessage("ID услуги не найден в адресе страницы.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErrorMessage(null);

        const response = await apiFetch(`/product/GetProductById?id=${params.productId}`);

        if (!response.ok) {
          showToast("Не удалось загрузить данные услуги.", "error");
        }

        const data: Product = await response.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Ошибка при загрузке услуги.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.productId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    let newValue: string | number = value;

    if (name === "Price" || name === "Duration") {
      newValue = value === "" ? 0 : parseFloat(value); 
    }

    setProduct((prev) => ({
      ...prev,
      [name]: newValue
    }));
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (!product.name.trim()) {
      showToast("Введите название услуги.", "info");
      return;
    }

    if (!product.description.trim()) {
      showToast("Введите описание услуги.", "info");
      return;
    }

    if (product.price <= 0) {
      showToast("Стоимость должна быть больше 0.", "info");
      return;
    }

    if (product.duration <= 0) {
      showToast("Длительность должна быть больше 0.", "info");
      return;
    }

    try {
      setSaving(true);

      const response = await apiFetch(`/product`, {
        method: "PUT",
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        showToast("Не удалось обновить услугу.", "error");
      }

      showToast("Услуга успешно обновлена!", "success");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      showToast("Ошибка при обновлении услуги.", "error");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-[#ececec] px-4 py-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-275">
          <div className="rounded-4xl bg-white p-10 text-center shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
            <p className="text-lg font-semibold text-[#1b2b6b]">
              Загрузка данных услуги...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="min-h-screen bg-[#ececec] px-4 py-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-275">
          <div className="rounded-4xl bg-white p-10 text-center shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
            <p className="text-lg font-semibold text-red-600">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={handleCancel}
              className="mt-6 rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95"
            >
              Вернуться назад
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <> 
      <Header /><section className="min-h-screen bg-[#ececec] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-275">
        <div className="rounded-4xl bg-linear-to-r from-[#1765f3] to-[#18a0f4] px-6 py-8 text-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:px-10 md:py-10">
          <div className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            Comanda Bravo • Управление услугами
          </div>

          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Изменение услуги
          </h1>

          <p className="mt-4 max-w-162.5 text-base leading-7 text-white/90">
            Обновите название, описание, стоимость и длительность услуги,
            которая отображается в каталоге.
          </p>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
            <h2 className="text-3xl font-extrabold text-[#1b2b6b]">
              Данные услуги
            </h2>

            <p className="mt-2 text-slate-500">
              Измените поля формы и сохраните обновлённую информацию.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                  Название
                </label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Например: Вакцинация"
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                  Стоимость
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Например: 500"
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                  Длительность, ч.
                </label>

                <input
                  type="number"
                  name="duration"
                  value={product.duration}
                  onChange={handleChange}
                  placeholder="Например: 1"
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b2b6b]">
                  Описание
                </label>

                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Кратко опишите услугу"
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#1765f3] focus:ring-2 focus:ring-[#1765f3]/20" />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#09da72] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Сохранение..." : "Сохранить изменения"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-full bg-[#eef3ff] px-6 py-3 text-sm font-semibold text-[#1b2b6b] transition hover:bg-[#e5edff]"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-[28px] bg-[#a8e2ba] p-6 shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
            <h2 className="text-3xl font-extrabold text-black">
              Предпросмотр услуги
            </h2>

            <p className="mt-2 text-slate-700">
              Так услуга будет выглядеть в каталоге после обновления.
            </p>

            <div className="mt-6 rounded-3xl bg-white p-6 shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
              <h3 className="text-2xl font-extrabold text-black">
                {product.name || "Название услуги"}
              </h3>

              <p className="mt-3 min-h-18 text-slate-700">
                {product.description || "Описание услуги будет отображаться здесь."}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-[#eef3ff] px-4 py-2 font-semibold text-[#1b2b6b]">
                  Цена: {product.price || 0} MDL
                </span>

                <span className="rounded-full bg-[#eef3ff] px-4 py-2 font-semibold text-[#1b2b6b]">
                  {product.duration || 0} ч.
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
                После сохранения данные будут отправлены на backend и затем
                отображены в каталоге услуг.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}