import styles from './App.css';
import Network from './components/Network.js';
import profile from './assets/profile.jpg';

const socialLinks = [
    {
        label: 'Substack',
        href: 'https://matthewbbone.substack.com/',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 4h14v2.2H5z" />
                <path d="M5 8.7h14v2.2H5z" />
                <path d="M5 13.4h14v6.8l-7-3.8-7 3.8z" />
            </svg>
        ),
    },
    {
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=of203AkAAAAJ&hl=en&oi=sra',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 2.8 8l9.2 5 9.2-5z" />
                <path d="M6.4 11.2v4.1c0 2.4 2.4 4.2 5.6 4.2s5.6-1.8 5.6-4.2v-4.1L12 14.3z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/matthew-bone-05a73a160/',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 7.5a2.35 2.35 0 1 1 0-4.7 2.35 2.35 0 0 1 0 4.7z" />
                <path d="M3.25 9.2h3.45V21H3.25z" />
                <path d="M9.2 9.2h3.3v1.6h.05c.46-.87 1.58-1.78 3.25-1.78 3.48 0 4.12 2.29 4.12 5.27V21h-3.44v-5.95c0-1.42-.03-3.24-1.98-3.24-1.98 0-2.28 1.54-2.28 3.13V21H9.2z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: 'https://github.com/matthewbbone',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.72c-2.78.6-3.37-1.18-3.37-1.18-.45-1.14-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.88 1.51 2.31 1.07 2.88.82.09-.64.35-1.07.63-1.32-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 7.2c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.57.69.48A10 10 0 0 0 12 2.2z" />
            </svg>
        ),
    },
];

const methodologicalHighlights = [
    'Online job vacancies',
    'LLM measurement',
    'Algorithmic audits',
    'Labor markets',
];

const publishedArticles = [
    {
        title: 'Skills or degree? The rise of skill-based hiring for AI and green jobs',
        collaborators: 'with Eugenia González Ehlinger and Fabian Stephany',
        status: 'Published in Technological Forecasting and Social Change, 2025',
        summary: 'Using around eleven million UK online job vacancies from 2018 to mid-2024, this paper studies skill-based hiring for AI and green jobs. It shows that demand for AI and green skills is rising, AI roles are becoming less tied to degree requirements, and AI skills command large wage premiums relative to formal credentials.',
    },
    {
        title: 'Optimism, debt accumulation, and business growth',
        collaborators: 'with Sung Soo Lim',
        status: 'Published in Journal of Behavioral and Experimental Economics, 2022',
        summary: 'Using Indonesian Family Life Survey data from 2007 and 2014, this paper studies how optimism shapes debt accumulation and household business growth. It finds that optimism is positively associated with debt growth in farm business households, where borrowing can raise expectations without sufficient profit growth, while optimistic nonfarm household heads are more likely to leverage debt toward income-generating activity.',
    },
];

const workingPapers = [
    {
        title: 'Beyond pay: AI skills reward more job benefits',
        collaborators: 'with Alejandra Castaneda Mira and Fabian Stephany',
        status: 'Working paper',
        summary: 'Using roughly ten million U.S. online job vacancies from 2018 to 2024, this paper asks whether demand for AI skills is rewarded through non-monetary benefits as well as wages. It finds that AI roles are more likely to offer perks such as parental leave, workplace culture benefits, health and well-being support, and remote work, with high-paying AI roles often bundling salary premiums and expanded benefits together.',
    },
    {
        title: 'Measuring Generosity in Collective Bargaining Agreements with LLMs',
        collaborators: 'with Prashant Garg, Chenxi Li, and Zachary Parolin',
        status: 'Working paper',
        summary: 'This project develops a pipeline for turning archival collective bargaining agreements into structured measures of worker protections. It uses OCR, provision classification, summarization, and ELO-style LLM comparisons to score contract generosity across categories such as compensation, healthcare, leave, safety, and dispute resolution, moving beyond a simple union/non-union indicator.',
    },
    {
        title: 'Monocultural Biases: Correlated biases in large language models lead to unequal systemic exclusion rates in hiring',
        collaborators: 'with Fabian Stephany and Maria del Rio-Chanona',
        status: 'Working paper',
        summary: 'This paper studies the systemic risks of using large language models in hiring. It audits ten base and post-trained model families with realistic vacancy-applicant prompts, finding that post-training can improve models\' use of human-capital signals while also making decisions more correlated, increasing systemic exclusion and introducing a consistent penalty against older applicants.',
    },
];

