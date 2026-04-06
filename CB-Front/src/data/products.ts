export type Product = {
    id : number;
    name: string;
    descryption : string;
    price : number;
};

export const products : Product[] = [
    {id : 1, name: "Груминг", descryption : "Услуги по вычесыванию и стрижке ваших питомцев" , price : 500},
    {id : 2, name: "Консультация" , descryption : "Консультация с ветеринаром по поводу состояния питомца", price :300 },
    {id : 3, name: "Сдача Анализов" , descryption : "Сдача анализов для питомца", price : 600},
    {id : 4, name: "Оформление паспорта" , descryption : "Оформление паспорта питомца, по всем требованиям", price : 1000},
    {id : 5, name: "Чистка зубов" , descryption : "Чистка зубов для вашего любимого питомца", price : 200 },
    {id : 6, name: "Прививка" , descryption : "Поставить прививку вашему питомцу", price : 150 },
]