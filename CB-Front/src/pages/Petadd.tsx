import { useState } from "react";
import { useAuth } from "../components/AuthContext"
import { apiFetch } from "../Functions/apiFetch"
import { type Pet, PetTypeMap } from "./UserProfile"
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";



export function Petadd() {
    const {user} = useAuth()
    const navigate = useNavigate()
    const [pet, setPet] = useState<Pet>({
    id : 0,
    name: "",
    healthProblems: "",
    userID: user?.id || 0,
    type: 0,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setPet((prev) => ({
      ...prev,
      [name]: name === "type" ? parseInt(value, 10) : value,
      userID: user?.id || 0, 
    }));
  }


  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiFetch("/pet", {
        method: "POST",
        body: JSON.stringify(pet),
      });

      if (!response.ok) throw new Error("Не удалось добавить питомца");

      alert("Питомец успешно добавлен!");
      setPet({ id: 0, name: "", healthProblems: "", userID: user?.id || 0, type: 0 });
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Ошибка при добавлении питомца");
    } finally {
      setLoading(false);
      navigate("/profile")
    }
  }

  return (
    <>
        <Header />
        <div className="max-w-md mt-10 mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold">Добавить питомца</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Имя питомца</label>
                    <input
                        type="text"
                        name="name"
                        value={pet.name}
                        onChange={handleChange}
                        placeholder="Например: Ричи"
                        className="w-full border rounded px-3 py-2"
                        required />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Проблемы со здоровьем</label>
                    <textarea
                        name="healthProblems"
                        value={pet.healthProblems}
                        onChange={handleChange}
                        placeholder="Если есть, кратко опишите"
                        className="w-full border rounded px-3 py-2"
                        rows={3} />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Тип питомца</label>
                    <select
                        name="type"
                        value={pet.type}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        {Object.entries(PetTypeMap)
                            .map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    {loading ? "Сохраняем..." : "Добавить питомца"}
                </button>
            </form>
        </div>
      </>
  );
}