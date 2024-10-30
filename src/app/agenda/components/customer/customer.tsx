export function Customer() {
    return (
        <div className="bg-gray-200 p-6 w-64 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">Cliente</h2>
            <div className="text-sm mb-2">
                <strong>Nome:</strong> João da Silva
            </div>
            <div className="text-sm mb-2">
                <strong>Telefone:</strong> (51) 99999-9999
            </div>
            <div className="text-sm mb-4">
                <strong>E-mail:</strong> joaodasilva@gmail.com
            </div>
            <button className="bg-slate-500 text-white py-2 px-4 rounded-lg font-bold text-sm w-full hover:bg-slate-600">
                Cancelar agendamento
            </button>
        </div>
    );
}