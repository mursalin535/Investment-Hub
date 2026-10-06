import React from 'react'
import PostCard from '../NewsFeed/PostCard'

const MyInsights = ({ myPosts }) => {
    return (
        <section>
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-emerald-500" />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">My Insights</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {myPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            
            <button className="w-full mt-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white hover:border-emerald-200 hover:text-emerald-600 transition-all">
                Load More Insights
            </button>
        </section>
    )
}

export default MyInsights
