import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RequiredFieldMarker } from '../../components/RequiredFieldMarker';
import { SupplierType } from '../../types/supplier';
import SupplierTable from './components/SupplierTable';
import { schema } from './validations';

type SupplierFormData = Omit<SupplierType, '_id' | 'created_at' | 'updated_at'>;

export const Supplier = () => {
    const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState<SupplierType | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<SupplierFormData>({
        resolver: yupResolver(schema),
    });

    const zipcode = watch('zipcode');

    // Carrega os fornecedores ao iniciar
    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await api.get('/supplier');
            console.log(response)
            setSuppliers(response.data);

        } catch (error) {
            console.error('Error fetching suppliers', error);
        }
    };

    useEffect(() => {
        const fetchAddress = async () => {
            if (zipcode && zipcode.length === 8) {
                try {
                    const response = await api.get(`https://viacep.com.br/ws/${zipcode}/json/`);
                    const data = response.data;
                    if (!data.erro) {
                        setValue('street', data.logradouro);
                        setValue('district', data.bairro);
                        setValue('city', data.localidade);
                    }
                } catch (error) {
                    console.error('Error fetching address', error);
                }
            }
        };

        fetchAddress();
    }, [zipcode, setValue]);

    const onSubmit = async (data: SupplierFormData) => {
        try {
            if (editingSupplier) {
                await api.put(`/supplier/${editingSupplier._id}`, data);
                alert('Fornecedor atualizado com sucesso!');
            } else {
                await api.post('/supplier', data);
                alert('Fornecedor cadastrado com sucesso!');
            }

            fetchSuppliers();
            closeModal();
        } catch (error) {
            console.error('Erro ao salvar fornecedor: ', error);
            alert('Erro ao salvar fornecedor');
        }
    };

    const openModal = (supplier: SupplierType | null = null) => {
        if (supplier) {
            Object.keys(supplier).forEach(key => {
                if (key in schema.fields) {
                    setValue(key as any, supplier[key as keyof SupplierType]);
                }
            });
            setEditingSupplier(supplier);
        } else {
            reset();
            setEditingSupplier(null);
        }
        setIsModalOpen(true);
    };

    const handleEditSupplier = (supplier: SupplierType) => {
        openModal(supplier);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingSupplier(null);
    };

    return (
        <div className="w-[100vw]">
            <SupplierTable
                handleOpenCreateSupplierModal={() => openModal(null)}
                handleEditSupplier={handleEditSupplier}
                suppliers={suppliers}
                setSuppliers={setSuppliers}
            />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-black rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-blue-400">
                                {editingSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                &times;
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="space-y-4 overflow-y-auto h-[60vh] flex-1 pr-2">
                                <div>
                                    <label className="block mb-1">Nome <RequiredFieldMarker /></label>
                                    <input placeholder='Alimentos Enc...' {...register('name')} className="w-full p-2 border rounded" />
                                    <p className="text-red-500 text-sm">{errors.name?.message}</p>
                                </div>

                                <div>
                                    <label className="block mb-1">CNPJ <RequiredFieldMarker /></label>
                                    <input placeholder='12.120...'  {...register('cnpj')} className="w-full p-2 border rounded" />
                                    <p className="text-red-500 text-sm">{errors.cnpj?.message}</p>
                                </div>

                                <div>
                                    <label className="block mb-1">E-mail <RequiredFieldMarker /></label>
                                    <input placeholder='email@exemplo.com'  {...register('email')} className="w-full p-2 border rounded" />
                                    <p className="text-red-500 text-sm">{errors.email?.message}</p>
                                </div>

                                <div>
                                    <label className="block mb-1">CEP <RequiredFieldMarker /></label>
                                    <input placeholder='Digite para realizar busca automática' {...register('zipcode')} className="w-full p-2 border rounded" />
                                    <p className="text-red-500 text-sm">{errors.zipcode?.message}</p>
                                </div>

                                <div>
                                    <label className="block mb-1">Rua <RequiredFieldMarker /></label>
                                    <input placeholder='Rua do endereço'   {...register('street')} className="w-full p-2 border rounded" />
                                    <p className="text-red-500 text-sm">{errors.street?.message}</p>
                                </div>

                                <div>
                                    <label className="block mb-1">Número <RequiredFieldMarker /></label>
                                    <input placeholder='Número do endereço' {...register('number')} className="w-full p-2 border rounded" />
                                    <p className="text-red-500 text-sm">{errors.number?.message}</p>
                                </div>

                                <div>
                                    <label className="block mb-1">Bairro <RequiredFieldMarker /></label>
                                    <input {...register('district')} className="w-full p-2 border rounded" />
                                    <p className="text-red-500 text-sm">{errors.district?.message}</p>
                                </div>

                                <div>
                                    <label className="block mb-1">Cidade <RequiredFieldMarker /></label>
                                    <input {...register('city')} className="w-full p-2 border rounded" />
                                    <p className="text-red-500 text-sm">{errors.city?.message}</p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    {editingSupplier ? 'Atualizar' : 'Cadastrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};