export const App = () => {
    return (
        <div className={styles.App}>
            <Network className={styles.network} />
            <main className={styles.pageShell}>
                <nav className={styles.topBar} aria-label="Primary">
                    <a className={styles.brand} href="#top">Matthew B. Bone</a>
                    <div className={styles.navLinks}>
                        <a href="#work">Work</a>
                        <a href="#connect">Connect</a>
                    </div>
                </nav>

                <section className={styles.hero} id="top">
                    <div className={styles.heroCopy}>
                        <p className={styles.eyebrow}>2nd-year DPhil at the Oxford Internet Institute</p>
                        <h1>Technology, Labor, and Policy Design</h1>
                        <p className={styles.lede}>
                            I research how we can an equitably transition to a future of work shaped by AI and other emerging technologies.
                        </p>
                        <div className={styles.ctaRow}>
                            <a href="https://matthewbbone.substack.com/" target="_blank" rel="noreferrer">
                                Read my writing
                            </a>
                            <a href="https://bone-public.s3.amazonaws.com/BoneCurriculumVitae.pdf" target="_blank" rel="noreferrer">
                                View CV
                            </a>
                        </div>
                    </div>

                    <aside className={styles.portraitBlock} aria-label="Profile summary">
                        <img src={profile} className={styles.profile} alt="Matthew B. Bone" />
                        <div className={styles.profileText}>
                            <p className={styles.profileName}>Matthew B. Bone</p>
                            <div className={styles.profileGroup}>
                                <p className={styles.profileLabel}>Affiliations</p>
                                <p>Oxford Internet Institute</p>
                                <p>Institute for New Economic Thinking</p>
                                <p>Burning Glass Institute</p>
                            </div>
                            <div className={styles.profileGroup}>
                                <p className={styles.profileLabel}>Funding</p>
                                <p>Grand Union DTP</p>
                                <p>Dieter Schwarz Foundation</p>
                            </div>
                        </div>
                    </aside>
                </section>

                <section className={styles.contentGrid} id="work" aria-label="Research overview">
                    <article className={styles.storySection}>
                        <p className={styles.sectionLabel}>Current work</p>
                        <h2>Recent papers on technology, work, and institutions.</h2>
                        <ul className={styles.methodsList} aria-label="Methodological highlights">
                            {methodologicalHighlights.map((method) => (
                                <li key={method}>{method}</li>
                            ))}
                        </ul>
                        <div className={styles.paperGroups}>
                            <section className={styles.paperGroup} aria-labelledby="working-papers">
                                <h3 id="working-papers">Working Papers</h3>
                                {workingPapers.map((paper) => (
                                    <details className={styles.paperDisclosure} key={paper.title}>
                                        <summary className={styles.paperTab}>
                                            <span className={styles.paperTabText}>
                                                <strong className={styles.paperTitle}>{paper.title}</strong>
                                                <span className={styles.paperMeta}>{paper.collaborators}</span>
                                            </span>
                                            <span className={styles.paperArrow} aria-hidden="true" />
                                        </summary>
                                        <div className={styles.paperDetails}>
                                            <p className={styles.paperStatus}>{paper.status}</p>
                                            <p>{paper.summary}</p>
                                        </div>
                                    </details>
                                ))}
                            </section>

                            <section className={styles.paperGroup} aria-labelledby="published-articles">
                                <h3 id="published-articles">Published Articles</h3>
                                {publishedArticles.map((paper) => (
                                    <details className={styles.paperDisclosure} key={paper.title}>
                                        <summary className={styles.paperTab}>
                                            <span className={styles.paperTabText}>
                                                <strong className={styles.paperTitle}>{paper.title}</strong>
                                                <span className={styles.paperMeta}>{paper.collaborators}</span>
                                            </span>
                                            <span className={styles.paperArrow} aria-hidden="true" />
                                        </summary>
                                        <div className={styles.paperDetails}>
                                            <p className={styles.paperStatus}>{paper.status}</p>
                                            <p>{paper.summary}</p>
                                        </div>
                                    </details>
                                ))}
                            </section>
                        </div>
                    </article>
                </section>

                <footer className={styles.siteFooter} id="connect">
                    <div className={styles.footerContact}>
                        <span>Matthew B. Bone</span>
                        <a href="mailto:matthew.bone@oii.ox.ac.uk">matthew.bone@oii.ox.ac.uk</a>
                    </div>
                    <div className={styles.socialLinks} aria-label="Social links">
                        {socialLinks.map((link) => (
                            <a
                                className={styles.socialLink}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                                title={link.label}
                                key={link.label}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </footer>
            </main>
        </div>
    )
}
