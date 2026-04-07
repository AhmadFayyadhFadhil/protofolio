const CERTS = [
  { title: 'Pelatihan AI Elevate',           issuer: 'Elevate AI Academy',      date: 'Sep 2025',  dur: '5.5s',  delay: '0s'   },
  { title: 'Semifinalis Business Plan',      issuer: 'ITS Surabaya',            date: 'Oct 2024',  dur: '6.5s',  delay: '.4s'  },
  { title: 'Semifinalis Business Plan',      issuer: 'Universitas Indonesia',   date: 'May 2025',  dur: '5s',    delay: '.8s'  },
  { title: 'OWASP Web Security',             issuer: 'Universitas Narotama',    date: 'Sep 2024',  dur: '7s',    delay: '.2s'  },
  { title: 'Pelatihan Cyber Security',       issuer: 'PT Telkom Indonesia',     date: 'Des 2024',  dur: '6s',    delay: '.6s'  },
  { title: 'Trial Class Sistem Informasi',   issuer: 'Telkom University',       date: 'May 2023',  dur: '5.8s',  delay: '1s'   },
  { title: 'Participan UI/UX Competition',   issuer: 'Universitas Airlangga',   date: 'Oct 2025',  dur: '6.3s',  delay: '.3s'  },
  { title: 'Top 3 Project Inkubasi',         issuer: 'SMK Telkom Sidoarjo',     date: 'Jul 2025',  dur: '5.2s',  delay: '.7s'  },
  { title: 'Uji Cek Fakta Digital',          issuer: 'Mafindo',                 date: 'Sep 2023',  dur: '6.8s',  delay: '.5s'  },
];

export default function Certificates() {
  return (
    <section id="certs" className="section-wrap reveal">
      <div className="sec-header">
        <span className="sec-num">04 //</span>
        <span className="sec-title">Certificates</span>
        <div className="sec-line" />
      </div>

      <div className="certs-grid">
        {CERTS.map((c, i) => (
          <div
            key={i}
            className="cert-card"
            style={{ animation: `floatY ${c.dur} ease-in-out ${c.delay} infinite` }}
          >
            <div className="cert-title">{c.title}</div>
            <div className="cert-issuer">{c.issuer}</div>
            <div className="cert-date">{c.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}