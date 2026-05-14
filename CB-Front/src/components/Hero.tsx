 
import {NavLink} from 'react-router-dom'
 
const Hero = () => {
    return ( 
        <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-7xl rounded-4xl bg-linear-to-br from-blue-600 to-sky-500 p-8 md:p-14 lg:p-16 shadow-2xl shadow-blue-200/60">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              Comada Bravo
            </span>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Забота о здоровье ваших питомцев
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/85 md:text-lg">
              Команда Браво предоставляет широкий спектр услуг по уходу,
              диагностике и лечению домашних животных.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NavLink
                to="/registration"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Создать профиль
              </NavLink>

              <NavLink
                to="/catalog"
                className="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-3 font-bold text-white transition hover:bg-white/25"
              >
                Наши услуги
              </NavLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Осмотр", "Вакцинация", "Лечение", "Диагностика"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-4xl bg-white/10 blur-2xl" />

            <img
              src="https://terra.vet/wp-content/uploads/2021/10/25-1.jpg"
              alt="Собака на осмотре у ветеринара"
              className="relative h-65 w-full rounded-[28px] object-cover shadow-2xl md:h-90 lg:h-105"
            />
          </div>
        </div>
      </div>
    </section>
     );
}
 
export default Hero;