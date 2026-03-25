import { useRef, useState, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CartItem } from '@/context/QuotationCartContext';
import { CelebrityService } from '@/services/celebrity.service';

interface QD {
  clientName: string;
  contactNumber: string;
  eventType: string;
  venue: string;
  fromDate: string;
  toDate: string;
}
interface PP { details: QD; items: CartItem[]; total: number; discount: number; quoteNo: string; validUntil: string; dateRange: string; }

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);
const fmtDate = (s: string) => s ? new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
const todayDisplay = () => new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
const todayStr = () => new Date().toISOString().split('T')[0];
const makeQuoteNo = () => { const n = new Date(); return `Goonj-${n.toLocaleString('en-US', { month: 'short' }).toUpperCase()}${String(n.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`; };
const makeValidUntil = () => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }); };

const S: Record<string, React.CSSProperties> = {
  page:       { position: 'relative', width: '794px', height: '1123px', background: '#fff', fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.5', color: '#111', overflow: 'hidden', boxSizing: 'border-box', pageBreakAfter: 'always' },
  bgFull:     { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 0 },
  content:    { position: 'relative', zIndex: 1, padding: '160px 40px 300px', height: '100%', boxSizing: 'border-box' },
  metaSection:{ display: 'flex', gap: '18px', marginBottom: '16px' },
  colL:       { width: '46%' },
  colR:       { width: '54%' },
  metaTbl:    { borderCollapse: 'collapse' },
  metaCell:   { padding: '2px 0', verticalAlign: 'top' },
  metaKey:    { minWidth: '80px', fontWeight: '600' },
  metaSep:    { padding: '0 8px' },
  secTitle:   { fontWeight: '900', textDecoration: 'underline', marginBottom: '6px', fontSize: '14px' },
  forText:    { margin: '0', lineHeight: '1.6', fontSize: '14px' },
  termsSec:   { display: 'flex', gap: '18px', marginBottom: '16px', paddingBottom: '6px' },
  termP:      { margin: '2px 0', fontSize: '13.5px' },
  note:       { fontSize: '11.5px', marginTop: '6px', fontStyle: 'italic' },
  itemsTbl:   { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' },
  thItem:     { background: 'linear-gradient(90deg, #4a8030, #3a6020)', color: '#ffffff', padding: '8px 12px', fontSize: '14px', fontWeight: '800', textAlign: 'left', letterSpacing: '0.02em' },
  thQty:      { background: 'linear-gradient(90deg, #4a8030, #3a6020)', color: '#ffffff', padding: '8px 12px', fontSize: '14px', fontWeight: '800', textAlign: 'right', letterSpacing: '0.02em', width: '120px' },
  tr:         { borderBottom: '1px solid rgba(221, 221, 221, 0.5)' },
  tdItem:     { padding: '8px 12px', fontSize: '14px' },
  tdQty:      { padding: '8px 12px', textAlign: 'right', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '700' },
  totSec:     { position: 'relative', padding: '10px 0 6px', display: 'flex', justifyContent: 'flex-end' },
  totRight:   { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' },
  totTbl:     { borderCollapse: 'collapse' },
  totLbl:     { padding: '2px 12px 2px 0', textAlign: 'right', color: '#333', fontSize: '14px', fontWeight: '600', minWidth: '90px' },
  totVal:     { padding: '2px 0', textAlign: 'right', fontSize: '14px', fontWeight: '700', minWidth: '90px' },
  totBox:     { border: '2px solid #111', borderRadius: '30px', padding: '8px 24px', fontSize: '16px', fontWeight: '900', background: 'rgba(255, 255, 255, 0.9)', display: 'inline-block', marginTop: '5px' },
  sigs:       { display: 'flex', gap: '70px', margin: '20px 0 12px', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '40px' },
  sigBlock:   { fontSize: '13px', textAlign: 'center' },
  sigScrawl:  { fontFamily: '"Brush Script MT", "Dancing Script", cursive', fontSize: '32px', color: '#111', lineHeight: '1.1', height: '38px' },
  sigLine:    { borderBottom: '2px solid #555', width: '150px', margin: '4px 0 6px' },
  sigLabel:   { margin: '0', fontSize: '13px' },
  sigRole:    { margin: '0', fontSize: '13px' },
  footer:     { borderTop: 'none' }
};

const PQ = forwardRef<HTMLDivElement, PP>(({ details, items, total, discount, quoteNo, validUntil, dateRange }, ref) => {
  // Page 1 has header + payment terms taking ~280px, so fewer items fit
  // Subsequent pages have more room
  const ITEMS_PAGE_1 = 8;
  const ITEMS_PER_PAGE = 14;
  // Total + signatures need ~220px, so last page items are limited further
  const ITEMS_LAST_PAGE = 10;

  // Split items across pages
  const pages: CartItem[][] = [];
  let remaining = [...items];

  // Page 1
  pages.push(remaining.splice(0, ITEMS_PAGE_1));

  // Middle + last pages
  while (remaining.length > 0) {
    const isNextLast = remaining.length <= ITEMS_LAST_PAGE;
    pages.push(remaining.splice(0, isNextLast ? ITEMS_LAST_PAGE : ITEMS_PER_PAGE));
  }

  // If only 1 page and items > ITEMS_LAST_PAGE, we need to ensure totals fit
  // Move overflow to a new page
  if (pages.length === 1 && pages[0].length > ITEMS_LAST_PAGE) {
    const overflow = pages[0].splice(ITEMS_LAST_PAGE);
    pages.push(overflow);
  }

  const PageFooter = () => (
    <div style={{ position: 'absolute', bottom: '30px', left: '40px', right: '40px', borderTop: '1px solid #ccc', paddingTop: '8px', fontSize: '11px', color: '#555', display: 'flex', justifyContent: 'space-between' }}>
      <span>Goonj Entertainment | +91-9897642145</span>
      <span>MSME : UDYAM-UK-05-0097096</span>
    </div>
  );

  return (
    <div ref={ref}>
      {pages.map((pageItems, pageIndex) => {
        const isFirstPage = pageIndex === 0;
        const isLastPage = pageIndex === pages.length - 1;

        return (
          <div style={{ ...S.page, marginBottom: '32px' }} key={pageIndex}>
            <img src="/qouteTemp.jpeg" alt="" style={S.bgFull} crossOrigin="anonymous" />
            <div style={S.content}>
              {isFirstPage && (
                <div style={S.metaSection}>
                  <div style={S.colL}>
                    <table style={S.metaTbl}>
                      <tbody>
                        <tr><td style={{...S.metaCell, ...S.metaKey}}>Date</td><td style={{...S.metaCell, ...S.metaSep}}>:</td><td style={S.metaCell}>{todayDisplay()}</td></tr>
                        <tr><td style={{...S.metaCell, ...S.metaKey}}>Quote No</td><td style={{...S.metaCell, ...S.metaSep}}>:</td><td style={S.metaCell}>{quoteNo}</td></tr>
                        <tr><td style={{...S.metaCell, ...S.metaKey}}>Valid Until</td><td style={{...S.metaCell, ...S.metaSep}}>:</td><td style={S.metaCell}>{validUntil}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={S.colR}>
                    <p style={S.secTitle}>QUOTATION FOR</p>
                    <p style={S.forText}>
                      <strong>{details.clientName}</strong><br />
                      {details.contactNumber}<br />
                      Event : {details.eventType}<br />
                      {details.venue && <>Venue : {details.venue}<br /></>}
                      {dateRange}
                    </p>
                  </div>
                </div>
              )}

              {isFirstPage && (
                <div style={S.termsSec}>
                  <div style={S.colL}>
                    <p style={S.secTitle}>PAYMENT TERMS</p>
                    <p style={S.termP}>Booking - </p>
                    <p style={S.termP}>Advance - </p>
                    <p style={S.termP}>1<sup>st</sup> Installment - </p>
                    <p style={S.termP}>Balance Amount - </p>
                    <p style={S.note}><u><strong>Note</strong></u> : Balance payment needs to be done 24hrs before event day.</p>
                  </div>
                  <div style={S.colR}>
                    <p style={S.secTitle}>IMPORTANT NOTE</p>
                    <p style={S.termP}>This is a <strong>preliminary estimate</strong> generated for reference purposes only.</p>
                    
                    <p style={S.termP}>This quotation is <strong>not confirmed</strong> until reviewed and approved by the Goonj Entertainment team.</p>
                    
                    <p style={S.termP}>Please contact us to finalise your booking:</p>
                    <p style={S.termP}><strong>📞 +91-9897642145</strong></p>
                    <p style={S.termP}><strong>✉ goonjentertainment3@gmail.com</strong></p>
                  </div>
                </div>
              )}

              {!isFirstPage && (
                <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
                  Quotation {quoteNo} — Continued (Page {pageIndex + 1})
                </div>
              )}

              <table style={S.itemsTbl}>
                <thead>
                  <tr>
                    <th style={{ ...S.thItem, width: '40px', textAlign: 'center' }}>#</th>
                    <th style={S.thItem}>ITEM</th>
                    <th style={S.thQty}>QUANTITY</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((item, i) => {
                    const globalIndex = pageIndex === 0 ? i : ITEMS_PAGE_1 + (pageIndex - 1) * ITEMS_PER_PAGE + i;
                    return (
                      <tr key={item.id} style={S.tr}>
                        <td style={{ ...S.tdItem, textAlign: 'center', color: '#666', fontSize: '12px' }}>{globalIndex + 1}</td>
                        <td style={S.tdItem}>{item.name}</td>
                        <td style={S.tdQty}>₹{fmt(item.price)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {isLastPage && (
                <>
                  <div style={S.totSec}>
                    <div style={S.totRight}>
                      <table style={S.totTbl}>
                        <tbody>
                          <tr><td style={S.totLbl}>Subtotal :</td><td style={S.totVal}>₹{fmt(total)}/-</td></tr>
                          <tr><td style={S.totLbl}>Discount :</td><td style={S.totVal}>- ₹{fmt(discount)}/-</td></tr>
                          <tr><td style={S.totLbl}>GST (18%) :</td><td style={S.totVal}>₹{fmt(Math.round((total - discount) * 0.18))}/-</td></tr>
                        </tbody>
                      </table>
                      <div style={S.totBox}>TOTAL : ₹{fmt(total - discount + Math.round((total - discount) * 0.18))}/-</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});
PQ.displayName = 'PrintableQuotation';

export const QuotationPreviewModal = ({ isOpen, onClose, items, total, discount = 0, couponCode }: { isOpen: boolean; onClose: () => void; items: CartItem[]; total: number; discount?: number; couponCode?: string }) => {
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [details, setDetails] = useState<QD>({ clientName: '', contactNumber: '', eventType: '', venue: '', fromDate: todayStr(), toDate: todayStr() });
  // Generate fresh quote number each time modal opens
  const [quoteNo, setQuoteNo] = useState(makeQuoteNo);
  const [validUntil, setValidUntil] = useState(makeValidUntil);
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.72);

  // Reset and generate new quote number each time modal opens
  useEffect(() => {
    if (isOpen) {
      setQuoteNo(makeQuoteNo());
      setValidUntil(makeValidUntil());
      setStep('form');
      setDetails({ clientName: '', contactNumber: '', eventType: '', venue: '', fromDate: todayStr(), toDate: todayStr() });
    }
  }, [isOpen]);

  useEffect(() => {
    const updateScale = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth - 48;
      // On desktop cap at 0.72, on mobile fit to container
      const scale = containerWidth >= 794 ? 0.72 : containerWidth / 794;
      setPreviewScale(scale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [step]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      const el = previewRef.current;
      if (!el) return;

      // Temporarily reset scale so html2canvas captures at full 794px width
      const wrapper = el.parentElement as HTMLElement;
      const prevTransform = wrapper?.style.transform ?? '';
      const prevMarginBottom = wrapper?.style.marginBottom ?? '';
      if (wrapper) {
        wrapper.style.transform = 'scale(1)';
        wrapper.style.marginBottom = '0';
      }

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: el.scrollHeight,
      });

      // Restore scale
      if (wrapper) {
        wrapper.style.transform = prevTransform;
        wrapper.style.marginBottom = prevMarginBottom;
      }

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const A4_W_MM = 210;
      const A4_H_MM = 297;

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      const imgHeightMm = (canvasH / canvasW) * A4_W_MM;
      let yMm = 0;
      let firstPage = true;

      while (yMm < imgHeightMm) {
        if (!firstPage) pdf.addPage();
        firstPage = false;

        const sliceHMm = Math.min(A4_H_MM, imgHeightMm - yMm);
        const srcY = Math.floor((yMm / imgHeightMm) * canvasH);
        const srcH = Math.ceil((sliceHMm / imgHeightMm) * canvasH);

        const slice = document.createElement("canvas");
        slice.width = canvasW;
        slice.height = srcH;

        const ctx = slice.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(canvas, 0, srcY, canvasW, srcH, 0, 0, canvasW, srcH);
        }

        pdf.addImage(slice.toDataURL('image/png'), 'PNG', 0, 0, A4_W_MM, sliceHMm);
        yMm += A4_H_MM;
      }

      pdf.save(`${quoteNo}.pdf`);

      // Save quotation record to DB
      const gst = Math.round((total - discount) * 0.18);
      const grandTotal = total - discount + gst;
      await CelebrityService.saveQuotationRecord({
        quote_no: quoteNo,
        client_name: details.clientName,
        contact_number: details.contactNumber,
        event_type: details.eventType,
        event_from_date: details.fromDate,
        event_to_date: details.toDate,
        venue: details.venue || undefined,
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, category: i.category })),
        subtotal: total,
        discount,
        gst,
        total: grandTotal,
        coupon_code: couponCode || undefined,
      });

      // Send push notification via ntfy.sh
      const ntfyTopic = import.meta.env.VITE_NTFY_TOPIC;
      console.log('ntfy topic:', ntfyTopic); // debug
      if (ntfyTopic) {
        const itemList = items.map((i, idx) => `${idx + 1}. ${i.name} — ₹${new Intl.NumberFormat('en-IN').format(i.price)}`).join('\n');
        const body = [
          `📋 Quote: ${quoteNo}`,
          `👤 Client: ${details.clientName}`,
          `📞 Contact: ${details.contactNumber}`,
          `🎉 Event: ${details.eventType}${details.venue ? ` @ ${details.venue}` : ''}`,
          `📅 Date: ${fmtDate(details.fromDate)} → ${fmtDate(details.toDate)}`,
          ``,
          `🛒 Items (${items.length}):`,
          itemList,
          ``,
          `💰 Subtotal: ₹${new Intl.NumberFormat('en-IN').format(total)}`,
          discount > 0 ? `🏷 Discount: -₹${new Intl.NumberFormat('en-IN').format(discount)}${couponCode ? ` (${couponCode})` : ''}` : '',
          `📊 GST (18%): ₹${new Intl.NumberFormat('en-IN').format(gst)}`,
          `✅ TOTAL: ₹${new Intl.NumberFormat('en-IN').format(grandTotal)}`,
        ].filter(Boolean).join('\n');

        try {
          const res = await fetch(`https://ntfy.sh/${ntfyTopic}`, {
            method: 'POST',
            headers: {
              'Title': `New Quote - ${details.clientName} (${details.eventType})`,
              'Priority': 'high',
              'Tags': 'money_with_wings,bell',
              'Content-Type': 'text/plain',
            },
            body,
          });
          console.log('ntfy response:', res.status, res.statusText);
        } catch (ntfyErr) {
          // Fallback: try with no-cors mode (won't get response but message still sends)
          try {
            await fetch(`https://ntfy.sh/${ntfyTopic}`, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'text/plain' },
              body: `New Quote: ${details.clientName} | ${details.eventType} | ₹${new Intl.NumberFormat('en-IN').format(grandTotal)}`,
            });
          } catch (e2) {
            console.error('ntfy fallback also failed:', e2);
          }
        }
      } else {
        console.warn('VITE_NTFY_TOPIC not set in .env');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  if (!isOpen) return null;
  const dateRange = `${fmtDate(details.fromDate)} - ${fmtDate(details.toDate)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#1a1a1a] border border-gold/20 rounded-2xl shadow-2xl">

          {/* Modal header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border-b border-gold/20">
            <h2 className="font-display text-xl font-bold text-gold-light">
              {step === 'form' ? 'Quotation Details' : 'Preview Quotation'}
            </h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors"><X size={20} /></button>
          </div>

          <div className="p-6">
            {step === 'form' ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Client Name</Label>
                    <Input placeholder="Full name" value={details.clientName}
                      onChange={e => setDetails(d => ({ ...d, clientName: e.target.value }))}
                      className={`bg-secondary border-border/40 focus:border-gold/50 ${details.clientName && details.clientName.length < 3 ? 'border-red-500/60' : ''}`} />
                    {details.clientName && details.clientName.length < 3 && (
                      <p className="text-xs text-red-400">Name must be at least 3 characters</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Contact Number</Label>
                    <Input placeholder="+91 XXXXX XXXXX" value={details.contactNumber}
                      onChange={e => setDetails(d => ({ ...d, contactNumber: e.target.value.replace(/[^0-9+\s-]/g, '') }))}
                      className={`bg-secondary border-border/40 focus:border-gold/50 ${details.contactNumber && details.contactNumber.replace(/\D/g, '').length < 10 ? 'border-red-500/60' : ''}`} />
                    {details.contactNumber && details.contactNumber.replace(/\D/g, '').length < 10 && (
                      <p className="text-xs text-red-400">Enter a valid 10-digit number</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Event Type</Label>
                    <select
                      value={details.eventType}
                      onChange={e => setDetails(d => ({ ...d, eventType: e.target.value }))}
                      className="w-full h-10 px-3 rounded-md bg-secondary border border-border/40 focus:border-gold/50 text-sm text-foreground outline-none"
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Concert">Concert</option>
                      <option value="Private Party">Private Party</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Venue (optional)</Label>
                    <Input placeholder="Venue name or city" value={details.venue}
                      onChange={e => setDetails(d => ({ ...d, venue: e.target.value }))}
                      className="bg-secondary border-border/40 focus:border-gold/50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Event From Date</Label>
                    <Input type="date" value={details.fromDate}
                      onChange={e => setDetails(d => ({ ...d, fromDate: e.target.value, toDate: d.toDate < e.target.value ? e.target.value : d.toDate }))}
                      className="bg-secondary border-border/40 focus:border-gold/50 [color-scheme:dark]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Event To Date</Label>
                    <Input type="date" value={details.toDate}
                      min={details.fromDate}
                      onChange={e => setDetails(d => ({ ...d, toDate: e.target.value }))}
                      className={`bg-secondary border-border/40 focus:border-gold/50 [color-scheme:dark] ${details.toDate < details.fromDate ? 'border-red-500/60' : ''}`} />
                    {details.toDate < details.fromDate && (
                      <p className="text-xs text-red-400">End date cannot be before start date</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 p-4 bg-secondary/50 rounded-lg border border-border/30">
                  <div><p className="text-xs text-muted-foreground mb-1">Date</p><p className="text-sm font-medium">{todayDisplay()}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">Quote No.</p><p className="text-sm text-gold-light font-medium">{quoteNo}</p></div>
                  <div><p className="text-xs text-muted-foreground mb-1">Valid Until</p><p className="text-sm font-medium">{validUntil}</p></div>
                </div>
                <Button className="w-full bg-gold hover:bg-gold-light text-black font-semibold"
                  disabled={
                    details.clientName.length < 3 ||
                    details.contactNumber.replace(/\D/g, '').length < 10 ||
                    !details.eventType ||
                    details.toDate < details.fromDate
                  }
                  onClick={() => setStep('preview')}>
                  Preview Quotation
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button onClick={() => setStep('form')} className="text-sm text-gold-light hover:text-gold underline">← Edit Details</button>
                  <Button onClick={handleDownload} disabled={downloading} className="bg-gold hover:bg-gold-light text-black font-semibold gap-2">
                    {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {downloading ? 'Generating...' : 'Download PDF'}
                  </Button>
                </div>
                {/* Scale preview to fit modal width on all screen sizes */}
                <div ref={containerRef} className="w-full overflow-hidden flex justify-center">
                  <div style={{
                    width: '794px',
                    flexShrink: 0,
                    transformOrigin: 'top center',
                    transform: `scale(${previewScale})`,
                    marginBottom: `${(previewScale - 1) * 1123}px`,
                  }}>
                    <PQ ref={previewRef} details={details} items={items} total={total} discount={discount}
                      quoteNo={quoteNo} validUntil={validUntil} dateRange={dateRange} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
