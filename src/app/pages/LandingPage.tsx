import { motion } from "motion/react";
import { ArrowRight, Star, Briefcase, Heart, Award, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Banner from "../../assets/Dark1.jpeg";
import GoldenImage from "../../assets/goldenImage.jpg";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-accent-foreground">
            {/* --- BANNER SECTION --- */}
            <section className="relative w-full bg-black">
                <img
                    src={Banner}
                    alt="Premium Gifting Banner"
                    className="w-full h-auto md:h-[50vh] lg:h-[60vh] md:object-cover"
                />
                {/* 1. Base Darkening */}
                <div className="absolute inset-0 bg-black/40" />

                {/* 2. Top and Bottom Gradients */}
                <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent" />
            </section>

            {/* --- INTRODUCTION SECTION --- */}
            <section className="relative py-16 md:py-24 bg-black text-center overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-5xl sm:text-7xl md:text-9xl mb-4 font-script text-accent py-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        >
                            Nishyash
                        </motion.h1>

                        <motion.div
                            className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8"
                        >
                            <div className="h-[1px] w-8 sm:w-16 bg-accent/40" />
                            <span className="text-accent tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-sm font-light uppercase">
                                Soulful Creations & Bespoke Excellence
                            </span>
                            <div className="h-[1px] w-8 sm:w-16 bg-accent/40" />
                        </motion.div>

                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light px-4"
                        >
                            Where craftsmanship meets emotion. We curate the extraordinary for those who appreciate the finer things in life.
                        </motion.p>

                        <motion.div>
                            <Link to="/home">
                                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl rounded-full transition-all duration-500 hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)] group">
                                    Begin the Journey <ArrowRight className="ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="mt-16 md:mt-20 flex flex-col items-center gap-2 opacity-60">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-accent">Scroll to Discover</span>
                    <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-accent to-transparent" />
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section className="py-32 relative overflow-hidden bg-black">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-accent tracking-widest uppercase text-sm mb-4">Our Essence</h2>
                            <h3 className="text-4xl md:text-6xl font-light mb-8 leading-tight">
                                Crafting Moments into <span className="text-accent italic font-script capitalize text-5xl md:text-7xl">Memories</span>
                            </h3>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                At Nishyash, we believe a gift is more than just an object—it's a story, a connection, and a testament to a relationship. Born from a passion for exquisite design and soulful creation, we've dedicated ourselves to the art of premium gifting.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <h4 className="text-accent text-2xl font-script tracking-wide">Exclusivity</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-tighter max-w-[150px]">Hand-picked collections you won't find elsewhere.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-accent text-2xl font-script tracking-wide">Emotion</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-tighter max-w-[150px]">Personalized touches that speak directly to the heart.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl group-hover:bg-accent/30 transition-all duration-700" />
                            <img
                                src={GoldenImage}
                                alt="Luxury Craftsmanship"
                                className="relative rounded-2xl shadow-2xl border border-white/10 grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section className="py-32 bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-light mb-4"
                        >
                            Two Worlds, One <span className="text-accent italic font-script capitalize">Excellence</span>
                        </motion.h2>
                        <p className="text-gray-500 tracking-[0.2em] uppercase text-xs">Tailored for Every Need</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Corporate */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group p-12 bg-black border border-white/5 hover:border-accent/40 rounded-3xl transition-all duration-500"
                        >
                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent/20 transition-colors">
                                <Briefcase className="text-accent" size={32} />
                            </div>
                            <h3 className="text-3xl mb-6 font-light">Corporate Gifting</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Elevate your brand presence with sophisticated employee kits, conference gifts, and client appreciations that reflect your professional standard.
                            </p>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-center gap-3"><CheckCircle size={14} className="text-accent/60" /> Bulk Order Discounts</li>
                                <li className="flex items-center gap-3"><CheckCircle size={14} className="text-accent/60" /> Custom Company Branding</li>
                                <li className="flex items-center gap-3"><CheckCircle size={14} className="text-accent/60" /> Direct-to-Recipient Delivery</li>
                            </ul>
                        </motion.div>

                        {/* Personal */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group p-12 bg-black border border-white/5 hover:border-accent/40 rounded-3xl transition-all duration-500"
                        >
                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent/20 transition-colors">
                                <Heart className="text-accent" size={32} />
                            </div>
                            <h3 className="text-3xl mb-6 font-light">Personalised Creations</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Celebrate life's milestone with unique, custom-engraved gifts and curated hampers that tell your loved ones exactly how much they mean to you.
                            </p>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-center gap-3"><CheckCircle size={14} className="text-accent/60" /> Individual Customization</li>
                                <li className="flex items-center gap-3"><CheckCircle size={14} className="text-accent/60" /> Gift Wrap & Messaging</li>
                                <li className="flex items-center gap-3"><CheckCircle size={14} className="text-accent/60" /> Ready-to-Gift Packaging</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES GRID --- */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Award, title: "Curated Luxury", desc: "Every piece is vetted for quality and aesthetic appeal." },
                            { icon: Shield, title: "Premium Guarantee", desc: "Secure shipping and quality-approved products only." },
                            { icon: Star, title: "Bespoke Service", desc: "Dedicated support for all your custom requirements." },
                            { icon: ArrowRight, title: "Seamless Flow", desc: "Easy selection, fast customization, on-time arrival." }
                        ].map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
                                <div className="mb-6 mx-auto w-12 h-12 flex items-center justify-center text-accent/40 group-hover:text-accent transition-colors">
                                    <f.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-lg mb-3 font-medium">{f.title}</h4>
                                <p className="text-sm text-amber-200/80  px-4 py-2 rounded-lg leading-relaxed font-light inline-block">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl mb-8 font-light tracking-tight">
                            Ready to Craft Your <br />
                            <span className="text-accent italic font-script capitalize">Masterpiece?</span>
                        </h2>
                        <Link to="/home">
                            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-16 py-8 text-2xl rounded-full transition-all duration-500 hover:scale-105 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                                Enter the Studio
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-20 border-t border-white/5 bg-black">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <div className="text-3xl font-script text-accent mb-8">Nishyash</div>
                    <div className="flex gap-8 mb-12 text-xs tracking-widest uppercase text-gray-500">
                        <Link to="/home" className="hover:text-accent transition-colors">Store</Link>
                        <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                    </div>
                    <p className="text-gray-700 text-[10px] tracking-[0.4em] uppercase text-center">
                        © 2026 Nishyash Corporation. Bespoke Excellence & Soulful Creations.
                    </p>
                </div>
            </footer>
        </div>
    );
}
