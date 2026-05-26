import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, addDays, isAfter } from "date-fns";
import { useAuth } from "../components/AuthContext";
import {type Product } from "../data/adminType";
import { apiFetch } from "../Functions/apiFetch";
import Header from "../components/Header";
import type { Pet } from "./UserProfile";

type AppointmentSlot = number; 


export default function BookingPage() {
  const navigate = useNavigate();
  let params = useParams();
  const { user } = useAuth();

  const [service, setService] = useState<Product | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);

  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    const week: string[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(today, i);
      if (day.getDay() === 0) {
        continue;
      }
    week.push(format(day, "yyyy-MM-dd"));
    }
    setDates(week);
    setSelectedDate(week[0]);
  }, []);

  useEffect(() => {
    async function loadService() {
      const res = await apiFetch(`/product/GetProductById?id=${params.serviceId}`);
      if (!res.ok) return;
      const data: Product = await res.json();
      setService(data);
    }
    loadService();
  }, []);

  useEffect(() => {
    async function loadPets() {
      if (!user?.id) return;
      const res = await apiFetch(`/pet/GetByUserId?userId=${user.id}`);
      if (!res.ok) return;
      const data: Pet[] = await res.json();
      setPets(data);
      if (data.length > 0) setSelectedPet(data[0].id);
    }
    loadPets();
  }, [user?.id]);


  useEffect(() => {
    async function loadSlots() {
      if (!selectedDate) return;
      const res = await apiFetch(`/appointment/GetFreeHours?date=${selectedDate}`)
      if (!res.ok) return;
      const data: AppointmentSlot[] = await res.json();

      const now = new Date();
      now.setMinutes(now.getMinutes() + 30);
      const filteredSlots = data.filter((slot) => {
        const slotTime = new Date(`${selectedDate}T${String(slot).padStart(2, "0")}:00`);
        return isAfter(slotTime, now);
      });

      setAvailableSlots(filteredSlots);
      if (filteredSlots.length > 0) setSelectedSlot(filteredSlots[0]);
    }
    loadSlots();
  }, [selectedDate]);

  async function handleBooking() {
    if (!selectedDate || selectedSlot === null || !selectedPet) return;

    const response = await apiFetch("/appointment", {
      method : "POST",
      body: JSON.stringify({
        id: 0,
        userId: user?.id,
        username: user?.username,
        productInfo: service?.name,
        startTime: selectedSlot,
        date: selectedDate,
        petInfo: pets.find((pet) => pet.id === selectedPet)?.name,
        duration: service?.duration,
        isApproved: false,
        petType: pets.find((pet) => pet.id === selectedPet)?.type, 
      })
    })
    if (!response.ok) {
      throw new Error("хуйня какаято");
    }
    navigate("/");
  }

  return (
    <><Header /><div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-md space-y-4">
        <h2 className="text-3xl font-bold">{service?.name || "Загрузка..."}</h2>
        <p className="text-gray-700">{service?.description}</p>
        <p className="font-semibold text-lg">Цена: {service?.price} MDL</p>
        <p className="text-gray-900 mt-2">Длительность: {service?.duration} ч.</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md space-y-4">
        <h3 className="text-2xl font-bold">Выбор даты и времени</h3>

        <div className="flex gap-2 overflow-x-auto py-2">
          {dates.map((date) => {
            const day = new Date(date);

            const dayName = format(day, "EEE");
            const dayNumber = format(day, "dd");

            const isSelected = date === selectedDate;

            return (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`h-20 w-18 shrink-0 rounded-full flex flex-col items-center justify-center text-sm font-semibold transition
                  ${isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}
                `}
              >
                <span className="text-sm font-bold uppercase">
                  {dayName}
                </span>

                <span className="mt-1 text-xs">
                  {dayNumber}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 flex-wrap py-2">
          {availableSlots.length === 0 ? (
            <p className="text-gray-500">Нет доступных слотов</p>
          ) : (
            availableSlots.map((slot) => {
              const isSelected = slot === selectedSlot;
              return (
                <button
                  key={slot}
                  className={`px-4 py-2 rounded-full border ${isSelected ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {String(slot).padStart(2, "0")}:00
                </button>
              );
            })
          )}
        </div>
        <div className="py-2">
          <label className="block mb-1 font-semibold">Выберите питомца</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedPet ?? ""}
            onChange={(e) => setSelectedPet(Number(e.target.value))}
          >
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleBooking}
        >
          Записаться на услугу
        </button>
      </div>
    </div></>
  );
}