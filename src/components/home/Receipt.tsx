// The hero's one memorable element: a payment receipt that "prints" out of a terminal slot
// and lists what a merchant gets, ending on the line business owners care about: the fees.
// Every line comes from content already on the site (What's Included, FAQ, hero copy).

const lines: { label: string; value: string }[] = [
  { label: 'All major credit cards', value: 'INCL.' },
  { label: 'Apple Pay & Google Pay', value: 'INCL.' },
  { label: 'Terminal & equipment', value: 'FREE' },
  { label: 'Next-day funding', value: 'INCL.' },
  { label: 'Fraud & chargeback protection', value: 'INCL.' },
  { label: 'PCI compliance assistance', value: 'INCL.' },
  { label: '24/7 customer support', value: 'INCL.' },
];

function Rule({ heavy = false }: { heavy?: boolean }) {
  return <div aria-hidden="true" className={heavy ? 'my-4 border-t-2 border-dashed border-ink' : 'my-4 border-t border-dashed border-ink/40'} />;
}

export default function Receipt() {
  return (
    <div className="relative mx-auto w-full max-w-[23rem]">
      {/* Terminal slot the receipt feeds out of */}
      <div
        aria-hidden="true"
        className="relative z-10 h-6 rounded-full bg-navy-950 shadow-[inset_0_3px_8px_rgba(0,0,0,0.7)] ring-1 ring-white/15"
      />
      <div className="-mt-3 overflow-hidden px-3 pb-10">
        <div className="receipt-shadow">
          <figure className="receipt-paper animate-receipt-print bg-white px-6 pb-10 pt-8 font-mono text-[0.8rem] leading-relaxed text-ink">
            <figcaption className="text-center">
              <span className="block text-[0.95rem] font-semibold tracking-[0.2em]">ZUMMIT PAYMENTS</span>
              <span className="mt-1 block text-ink/70">Merchant &amp; payment processing</span>
            </figcaption>

            <Rule />

            <dl className="space-y-1.5">
              {lines.map((line) => (
                <div key={line.label} className="flex items-baseline gap-2">
                  <dt>{line.label}</dt>
                  <span aria-hidden="true" className="flex-1 translate-y-[-0.2em] border-b border-dotted border-ink/30" />
                  <dd className="font-semibold">{line.value}</dd>
                </div>
              ))}
            </dl>

            <Rule heavy />

            <div className="flex items-baseline justify-between gap-3">
              <span className="font-semibold">PROCESSING FEES</span>
              <span className="relative inline-block px-2 text-xl font-semibold">
                <span aria-hidden="true" className="animate-marker absolute inset-0 rounded-[3px] bg-gold-400" />
                <span className="relative">FROM 0%</span>
              </span>
            </div>
            <p className="mt-1 text-right text-ink/70">for qualifying merchants</p>

            <Rule />

            <p className="text-center font-semibold">NO HIDDEN FEES</p>
            <p className="text-center text-ink/70">What you see is what you pay.</p>

            <div aria-hidden="true" className="receipt-barcode mx-auto mt-6 h-10 w-48" />
          </figure>
        </div>
      </div>
    </div>
  );
}
