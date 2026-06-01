import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts, selectLoading, selectError } from '../../redux/slices/postSlice';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { Spinner } from "@heroui/react";
import { motion } from 'framer-motion';

const Newsfeed = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <section className="w-full min-h-screen bg-[#F9FAFB] py-24 px-6 md:px-10 relative overflow-hidden">
            
            {/* Background Design Patterns - Left Side Depth */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-1/3 h-full opacity-[0.03]" 
                     style={{ backgroundImage: 'linear-gradient(#15803d 1px, transparent 1px), linear-gradient(90deg, #15803d 1px, transparent 1px)', backgroundSize: '80px 80px' }} 
                />
                <svg className="absolute top-0 left-0 w-1/2 h-full opacity-10" preserveAspectRatio="none">
                    <motion.path
                        d="M0,800 Q150,750 300,600 T600,400"
                        fill="none"
                        stroke="#15803d"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M0,850 Q200,800 400,650 T800,450"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
                    />
                </svg>
                <div className="absolute top-[20%] left-[5%] w-64 h-64 bg-green-500/5 rounded-full blur-[100px]" />
                <div className="absolute top-[60%] left-[2%] w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                
                {/* Section Header - Matching Top_companies.jsx style */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-12 h-[2px] bg-green-700"></div>
                        <span className="text-green-700 font-black uppercase tracking-[0.4em] text-[10px]">
                            Economic Intelligence
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight heading"
                    >
                        Marketplace <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 italic font-serif">
                            Insights
                        </span>
                    </motion.h2>
                </div>

                {/* Create Post Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <CreatePost />
                </motion.div>

                {/* Posts Feed Section */}
                <div className="flex flex-col gap-10 mt-20">
                    {loading && posts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Spinner size="lg" color="success" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing Network</p>
                        </div>
                    ) : error ? (
                        <div className="p-10 bg-white rounded-[2.5rem] border border-slate-200 text-center shadow-sm">
                            <p className="text-slate-900 font-black heading text-xl mb-4">Connection Terminated</p>
                            <button 
                                onClick={() => dispatch(fetchPosts())}
                                className="px-8 py-3 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all"
                            >
                                Reconnect
                            </button>
                        </div>
                    ) : (
                        posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <PostCard post={post} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Newsfeed;
