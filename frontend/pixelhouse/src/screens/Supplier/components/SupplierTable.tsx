import * as React from 'react';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    TablePagination,
    Typography,
    Toolbar,
    AppBar,
    Box,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
    Add
} from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { SupplierType } from '../../../types/supplier';
import api from '../../../services/api';

type SupplierTableProp = {
    suppliers: SupplierType[];
    setSuppliers: (supplier: SupplierType[]) => void;
    handleOpenCreateSupplierModal: () => void;
    handleEditSupplier: (supplier: SupplierType) => void;
}

export default function SupplierTable({
    suppliers,
    setSuppliers,
    handleOpenCreateSupplierModal,
    handleEditSupplier
}: SupplierTableProp) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (supplier: SupplierType) => {
        handleEditSupplier(supplier);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
            return;
        }

        try {
            await api.delete(`/supplier/${id}`);
            setSuppliers(suppliers.filter(supplier => String(supplier._id) !== id));
            alert('Fornecedor excluído com sucesso!');

        } catch (error) {
            console.error('Erro ao excluir fornecedor', error);
            alert('Erro ao excluir fornecedor');
        }
    };

    // Estilos para dark mode
    const tableCellStyle = {
        color: theme.palette.text.primary,
        borderColor: theme.palette.divider,
    };

    const tableRowStyle = {
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    };

    return (
        <Paper
            sx={{
                backgroundColor: theme.palette.background.paper,
                width: '90%',
                marginLeft: '5%',
                borderRadius: 3
            }}
        >
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
                    color: theme.palette.text.primary,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Lista de Fornecedores
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <CSVLink
                            data={suppliers}
                            filename="fornecedores.csv"
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<DownloadIcon />}
                                sx={{
                                    color: theme.palette.text.primary,
                                    borderColor: theme.palette.divider,
                                    '&:hover': {
                                        borderColor: theme.palette.text.secondary,
                                    }
                                }}
                            >
                                {!isMobile && 'CSV'}
                            </Button>
                        </CSVLink>

                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={handleOpenCreateSupplierModal}
                            sx={{
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.divider,
                                '&:hover': {
                                    borderColor: theme.palette.text.secondary,
                                }
                            }}
                        >
                            Novo Fornecedor
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <TableContainer >
                <Table aria-label="tabela de fornecedores">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={tableCellStyle}>Nome</TableCell>
                            <TableCell align="right" sx={tableCellStyle}>CNPJ</TableCell>
                            <TableCell align="right" sx={tableCellStyle}>E-mail</TableCell>
                            <TableCell align="right" sx={tableCellStyle}>Cidade</TableCell>
                            <TableCell align="right" sx={tableCellStyle}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((supplier) => (
                                <TableRow
                                    key={supplier._id}
                                    sx={{
                                        ...tableRowStyle,
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell component="th" scope="row" sx={tableCellStyle}>
                                        {supplier.name}
                                    </TableCell>
                                    <TableCell align="right" sx={tableCellStyle}>{supplier.cnpj}</TableCell>
                                    <TableCell align="right" sx={tableCellStyle}>{supplier.email}</TableCell>
                                    <TableCell align="right" sx={tableCellStyle}>{supplier.city}</TableCell>
                                    <TableCell align="right" sx={tableCellStyle}>
                                        <IconButton
                                            aria-label="editar"
                                            onClick={() => handleEdit(supplier)}
                                            sx={{ color: theme.palette.primary.main }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="excluir"
                                            onClick={() => handleDelete(String(supplier._id))}
                                            sx={{ color: theme.palette.error.main }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={suppliers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Linhas por página:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                sx={{
                    color: theme.palette.text.primary,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    '& .MuiTablePagination-selectIcon': {
                        color: theme.palette.text.primary,
                    }
                }}
            />
        </Paper>
    );
}