import { useNavigate } from "react-router-dom";
import { type Product } from "../data/adminType";
import { useAuth } from "./AuthContext";

type ProductCardProps = {
    product : Product,
    onDelete : (id : number) => void;
}

const ProductCard = ({product, onDelete} : ProductCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex min-h-65 flex-col rounded-2xl bg-[#c8f6d5] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-[#b8efca] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
      <div>
        <h3 className="text-xl font-extrabold leading-snug text-black">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#1b2b6b]">
            {product.price} MDL
          </span>

          <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#1b2b6b]">
            {product.duration} ч.
          </span>
        </div>
      </div>

      <div className="mt-auto pt-6">
        {user?.role === 20 ? (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(`/productchange/${product.id}`)}
              className="flex-1 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#1b2b6b] shadow-sm transition hover:bg-[#eef3ff]"
            >
              Изменить
            </button>

            <button
              type="button"
              onClick={() => onDelete(product.id)}
              className="flex-1 rounded-full bg-[#09da72] px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:brightness-95"
            >
              Удалить
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate(`/booking/${product.id}`)}
            className="w-full rounded-full bg-[#09da72] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:brightness-95"
          >
            Записаться
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;