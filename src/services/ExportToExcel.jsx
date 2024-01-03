import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { GoArrowRight } from "react-icons/go";

const ExportToExcel = ({ name, month, data, bank }) => {
    const exportToExcel = () => {
        const title = [name, month];
        const headers = ["Dia", "Entrada", "Pausa", "Retorno", "Saída", "Horas/Dia"];

        const footer = [
            ["Total Horas no Mês", bank.totalHours],
            ["Saldo Mês Anterior", bank.previousMonthBalance],
            ["Banco de Horas", bank.bankHours]
        ];

        const dataRows = data.map(item => [item.data, item.entrada, item.pausa, item.retorno, item.saida, item.horasDia]);
        
        const wsData = [title, headers, ...dataRows, ...footer];

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${name}_${month}_horas.xlsx`);
    };

    return (
        <ExcelButton onClick={exportToExcel}>
            Exportar para Excel
            <GoArrowRight size={24} />
        </ExcelButton>
    );
};

export default ExportToExcel;



const ExcelButton = styled.button`
    width: 300px;
`
