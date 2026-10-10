import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Meeting } from '../types';

export function exportMeetingPDF(meeting: Meeting) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor: [number, number, number] = [20, 20, 25];
  const accentColor: [number, number, number] = [60, 60, 70];
  const lightGrey: [number, number, number] = [120, 120, 130];

  // Header banner / title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.text('AI MEETING COPILOT', 14, 20);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...lightGrey);
  doc.text('EXECUTIVE INTELLIGENCE REPORT', 14, 26);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, 196, 26, { align: 'right' });

  // Divider line
  doc.setDrawColor(220, 220, 225);
  doc.setLineWidth(0.5);
  doc.line(14, 30, 196, 30);

  // Meeting Metadata
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...primaryColor);
  doc.text(meeting.title, 14, 40);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...accentColor);
  doc.text(`Date: ${meeting.date}   |   Duration: ${meeting.duration}   |   Participants: ${meeting.participants.join(', ')}`, 14, 47);

  let currentY = 56;

  // Executive Summary
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('1. Executive Summary', 14, currentY);
  currentY += 5;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 55);
  const summaryLines = doc.splitTextToSize(meeting.summary || 'No summary available.', 182);
  doc.text(summaryLines, 14, currentY);
  currentY += summaryLines.length * 5 + 6;

  // Key Points
  if (meeting.keyPoints && meeting.keyPoints.length > 0) {
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text('2. Key Discussion Points', 14, currentY);
    currentY += 5;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 55);
    meeting.keyPoints.forEach(pt => {
      const ptLines = doc.splitTextToSize(`•  ${pt}`, 180);
      doc.text(ptLines, 14, currentY);
      currentY += ptLines.length * 4.5;
    });
    currentY += 5;
  }

  // Decisions Table
  if (meeting.decisions && meeting.decisions.length > 0) {
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text('3. Recorded Decisions', 14, currentY);
    currentY += 2;

    const decisionsRows = meeting.decisions.map(d => [d.decision, d.context, d.owner]);

    autoTable(doc, {
      startY: currentY,
      head: [['Decision', 'Context & Rationale', 'Owner']],
      body: decisionsRows,
      theme: 'grid',
      headStyles: { fillColor: [30, 32, 38], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 80 },
        2: { cellWidth: 32 }
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 8;
  }

  // Action Items Table
  if (meeting.actionItems && meeting.actionItems.length > 0) {
    // Check if new page needed
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text('4. Action Items & Owners', 14, currentY);
    currentY += 2;

    const actionRows = meeting.actionItems.map(a => [
      a.task,
      a.owner,
      a.dueDate,
      a.priority,
      a.status
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Action Item', 'Owner', 'Due Date', 'Priority', 'Status']],
      body: actionRows,
      theme: 'grid',
      headStyles: { fillColor: [30, 32, 38], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 22 },
        4: { cellWidth: 20 }
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 8;
  }

  // Questions & Next Steps
  if ((meeting.questions && meeting.questions.length > 0) || (meeting.nextSteps && meeting.nextSteps.length > 0)) {
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }

    if (meeting.questions && meeting.questions.length > 0) {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text('5. Unresolved Questions', 14, currentY);
      currentY += 5;

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 65);
      meeting.questions.forEach(q => {
        const qLines = doc.splitTextToSize(`?  ${q}`, 180);
        doc.text(qLines, 14, currentY);
        currentY += qLines.length * 4.5;
      });
      currentY += 4;
    }

    if (meeting.nextSteps && meeting.nextSteps.length > 0) {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text('6. Next Steps', 14, currentY);
      currentY += 5;

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 65);
      meeting.nextSteps.forEach(s => {
        const sLines = doc.splitTextToSize(`→  ${s}`, 180);
        doc.text(sLines, 14, currentY);
        currentY += sLines.length * 4.5;
      });
    }
  }

  // Footer note
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 155);
    doc.text(
      `AI Meeting Copilot — Page ${i} of ${pageCount} | Confidential Internal Record`,
      105,
      287,
      { align: 'center' }
    );
  }

  // Trigger download
  const sanitizedTitle = meeting.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  doc.save(`${sanitizedTitle}_report.pdf`);
}
