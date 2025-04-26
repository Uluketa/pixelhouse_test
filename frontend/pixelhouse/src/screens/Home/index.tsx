import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div
            className='d-flex w-[100vw] h-[100vh] flex-col content-center items-center text-center space-y-4'
        >
            <h1>Prova de Avaliação Técnica</h1>
            <p>Clique no botão abaixo para abrir a tela de fornecedores</p>

            <button
                onClick={() => navigate('/Supplier')}
                className='text-sm'
            >
                Acessar Fornecedores
            </button>
        </div>
    );
}