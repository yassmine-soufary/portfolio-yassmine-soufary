function FarmVisual({ instanceId }) {
    const flowId = `${instanceId}-farm-flow`
    return (
        <svg className="project-visual project-visual--farm" viewBox="0 0 560 420" role="img" aria-label="IoT smart farming pipeline from ESP32 sensors through Node.js and MongoDB to a React live dashboard">
            <defs>
                <linearGradient id={flowId} x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#f472b6" />
                    <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
                <filter id={`${flowId}-glow`}>
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            <ProjectGrid />
            <text x="34" y="48" fill="#d287ad" fontFamily="monospace" fontSize="9" letterSpacing="1.5">SMART FARMING // DATA PIPELINE</text>
            <text x="34" y="71" fill="#fed8eb" fontFamily="monospace" fontSize="13" letterSpacing=".7">REAL-TIME SENSOR FLOW</text>

            <g fill="none" stroke={`url(#${flowId})`} strokeWidth="2" strokeDasharray="5 7" opacity=".78">
                <path className="project-visual__flow-line" d="M148 203h22" />
                <path className="project-visual__flow-line" d="M278 203h22" />
                <path className="project-visual__flow-line" d="M408 203h22" />
            </g>
            <g fill="#ec4899" filter={`url(#${flowId}-glow)`}>
                <circle className="project-visual__data-packet" cx="150" cy="203" r="3" />
                <circle className="project-visual__data-packet project-visual__data-packet--delayed" cx="280" cy="203" r="3" />
                <circle className="project-visual__data-packet project-visual__data-packet--last" cx="410" cy="203" r="3" />
            </g>

            <PipelineNode x={34} label="ESP32" subtitle="SENSORS" number="01">
                <g fill="none" stroke="#fc8fc5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="76" y="153" width="30" height="30" rx="5" />
                    <path d="M82 148v5m9-5v5m9-5v5m-18 30v5m9-5v5m9-5v5m-20-30h-5m5 9h-5m5 9h-5m34-18h-5m5 9h-5m5 9h-5" />
                    <path d="M86 168h10m-5-5v10" />
                </g>
            </PipelineNode>
            <PipelineNode x={164} label="Node.js" subtitle="API" number="02">
                <g fill="none" stroke="#fc8fc5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M201 158l-8 9 8 9m20-18 8 9-8 9m-5-13-7 9" />
                    <circle cx="211" cy="167" r="21" strokeOpacity=".25" />
                </g>
            </PipelineNode>
            <PipelineNode x={294} label="MongoDB" subtitle="DATABASE" number="03">
                <g fill="none" stroke="#fc8fc5" strokeWidth="1.7">
                    <path d="M341 158c0-5 26-5 26 0v20c0 5-26 5-26 0z" />
                    <path d="M341 158c0 5 26 5 26 0m-26 7c0 5 26 5 26 0m-26 7c0 5 26 5 26 0" />
                </g>
            </PipelineNode>
            <PipelineNode x={424} label="React" subtitle="LIVE DASHBOARD" number="04">
                <g fill="none" stroke="#fc8fc5" strokeWidth="1.5">
                    <rect x="464" y="154" width="38" height="28" rx="4" />
                    <path d="M477 187h12m-6-5v5m-13-19h28" strokeLinecap="round" />
                    <ellipse cx="483" cy="168" rx="10" ry="4" transform="rotate(30 483 168)" />
                    <ellipse cx="483" cy="168" rx="10" ry="4" transform="rotate(-30 483 168)" />
                    <circle cx="483" cy="168" r="1.5" fill="#ec4899" />
                </g>
            </PipelineNode>

            <path d="M80 302h400" stroke="#5c2340" strokeWidth="1" />
            <g fill="#c36091" fontFamily="monospace" fontSize="8" letterSpacing=".6">
                <text x="72" y="324">TELEMETRY</text>
                <text x="207" y="324">INGESTION</text>
                <text x="335" y="324">PERSISTENCE</text>
                <text x="463" y="324">VISUALIZATION</text>
            </g>
            <g fill="#ec4899">
                {[80, 210, 340, 470].map(x => <circle key={x} cx={x} cy="344" r="2.5" />)}
            </g>
            <text x="34" y="384" fill="#c25e90" fontFamily="monospace" fontSize="8" letterSpacing="1">STREAM STATUS</text>
            <circle className="project-visual__pulse" cx="143" cy="381" r="4" fill="#ec4899" />
            <text x="154" y="384" fill="#fdabd4" fontFamily="monospace" fontSize="8">CONNECTED // LIVE</text>
        </svg>
    )
}

