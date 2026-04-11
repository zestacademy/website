import { Award, CheckCircle, Download, ExternalLink, ShieldCheck } from "lucide-react"

export default function MockCertificatePage({ params }: { params: { certificateId: string } }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black py-16 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-full dark:bg-emerald-900/30 dark:text-emerald-400 mb-2">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-4xl font-bold dark:text-slate-100">Certificate of Completion</h1>
                    <p className="text-lg text-ink/60 dark:text-slate-400 max-w-xl mx-auto">
                        This is a simulated certificate generation page. When configured, this dynamic route will fetch and display verifiable PDF credentials based on the ID below.
                    </p>
                </div>

                {/* The Mock Certificate "Canvas" */}
                <div className="relative overflow-hidden rounded-2xl border-8 border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-12 text-center shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-emerald-400 to-sky-500" />
                    
                    <div className="max-w-2xl mx-auto space-y-10 py-10">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-ink/40 dark:text-slate-500">Zest Academy</p>
                            <h2 className="mt-8 text-5xl font-black text-ink dark:text-white" style={{ fontFamily: "serif" }}>
                                Official Certificate
                            </h2>
                        </div>

                        <div className="space-y-3">
                            <p className="text-ink/60 dark:text-slate-400">This certifies that the user has successfully completed:</p>
                            <p className="text-2xl font-semibold text-primary dark:text-sky-400">Mock Course Subject</p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-t border-slate-100 dark:border-gray-800 pt-10 text-sm">
                            <div className="space-y-1">
                                <p className="text-ink/40 dark:text-slate-500">Issuing Date</p>
                                <p className="font-semibold dark:text-slate-200">{new Date().toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-ink/40 dark:text-slate-500">Verification ID</p>
                                <p className="font-mono font-semibold dark:text-slate-200 truncate">{params.certificateId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Watermark Logo */}
                    <Award size={200} className="absolute -bottom-10 -right-10 text-slate-50 dark:text-gray-900/50 -rotate-12" />
                </div>

                {/* Developer Simulation Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <button className="btn-primary w-full sm:w-auto opacity-50 cursor-not-allowed">
                        <Download size={16} className="mr-2" /> Download PDF (Mock)
                    </button>
                    <a href="/my-learning" className="btn-secondary w-full sm:w-auto">
                        Return to Dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}
