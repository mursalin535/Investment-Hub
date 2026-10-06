import jsPDF from 'jspdf';

function fmt(n) {
    return `BDT ${Number(n).toLocaleString()}`;
}

function today() {
    return new Date().toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
    });
}

function drawBorder(doc) {
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    doc.setDrawColor(0, 100, 0);
    doc.setLineWidth(1.2);
    doc.rect(10, 10, W - 20, H - 20);
    doc.setDrawColor(200, 20, 20);
    doc.setLineWidth(0.4);
    doc.rect(14, 14, W - 28, H - 28);
}

function drawEmblem(doc, cx, cy) {
    doc.setFillColor(0, 100, 0);
    doc.circle(cx, cy, 11, 'F');
    doc.setFillColor(200, 20, 20);
    doc.circle(cx, cy, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text('*', cx, cy + 2.5, { align: 'center' });
}

function sectionTitle(doc, text, y) {
    const W = doc.internal.pageSize.getWidth();
    doc.setFillColor(0, 100, 0);
    doc.rect(20, y - 4, W - 40, 9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(text.toUpperCase(), 25, y + 1.5);
    return y + 12;
}

function row(doc, label, value, y, shade) {
    const W = doc.internal.pageSize.getWidth();
    if (shade) {
        doc.setFillColor(240, 248, 240);
        doc.rect(20, y - 4, W - 40, 8, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text(label, 25, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(20, 20, 20);
    doc.text(String(value ?? '—'), 90, y);
    return y + 9;
}

function hLine(doc, y, r, g, b) {
    const W = doc.internal.pageSize.getWidth();
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(0.3);
    doc.line(20, y, W - 20, y);
}

export function generateContract({ ad, businessman, investor, participants, investmentType }) {
    try {
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });
        const W = doc.internal.pageSize.getWidth();
        const H = doc.internal.pageSize.getHeight();
        let y = 15;

        drawBorder(doc);

        // Header
        doc.setFillColor(0, 100, 0);
        doc.rect(14, 14, W - 28, 32, 'F');
        doc.setFillColor(200, 20, 20);
        doc.rect(14, 44, W - 28, 2, 'F');

        drawEmblem(doc, W / 2, 28);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.text("GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH", W / 2, 22, { align: 'center' });
        doc.setFontSize(9);
        doc.setTextColor(200, 230, 200);
        doc.text('Investment Hub — Digital Investment Platform', W / 2, 28, { align: 'center' });
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.text(investmentType === 'group' ? 'GROUP INVESTMENT CONTRACT AGREEMENT' : 'INVESTMENT CONTRACT AGREEMENT', W / 2, 35, { align: 'center' });
        doc.setFontSize(7);
        doc.setTextColor(200, 230, 200);
        doc.text('Reference No: IH/' + new Date().getFullYear() + '/AD-' + (ad.ad_id || '0000'), W / 2, 40, { align: 'center' });

        y = 54;

        // Date
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(60, 60, 60);
        doc.text('Date: ' + today(), 25, y);
        doc.text('Place: Dhaka, Bangladesh', W - 25, y, { align: 'right' });
        y += 8;
        hLine(doc, y, 0, 100, 0);
        y += 6;

        // Preamble
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(40, 40, 40);
        var preambleText = investmentType === 'group'
            ? 'This Group Investment Contract Agreement ("Agreement") is entered into on the date mentioned above between the parties identified hereinbelow, through the Investment Hub digital platform, in accordance with the laws of the People\'s Republic of Bangladesh. This contract involves a group of investors who have collectively agreed to invest in the described business opportunity. All group members listed herein share joint liability and profit-sharing rights as defined below.'
            : 'This Investment Contract Agreement ("Agreement") is entered into on the date mentioned above between the parties identified hereinbelow, through the Investment Hub digital platform, in accordance with the laws of the People\'s Republic of Bangladesh. Both parties hereby acknowledge and agree to the terms, conditions, and obligations set forth in this contract.';
        var pLines = doc.splitTextToSize(preambleText, W - 50);
        doc.text(pLines, 25, y);
        y += pLines.length * 4.5 + 6;
        hLine(doc, y, 200, 20, 20);
        y += 6;

        // Article I - Investment Details
        y = sectionTitle(doc, 'Article I — Investment Details', y);
        y = row(doc, 'Company Name', ad.company_name, y, false);
        y = row(doc, 'Company Valuation', fmt(ad.company_valuation), y, true);
        y = row(doc, 'Investment Amount', fmt(ad.amount_needed), y, false);
        if (investmentType === 'group' && participants && participants.length > 0) {
            y = row(doc, 'Per Member Share', fmt(Math.floor(ad.amount_needed / participants.length)), y, true);
            y = row(doc, 'Total Investors', participants.length, y, false);
        }
        y = row(doc, 'Last Month Revenue', fmt(ad.last_month_sale), y, true);
        y = row(doc, 'Last Year Revenue', fmt(ad.last_year_sale), y, false);
        y = row(doc, 'Total Revenue', fmt(ad.total_sale), y, true);
        y = row(doc, 'Profit Percentage', (ad.profit_percentage ? ad.profit_percentage + '%' : 'N/A'), y, false);
        y = row(doc, 'Profit Deadline', ad.profit_deadline || 'N/A', y, true);
        y += 2;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        doc.text('Business Pitch', 25, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(40, 40, 40);
        var pitchLines = doc.splitTextToSize(ad.pitch || 'N/A', W - 55);
        doc.text(pitchLines, 25, y);
        y += pitchLines.length * 4 + 6;
        hLine(doc, y, 0, 100, 0);
        y += 6;

        // Article II - Businessman
        y = sectionTitle(doc, 'Article II — Party of the First Part (Businessman)', y);
        y = row(doc, 'Full Name', businessman.name, y, false);
        y = row(doc, 'Email Address', businessman.email, y, true);
        y = row(doc, 'Contact Number', businessman.phone, y, false);
        y += 6;
        hLine(doc, y, 200, 20, 20);
        y += 6;

        // Article III - Investors
        if (investmentType === 'group' && participants && participants.length > 0) {
            // Group investors table
            y = sectionTitle(doc, 'Article III — Party of the Second Part (Group Investors)', y);

            // Table header
            doc.setFillColor(0, 100, 0);
            doc.rect(20, y - 3, W - 40, 8, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7);
            doc.setTextColor(255, 255, 255);
            doc.text('#', 25, y + 1.5);
            doc.text('INVESTOR NAME', 35, y + 1.5);
            doc.text('EMAIL', 80, y + 1.5);
            doc.text('PHONE', 120, y + 1.5);
            doc.text('SHARE', W - 45, y + 1.5);
            y += 10;

            // Table rows
            const perShare = Math.floor(ad.amount_needed / participants.length);
            for (var pi = 0; pi < participants.length; pi++) {
                if (y > H - 50) {
                    doc.addPage();
                    drawBorder(doc);
                    y = 20;
                }
                if (pi % 2 === 0) {
                    doc.setFillColor(240, 248, 240);
                    doc.rect(20, y - 3, W - 40, 7, 'F');
                }
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7);
                doc.setTextColor(40, 40, 40);
                var p = participants[pi];
                doc.text(String(pi + 1), 25, y + 1);
                doc.text(p.name || '—', 35, y + 1);
                doc.text(p.email || '—', 80, y + 1);
                doc.text(p.phone || '—', 120, y + 1);
                doc.text(fmt(pi === participants.length - 1
                    ? ad.amount_needed - perShare * (participants.length - 1)
                    : perShare), W - 45, y + 1);
                y += 7;
            }

            // Individual investor detail cards (if space allows)
            y += 3;
            for (var pi2 = 0; pi2 < participants.length; pi2++) {
                if (y > H - 60) {
                    doc.addPage();
                    drawBorder(doc);
                    y = 20;
                }
                doc.setFillColor(240, 248, 240);
                doc.rect(20, y - 3, W - 40, 16, 'F');
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(8);
                doc.setTextColor(0, 100, 0);
                doc.text('Investor ' + (pi2 + 1), 25, y + 1);
                var pp = participants[pi2];
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.5);
                doc.setTextColor(40, 40, 40);
                doc.text('Name: ' + (pp.name || '—'), 25, y + 6);
                doc.text('Email: ' + (pp.email || '—'), 25, y + 10);
                doc.text('Phone: ' + (pp.phone || '—'), 90, y + 6);
                doc.text('Total Portfolio: ' + fmt(pp.total_investment), 90, y + 10);
                y += 18;
            }

            y += 2;
            hLine(doc, y, 0, 100, 0);
            y += 6;

            // Article IV - Terms
            y = sectionTitle(doc, 'Article IV — Terms & Conditions', y);
            var terms = [
                '1. All group investors listed in Article III jointly agree to invest the amount specified into the business described herein.',
                '2. The investment amount shall be divided equally among all group members as shown in the share breakdown.',
                '3. Each group investor bears proportional liability and is entitled to proportional profit sharing.',
                '4. The Businessman agrees to utilize the invested capital solely for the purposes described in the business pitch.',
                '5. Both parties agree to provide quarterly financial reports and updates on business performance.',
                '6. Profit sharing shall be distributed equally among all group investors unless otherwise agreed.',
                '7. Any dispute arising from this contract shall be resolved through arbitration in Dhaka, Bangladesh.',
                '8. This contract is binding and enforceable under the laws of the People\'s Republic of Bangladesh.',
                '9. Any group investor may withdraw with 30 days written notice to the Businessman and other group members.',
                '10. This Agreement constitutes the entire understanding between the parties.',
            ];
        } else {
            // Individual investor
            y = sectionTitle(doc, 'Article III — Party of the Second Part (Investor)', y);
            y = row(doc, 'Full Name', investor.name, y, false);
            y = row(doc, 'Email Address', investor.email, y, true);
            y = row(doc, 'Contact Number', investor.phone, y, false);
            y = row(doc, 'Total Portfolio', fmt(investor.total_investment), y, true);
            y = row(doc, 'Total Returns', fmt(investor.total_profit), y, false);
            y += 6;
            hLine(doc, y, 0, 100, 0);
            y += 6;

            // Article IV - Terms
            y = sectionTitle(doc, 'Article IV — Terms & Conditions', y);
            var terms = [
                '1. The Investor agrees to invest the amount specified in Article I into the business described herein.',
                '2. The Businessman agrees to utilize the invested capital solely for the purposes described in the business pitch.',
                '3. Both parties agree to provide quarterly financial reports and updates on business performance.',
                '4. Profit sharing shall be mutually agreed upon and documented in a supplementary agreement.',
                '5. Any dispute arising from this contract shall be resolved through arbitration in Dhaka, Bangladesh.',
                '6. This contract is binding and enforceable under the laws of the People\'s Republic of Bangladesh.',
                '7. Either party may terminate this agreement with 30 days written notice to the other party.',
                '8. This Agreement constitutes the entire understanding between the parties.',
            ];
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(40, 40, 40);
        for (var ti = 0; ti < terms.length; ti++) {
            if (y > H - 50) break;
            var tLines = doc.splitTextToSize(terms[ti], W - 55);
            doc.text(tLines, 25, y);
            y += tLines.length * 4 + 1.5;
        }
        y += 4;
        hLine(doc, y, 200, 20, 20);
        y += 8;

        // Article V - Signatures
        var sigArticle = investmentType === 'group' ? 'Article V — Signatures & Seals (All Parties)' : 'Article V — Signatures & Seals';
        y = sectionTitle(doc, sigArticle, y);
        y += 4;

        // Businessman signature
        doc.setDrawColor(0, 100, 0);
        doc.setLineWidth(0.4);
        doc.line(25, y, 90, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(80, 80, 80);
        doc.text('Signature of the First Party', 25, y + 4);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(20, 20, 20);
        doc.text(businessman.name || '—', 25, y + 9);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(100, 100, 100);
        doc.text('Businessman / Ad Owner', 25, y + 13);

        // Stamp
        doc.setDrawColor(200, 20, 20);
        doc.setLineWidth(0.8);
        doc.circle(W / 2, y + 2, 14, 'S');
        doc.setLineWidth(0.3);
        doc.circle(W / 2, y + 2, 12, 'S');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6);
        doc.setTextColor(200, 20, 20);
        doc.text('INVESTMENT', W / 2, y - 2, { align: 'center' });
        doc.text('HUB', W / 2, y + 2, { align: 'center' });
        doc.text('APPROVED', W / 2, y + 6, { align: 'center' });

        if (investmentType === 'group' && participants && participants.length > 0) {
            // Group investor signatures - right side
            doc.line(W - 90, y, W - 25, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(80, 80, 80);
            doc.text('Signature of the Second Party (Lead Investor)', W - 90, y + 4);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(20, 20, 20);
            doc.text(participants[0].name || '—', W - 90, y + 9);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.setTextColor(100, 100, 100);
            doc.text('Group Investor — Lead', W - 90, y + 13);

            // Other investor signatures
            y += 22;
            for (var si = 1; si < participants.length; si++) {
                if (y > H - 40) {
                    doc.addPage();
                    drawBorder(doc);
                    y = 20;
                }
                var sigX = si % 2 === 0 ? 25 : W - 90;
                if (si % 2 === 0) {
                    doc.line(sigX, y, sigX + 65, y);
                } else {
                    doc.line(sigX, y, sigX + 65, y);
                }
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7);
                doc.setTextColor(80, 80, 80);
                doc.text('Signature of Investor ' + (si + 1), sigX, y + 4);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(7.5);
                doc.setTextColor(20, 20, 20);
                doc.text(participants[si].name || '—', sigX, y + 8);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(6.5);
                doc.setTextColor(100, 100, 100);
                doc.text('Group Investor', sigX, y + 12);
                if (si % 2 === 1) y += 16;
            }
            if (participants.length % 2 === 0) y += 16;
        } else {
            // Individual investor signature - right side
            doc.line(W - 90, y, W - 25, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(80, 80, 80);
            doc.text('Signature of the Second Party', W - 90, y + 4);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(20, 20, 20);
            doc.text(investor.name || '—', W - 90, y + 9);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.setTextColor(100, 100, 100);
            doc.text('Investor', W - 90, y + 13);
            y += 24;
        }

        y += 4;
        hLine(doc, y, 0, 100, 0);
        y += 6;

        // Witness
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(0, 100, 0);
        doc.text('WITNESSED BY:', 25, y);
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(60, 60, 60);
        doc.text('Investment Hub Digital Platform', 25, y);
        doc.text('Contract ID: IH-' + new Date().getFullYear() + '-AD' + (ad.ad_id || '0000'), 25, y + 4);
        doc.text('Generated: ' + today(), 25, y + 8);

        // Footer
        doc.setFillColor(0, 100, 0);
        doc.rect(14, H - 26, W - 28, 12, 'F');
        doc.setFillColor(200, 20, 20);
        doc.rect(14, H - 14, W - 28, 1.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(255, 255, 255);
        doc.text('INVESTMENT HUB  ·  OFFICIAL DOCUMENT  ·  CONFIDENTIAL', W / 2, H - 21, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6);
        doc.setTextColor(200, 230, 200);
        doc.text('This is a digitally generated contract. No physical signature is required.', W / 2, H - 17, { align: 'center' });

        // Save
        var filename = 'Contract_IH_AD' + (ad.ad_id || '0000') + '_' + (businessman.name || 'Biz').replace(/\s+/g, '_') + '_vs_' + (investmentType === 'group' ? 'Group_' + (participants?.length || 0) + '_investors' : (investor.name || 'Inv').replace(/\s+/g, '_')) + '.pdf';
        doc.save(filename);
        return true;
    } catch (err) {
        console.error('Contract generation error:', err);
        alert('Failed to generate contract. Please try again. Error: ' + err.message);
        return false;
    }
}
