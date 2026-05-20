import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function BookingPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    async function fetchService() {
      const response = await fetch(`https://localhost:7061/api/product/get Product by ID?id=${serviceId}`);
      const data: Service = await response.json();
      setService(data);
    }

    if (serviceId) fetchService();
  }, [serviceId]);

  if (!service) return <p>Загрузка...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{service.name}</h2>
      <p>{service.description}</p>
      <p>Цена: {service.price} MDL</p>
      <button className="mt-4 rounded bg-green-400 px-4 py-2 text-white">
        Записаться на услугу
      </button>
    </div>
  );
}