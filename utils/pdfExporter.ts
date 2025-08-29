import { formatCurrency, formatNumber } from './formatters';
import { DEFAULT_VALUES } from '../constants';

// Declare jsPDF and autoTable from global scope (CDN)
declare const jspdf: any;
const { jsPDF } = jspdf;

interface PdfData {
    inputs: {
        petrolPrice: number;
        mileage: number;
        distance: number;
        amount: number;
    };
    calculations: {
        costPerKm: number;
        dailyCost: number;
        monthlyCost: number;
        tankRange: number;
        tankCost: number;
        litresForAmount: number;
        rangeForAmount: number;
    };
}

export const exportToPDF = (data: PdfData) => {
    const { inputs, calculations } = data;
    const doc = new jsPDF();

    const addFooter = () => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.setTextColor(150);
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text('Created By Yash K Pathak', 14, doc.internal.pageSize.height - 10);
            doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 35, doc.internal.pageSize.height - 10);
        }
    };

    // --- HEADER ---
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Fuel Cost & Scenario Analysis', 14, 22);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Report generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // --- SECTION 1: INPUTS & RESULTS ---
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', 14, 45);
    doc.setLineWidth(0.5);
    doc.line(14, 47, 196, 47);

    // Input Parameters
    const inputData = [
        ['Petrol Price:', `${formatCurrency(inputs.petrolPrice)} / L`],
        ['Bike Mileage:', `${formatNumber(inputs.mileage, 0)} km/L`],
        ['Daily Distance:', `${formatNumber(inputs.distance, 0)} km`],
    ];
    (doc as any).autoTable({
        body: inputData,
        startY: 50,
        theme: 'plain',
        styles: { fontSize: 11, cellPadding: 2 },
        columnStyles: { 0: { fontStyle: 'bold' } },
    });

    // Calculated Results
    const resultsData = [
        ['Daily Fuel Cost:', formatCurrency(calculations.dailyCost)],
        ['Monthly Fuel Cost:', formatCurrency(calculations.monthlyCost)],
        ['Cost per Kilometer:', formatCurrency(calculations.costPerKm)],
        ['Full Tank Cost:', formatCurrency(calculations.tankCost)],
        ['Full Tank Range:', `${formatNumber(calculations.tankRange, 0)} km`],
    ];
    (doc as any).autoTable({
        body: resultsData,
        startY: (doc as any).lastAutoTable.finalY + 2,
        theme: 'plain',
        styles: { fontSize: 11, cellPadding: 2 },
        columnStyles: { 0: { fontStyle: 'bold' } },
    });

    // Quick Refill Check
    (doc as any).autoTable({
        head: [['Quick Refill Check']],
        body: [
            ['Refill Amount:', formatCurrency(inputs.amount)],
            ['Litres for Amount:', `${formatNumber(calculations.litresForAmount, 2)} L`],
            ['Range for Amount:', `${formatNumber(calculations.rangeForAmount, 0)} km`],
        ],
        startY: (doc as any).lastAutoTable.finalY + 5,
        theme: 'grid',
        headStyles: { fillColor: [79, 55, 139], fontStyle: 'bold' }, // #4F378B
        styles: { fontSize: 11, cellPadding: 2 },
        columnStyles: { 0: { fontStyle: 'bold' } },
    });


    // --- SECTION 2: SCENARIO ANALYSIS ---
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Scenario Analysis', 14, (doc as any).lastAutoTable.finalY + 15);
    doc.setLineWidth(0.5);
    doc.line(14, (doc as any).lastAutoTable.finalY + 17, 196, (doc as any).lastAutoTable.finalY + 17);

    const mileageScenarios = [45, 50, 55, 60, 65];
    const distanceScenarios = [80, 100, 120, 150, 200];
    const head = [['Mileage', ...distanceScenarios.map(d => `${d} km`)]];
    const body = mileageScenarios.map(mileage => {
        const row = [`${mileage} km/L`];
        distanceScenarios.forEach(distance => {
            const cost = (inputs.petrolPrice / mileage) * distance;
            row.push(formatCurrency(cost));
        });
        return row;
    });

    (doc as any).autoTable({
        head: head,
        body: body,
        startY: (doc as any).lastAutoTable.finalY + 20,
        theme: 'striped',
        headStyles: { fillColor: [33, 0, 93], textColor: 255 }, // #21005D
        styles: { halign: 'center', fontSize: 10 },
        columnStyles: { 0: { halign: 'left', fontStyle: 'bold' } },
    });

    addFooter();
    doc.save('Rapido_Fuel_Report.pdf');
};