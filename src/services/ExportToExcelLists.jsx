import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { GoArrowRight } from "react-icons/go";

const ExportToExcelLists = ({ dataArray }) => {
    const month = dataArray[0].month;
    const exportToExcel = () => {
        dataArray.forEach(({ name, month, data }, index) => {
            const title = [name, month];
            const headers = ["Dia", "Entrada", "Saída", "Horas/Dia"];

            const footer = [
                ["Total Horas no Mês", data.bankHours?.workedHoursByMonth ? data.bankHours?.workedHoursByMonth : "00:00"],
                ["Saldo Mês Atual", data.bankHours?.totalHoursByMonth ? data.bankHours?.totalHoursByMonth : "00:00"],
                ["Saldo Mês Anterior", data.bankBalanceLastMonth.hoursBankBalance],
                ["Banco de Horas", data.bankHours?.hoursBankBalance ? data.bankHours?.hoursBankBalance : "00:00"]
            ];

            const dataRows = data.hourControls.map(item => [item.day.slice(0,10), 
                                            item.entry_time ? item.entry_time.slice(11,16) : "-",
                                            item.exit_time ? item.exit_time.slice(11,16) : "-", 
                                            item.totalWorkedByDay.slice(11,16)]);
            
            const wsData = [title, headers, ...dataRows, ...footer];
            
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, name);
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
