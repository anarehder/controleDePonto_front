import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { GoArrowRight } from "react-icons/go";

const ExportToExcelLists = ({ data, month }) => {
    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        data.forEach(( d ) => {
            const title = [d.name];
            const headers = ["Dia", "Entrada", "Saída", "Horas/Dia"];

            const footer = [
                ["Total Horas no Mês", d.report?.bankHours?.workedHoursByMonth ? d.report?.bankHours?.workedHoursByMonth : "00:00"],
                ["Saldo Mês Atual", d.report?.bankHours?.totalHoursByMonth ? d.report?.bankHours?.totalHoursByMonth : "00:00"],
                ["Saldo Mês Anterior", d.report?.bankBalanceLastMonth.hoursBankBalance],
                ["Banco de Horas", d.report?.bankHours?.hoursBankBalance ? d.report?.bankHours?.hoursBankBalance : "00:00"]
            ];

            const dataRows = d.report?.hourControls.map(item => [item.day.slice(0,10), 
                                            item.entry_time ? item.entry_time.slice(11,16) : "-",
                                            item.exit_time ? item.exit_time.slice(11,16) : "-", 
                                            item.totalWorkedByDay.slice(11,16)]);
            
            const wsData = [title, headers, ...dataRows, ...footer];
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, d.name);
        });
        XLSX.writeFile(wb, `${month}_horas.xlsx`);
    }

    return (
        <ExcelButton onClick={exportToExcel}>
            Exportar Todos Para Excel
            <GoArrowRight size={24} />
        </ExcelButton>
    );
};

export default ExportToExcelLists;



const ExcelButton = styled.button`
    width: 300px;
`
