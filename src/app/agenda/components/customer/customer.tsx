import Link from "next/link";

export function Customer() {
    return (
        <div className="bg-slate-200 w-96 p-12">
            <h1 className="text-center text-4xl">Cliente</h1>
            <h5 className="font-bold text-left">Nome</h5>
            <p className="bg-slate-300 text-left w-[100%] mb-5 p-2">Joao da Silva</p>
            <h5 className="font-bold text-left">Telefone</h5>
            <p className="bg-slate-300 text-left w-[100%] mb-5 p-2">(51)99999-9999</p>
            <h5 className="font-bold text-left">E-mail</h5>
            <p className="bg-slate-300 text-left w-[100%] mb-5 p-2">joaodasilva@gmail.com</p>
            <Link className="bg-slate-300 font-bold text-center flex justify-center items-center p-2 hover:bg-slate-600" href="#">Cancelar agendamento</Link>
        </div>
    );
  }