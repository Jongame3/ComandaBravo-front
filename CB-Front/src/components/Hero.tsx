 
const Hero = () => {
    return ( 
        <section className="min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-6xl px-6 py-12 rounded-2xl bg-blue-600">
                <div className="grid items-center gap-10 md:grid-cols-2">
                    <div className="text-center md:text-left pl-5">
                        <p className="text-4xl font-bold text-white">Ветеринарная клиника Команда Браво предоставляет широкий спектр услуг по уходу и лечению за домашними животными</p>
                    </div>

                    <div className="flex justify-center">
                        <img src="https://terra.vet/wp-content/uploads/2021/10/25-1.jpg" 
                        alt="" 
                        className="h-auto w-full max-w-lg rounded-2xl object-cover"/>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default Hero;