function PipelineNode({ x, label, subtitle, number, children }) {
    return (
        <g transform={`translate(${x} 0)`}>
            <rect x="0" y="113" width="114" height="174" rx="10" fill="#171717" stroke="#78244e" />
            <rect x="1" y="114" width="112" height="172" rx="9" fill="none" stroke="#ec4899" strokeOpacity=".12" />
            <text x="12" y="135" fill="#a13d6f" fontFamily="monospace" fontSize="8" letterSpacing="1">{number}</text>
            <circle cx="98" cy="130" r="3" fill="#ec4899" />
            {children}
            <text x="57" y="225" fill="#fee3f1" fontFamily="monospace" fontSize="12" textAnchor="middle" fontWeight="600">{label}</text>
            <text x="57" y="244" fill="#d1699d" fontFamily="monospace" fontSize="7" textAnchor="middle" letterSpacing=".8">{subtitle}</text>
            <path d="M17 263h80" stroke="#333333" />
            <circle cx="57" cy="275" r="2" fill="#f472b6" />
        </g>
    )
}

function StarSchemaVisual({ instanceId }) {
    const markerId = `${instanceId}-star-arrow`
    const dimensions = [
        { name: 'Clients', x: 28, y: 94 },
        { name: 'Hôtels', x: 226, y: 58 },
        { name: 'Chambres', x: 426, y: 94 },
        { name: 'Canaux', x: 63, y: 313 },
        { name: 'Temps', x: 376, y: 313 },
    ]

    return (
        <svg className="project-visual project-visual--star-schema" viewBox="0 0 560 420" role="img" aria-label="Neon star schema with the Faits Réservations table connected to Clients, Hôtels, Chambres, Canaux, Temps, and Power BI">
            <defs>
                <marker id={markerId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0 0l6 3-6 3" fill="none" stroke="#ec4899" strokeWidth="1.2" />
                </marker>
            </defs>
            <ProjectGrid />
            <text x="34" y="38" fill="#d287ad" fontFamily="monospace" fontSize="9" letterSpacing="1.4">DATA MODEL // HOTEL BOOKINGS</text>
            <text x="34" y="59" fill="#fed8eb" fontFamily="monospace" fontSize="12" letterSpacing=".6">SCHÉMA EN ÉTOILE</text>

            <g fill="none" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="5 6" opacity=".8">
                <path d="M116 123l90 57" />
                <path d="M278 106v55" />
                <path d="M426 123l-91 57" />
                <path d="M151 313l63-61" />
                <path d="M376 313l-50-61" />
            </g>
            <g fill="#ec4899">
                <circle className="project-visual__data-packet" cx="155" cy="148" r="3" />
                <circle className="project-visual__data-packet project-visual__data-packet--delayed" cx="278" cy="132" r="3" />
                <circle className="project-visual__data-packet project-visual__data-packet--last" cx="383" cy="149" r="3" />
                <circle className="project-visual__data-packet project-visual__data-packet--delayed" cx="183" cy="282" r="3" />
                <circle className="project-visual__data-packet" cx="350" cy="280" r="3" />
            </g>

            {dimensions.map((dimension, index) => (
                <DimensionNode key={dimension.name} {...dimension} number={`DIM 0${index + 1}`} />
            ))}

            <g filter="drop-shadow(0 0 8px rgba(236, 72, 153, .24))">
                <rect x="195" y="161" width="166" height="96" rx="10" fill="#1e1e1e" stroke="#ec4899" strokeWidth="1.7" />
                <rect x="200" y="166" width="156" height="86" rx="7" fill="none" stroke="#f472b6" strokeOpacity=".3" />
                <text x="278" y="183" fill="#ec4899" fontFamily="monospace" fontSize="8" textAnchor="middle" letterSpacing="1">TABLE DE FAITS</text>
                <text x="278" y="204" fill="#fee3f1" fontFamily="monospace" fontSize="12" textAnchor="middle" fontWeight="700">Faits Réservations</text>
                <path d="M214 214h128" stroke="#681d43" />
                <text x="278" y="234" fill="#f08ebf" fontFamily="monospace" fontSize="8" textAnchor="middle">CA · NUITS · RÉSERVATIONS</text>
                <circle className="project-visual__pulse" cx="346" cy="171" r="3" fill="#ec4899" />
            </g>

            <path className="project-visual__flow-line" d="M362 209h74" fill="none" stroke="#ec4899" strokeWidth="1.6" strokeDasharray="5 5" markerEnd={`url(#${markerId})`} />
            <circle className="project-visual__data-packet" cx="374" cy="209" r="3" fill="#ec4899" />
            <g>
                <rect x="440" y="185" width="98" height="48" rx="8" fill="#232323" stroke="#f472b6" strokeWidth="1.5" />
                <path d="M453 199h15l-5 5 5 5h-15" fill="none" stroke="#fc92c7" strokeWidth="1.5" strokeLinejoin="round" />
                <text x="495" y="214" fill="#fee3f1" fontFamily="monospace" fontSize="12" textAnchor="middle" fontWeight="700">Power BI</text>
                <text x="489" y="250" fill="#bc4d85" fontFamily="monospace" fontSize="7" textAnchor="middle" letterSpacing=".5">REPORTING</text>
            </g>
            <text x="34" y="388" fill="#c25e90" fontFamily="monospace" fontSize="8" letterSpacing="1">POSTGRESQL // STAR-SCHEMA MODEL</text>
            <circle className="project-visual__pulse" cx="520" cy="374" r="4" fill="#ec4899" />
        </svg>
    )
}

function DimensionNode({ x, y, name, number }) {
    return (
        <g filter="drop-shadow(0 0 5px rgba(236, 72, 153, .16))">
            <rect x={x} y={y} width="106" height="50" rx="7" fill="#191919" stroke="#f472b6" strokeOpacity=".85" />
            <circle cx={x + 13} cy={y + 15} r="3" fill="#ec4899" />
            <text x={x + 53} y={y + 22} fill="#fed3e9" fontFamily="monospace" fontSize="10" textAnchor="middle" fontWeight="600">{name}</text>
            <text x={x + 53} y={y + 38} fill="#bc4d85" fontFamily="monospace" fontSize="7" textAnchor="middle" letterSpacing=".8">{number}</text>
        </g>
    )
}

function AnalyticsVisual({ hotel = false }) {
    const line = hotel ? 'M117 263l47-34 44 12 50-68 48 22 46-64 53 20' : 'M117 270l48-15 45-52 48 24 46-77 48 20 48-62'
    const title = hotel ? 'HOSPITALITY // DATA WAREHOUSE' : 'STOCK AI // LIVE ANALYTICS'
    return (
        <svg className="project-visual project-visual--analytics" viewBox="0 0 560 420" role="img" aria-label={hotel ? 'Neon hotel analytics dashboard with revenue charts' : 'Neon inventory analytics dashboard with graphs and stock indicators'}>
            <defs>
                <linearGradient id="chartLine" x1="0" y1="1" x2="1" y2="0">
                    <stop stopColor="#f472b6" />
                    <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#ec4899" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#ec4899" stopOpacity="0" />
                </linearGradient>
                <filter id="chartGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            <ProjectGrid />
            <rect x="58" y="56" width="444" height="308" rx="14" fill="#151515" stroke="#78244e" />
            <path d="M58 94h444" stroke="#383838" />
            <circle cx="80" cy="75" r="4" fill="#ec4899" /><circle cx="94" cy="75" r="4" fill="#f472b6" /><circle cx="108" cy="75" r="4" fill="#8d3662" />
            <text x="126" y="79" fill="#f4b9d7" fontFamily="monospace" fontSize="9" letterSpacing="1">{title}</text>
            <g>
                {[0, 1, 2].map((item) => (
                    <g key={item}>
                        <rect x={82 + item * 132} y="111" width="116" height="54" rx="6" fill="#1e1e1e" stroke="#5c1c3c" />
                        <text x={92 + item * 132} y="127" fill="#b94780" fontFamily="monospace" fontSize="7">{['TOTAL VALUE', 'ACTIVE ITEMS', 'ALERT STATUS'][item]}</text>
                        <text x={92 + item * 132} y="151" fill="#fec9e3" fontFamily="monospace" fontSize="18">{hotel ? ['142K', '2,481', '+12.8%'][item] : ['84.2K', '1,284', '03 ALERTS'][item]}</text>
                        <circle cx={181 + item * 132} cy="145" r="3" fill={item === 2 ? '#ec4899' : '#f472b6'} />
                    </g>
                ))}
            </g>
            <rect x="82" y="181" width="264" height="145" rx="7" fill="#171717" stroke="#5c1c3c" />
            <text x="96" y="199" fill="#d084aa" fontFamily="monospace" fontSize="8">{hotel ? 'REVENUE / BOOKING TRENDS' : 'STOCK MOVEMENT / 30 DAYS'}</text>
            <g stroke="#303030" strokeWidth="1">
                <path d="M104 225h222M104 250h222M104 275h222M104 300h222" />
                <path d="M116 210v104M166 210v104M216 210v104M266 210v104M316 210v104" opacity=".55" />
            </g>
            <path d={`${line}v43H117z`} fill="url(#chartFill)" />
            <path d={line} fill="none" stroke="url(#chartLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#chartGlow)" />
            <circle className="project-visual__pulse" cx={hotel ? 403 : 435} cy={hotel ? 151 : 145} r="4" fill="#ec4899" />
            <rect x="361" y="181" width="117" height="145" rx="7" fill="#171717" stroke="#5c1c3c" />
            <text x="374" y="199" fill="#d084aa" fontFamily="monospace" fontSize="8">{hotel ? 'CHANNEL MIX' : 'STOCK LEVEL'}</text>
            <g>
                {[0, 1, 2, 3, 4].map((bar) => {
                    const height = (hotel ? [44, 67, 53, 89, 74] : [69, 48, 86, 59, 96])[bar]
                    return <rect key={bar} x={376 + bar * 18} y={306 - height} width="10" height={height} rx="2" fill={bar === 3 ? '#ec4899' : '#ad286b'} opacity={bar === 3 ? 0.95 : 0.72} />
                })}
            </g>
            <g fill="#fc7bbc" fontFamily="monospace" fontSize="7">
                <text x="82" y="345">DATA STREAM : ACTIVE</text>
                <text x="390" y="345">SYNC 00:00:04</text>
            </g>
            <circle className="project-visual__pulse" cx="471" cy="75" r="3" fill="#ec4899" />
        </svg>
    )
}

function CarVisual() {
    return (
        <svg className="project-visual project-visual--car" viewBox="0 0 560 420" role="img" aria-label="Neon autonomous car moving around a glowing circuit track">
            <defs>
                <linearGradient id="trackStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#ec4899" />
                    <stop offset="0.52" stopColor="#f472b6" />
                    <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
                <filter id="trackGlow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            <ProjectGrid />
            <ellipse cx="280" cy="214" rx="196" ry="127" fill="none" stroke="#2b2b2b" strokeWidth="27" />
            <ellipse cx="280" cy="214" rx="196" ry="127" fill="none" stroke="#721c47" strokeWidth="1.5" strokeDasharray="7 10" />
            <path id="nxpTrack" d="M108 214c0-53 73-96 172-96s172 43 172 96-73 96-172 96-172-43-172-96Z" fill="none" stroke="url(#trackStroke)" strokeWidth="2.5" filter="url(#trackGlow)" />
            <path d="M145 214c0-41 60-74 135-74s135 33 135 74-60 74-135 74-135-33-135-74Z" fill="none" stroke="#79254f" strokeWidth="1" strokeDasharray="3 7" />
            <g fill="#ec4899">
                <circle cx="108" cy="214" r="5" /><circle cx="452" cy="214" r="5" />
                <circle cx="280" cy="118" r="4" /><circle cx="280" cy="310" r="4" />
            </g>
            <g className="project-visual__car-runner">
                <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#nxpTrack" />
                </animateMotion>
                <g transform="translate(-19 -10)">
                    <path d="M2 12l4-7q2-3 6-3h15q4 0 7 4l4 6 3 2v8H0v-7z" fill="#202020" stroke="#ec4899" strokeWidth="1.7" />
                    <path d="M12 5h13q3 0 5 4H9z" fill="#b22d70" stroke="#fc85c1" strokeWidth="1" />
                    <circle cx="9" cy="21" r="3.5" fill="#131313" stroke="#fc82bf" strokeWidth="1.5" />
                    <circle cx="32" cy="21" r="3.5" fill="#131313" stroke="#fc82bf" strokeWidth="1.5" />
                    <path d="M0 14h-6m0 4h6" stroke="#ec4899" strokeWidth="1.5" />
                </g>
            </g>
            <g fill="#f795c6" fontFamily="monospace" fontSize="9" letterSpacing="1">
                <text x="34" y="40">NXP // AUTONOMOUS SYSTEM</text>
                <text x="37" y="370">LINE SCAN : TRACKING</text>
                <text x="398" y="370">PID // STABLE</text>
            </g>
            <g fill="none" stroke="#ec4899" strokeWidth="1">
                <path d="M84 95h48l16 16m328-16h-48l-16 16M84 333h48l16-16m328 16h-48l-16-16" opacity=".45" />
            </g>
            <circle className="project-visual__pulse" cx="280" cy="214" r="8" fill="none" stroke="#ec4899" strokeOpacity=".7" />
        </svg>
    )
}

function ProjectGrid() {
    return (
        <g aria-hidden="true">
            <path d="M0 70h560M0 140h560M0 210h560M0 280h560M0 350h560M70 0v420M140 0v420M210 0v420M280 0v420M350 0v420M420 0v420M490 0v420" stroke="#303030" strokeWidth=".6" opacity=".36" />
            <circle cx="280" cy="210" r="160" fill="none" stroke="#303030" strokeDasharray="2 8" opacity=".55" />
        </g>
    )
}

export default function ProjectVisual({ projectId, instanceId = 'project-visual' }) {
    if (projectId === 'vertical-farming') return <FarmVisual instanceId={instanceId} />
    if (projectId === 'stock-ai-manager') return <AnalyticsVisual />
    if (projectId === 'hotel-data-analysis') return <StarSchemaVisual instanceId={instanceId} />
    return <CarVisual />
}
