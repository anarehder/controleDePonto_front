import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { GoArrowRight } from "react-icons/go";

const ExportToExcel = ({ name, month, data, bank }) => {
    const exportToExcel = () => {
        console.log(data);
        console.log(month);
        const title = [name, month];
        const headers = ["Dia", "Entrada", "Pausa", "Retorno", "Saída", "Horas/Dia"];

        const footer = [
            ["Total Horas no Mês", bank.totalHours],
            ["Saldo Mês Anterior", bank.previousMonthBalance],
            ["Banco de Horas", bank.bankHours]
        ];

        const dataRows = data.map(item => [item.day.slice(0,10), 
                                        item.entry_time ? item.entry_time.slice(11,16) : "-",
                                        item.pause_time ? item.pause_time.slice(11,16) : "-", 
                                        item.return_time ? item.return_time.slice(11,16) : "-", 
                                        item.exit_time ? item.exit_time.slice(11,16) : "-", 
                                        item.totalWorkedByDay.slice(11,16)]);
        
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
