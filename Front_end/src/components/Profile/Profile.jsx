import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { slugify } from '../../lib/slugify'
import { selectUserById } from '../../redux/slices/userSlice'

// Sub-components
import ProfileHero from './ProfileHero'
import ProfileInfo from './ProfileInfo'
import JoinedGroups from './JoinedGroups'
import InvestmentPortfolio from './InvestmentPortfolio'


export default function Profile() {
    const navigate = useNavigate()
    const { userId } = useParams()
    
    // Get logged-in user info from cookieSlice
    const cookieUser = useSelector(state => state.cookie.user.userInfo)
    
    // Get user from userSlice if userId is provided
    const reduxUser = useSelector(state => selectUserById(state, userId))

    // Determine which user to display
    // If no userId in params, or if userId matches logged-in user, use cookieUser
    const isOwnProfile = !userId || (cookieUser && String(cookieUser.id) === String(userId))
    const rawUser = isOwnProfile ? cookieUser : reduxUser

    // Normalize user object to bridge differences between DB and Mock data
    const user = rawUser ? {
        ...rawUser,
        id: rawUser.id,
        name: rawUser.name,
        email: rawUser.email,
        // Map photo_url from DB to avatar, and prepend server URL if it's from DB
        // Also handle potential path prefixes like 'uploads\' or 'uploads/' and strip them
        avatar: rawUser.avatar || (rawUser.photo_url ? `http://localhost:5009/uploads/${rawUser.photo_url.split(/[\\\/]/).pop()}` : null),
        // Normalize role (businessman/entrepreneur -> entrepreneur)
        role: (rawUser.role === 'businessman' || rawUser.role === 'entrepreneur') ? 'entrepreneur' : 'investor',
        location: rawUser.location || 'Dhaka, Bangladesh',
        bio: rawUser.bio || 'Professional on Investment Hub, looking for growth opportunities.',
        joinedDate: rawUser.joinedDate || 'Recent',
        phone: rawUser.phone || 'Not provided',
        stats: rawUser.stats || {
            investments: rawUser.total_investment || 0,
            following: 0,
            insights: 0
        }
    } : null

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h2 className="text-2xl font-black text-slate-800 heading mb-4">User Not Found</h2>
                <button 
                    onClick={() => navigate('/newsfeed/feed')}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs"
                >
                    Back to Feed
                </button>
            </div>
        )
    }

    // Mock data mapped based on role
    const isOwner = user.role === 'entrepreneur'

    const joinedGroups = [
        { id: 1, name: "Dhaka Tech Investors", members: "24", returns: "18.2%", image: "/grp_tech.webp" },
        { id: 2, name: "Agro Growth Fund", members: "18", returns: "12.5%", image: "/grp_agro.webp" },
        { id: 3, name: "Real Estate Circle", members: "32", returns: "9.8%", image: "/grp_realestate.webp" },
    ]

    const investments = isOwner ? [] : [
        { id: 1, company: "GreenHarvest Ltd", amount: "৳45,000", date: "Jan 12, 2026", status: "Active", image: "/co_greenhouse.webp", yield: "+12.4%" },
        { id: 2, company: "SoftTech Solutions", amount: "৳30,000", date: "Dec 05, 2025", status: "Completed", image: "/co_softtech.webp", yield: "+15.2%" },
        { id: 3, company: "BuildRight Construction", amount: "৳50,000", date: "Oct 20, 2025", status: "Active", image: "/co_buildright.webp", yield: "+9.8%" },
    ]

    const handleGroupClick = (groupName) => {
        navigate(`/newsfeed/groups/${slugify(groupName)}`)
    }

    const handleCompanyClick = (companyName) => {
        navigate(`/newsfeed/companies/${slugify(companyName)}`)
    }

    const myPosts = [
        {
            id: 101,
            author: user.name,
            avatar: user.avatar,
            time: "2h ago",
            content: isOwner 
                ? "Looking for strategic partners for our next expansion phase. We've seen 40% growth this quarter alone!"
                : "Just received my first quarterly payout from GreenHouse Agro! The transparency on this platform is unmatched.",
            image: isOwner ? "/post_revenue_chart.webp" : "/post_pl_report.webp",
            likes: 24,
            comments: 5,
            type: isOwner ? "revenue" : "profit",
            origin: "individual"
        }
    ]

    return (
        <div className="min-h-screen bg-white pb-20 overflow-hidden">
            
            <ProfileHero user={user} isOwnProfile={isOwnProfile} />

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
                
                <ProfileInfo user={user} />

                {isOwner ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                            <h3 className="text-2xl font-black heading mb-6">Business Stats</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Total Valuation</p>
                                    <p className="text-3xl font-black heading text-emerald-400">৳2.4Cr</p>
                                </div>
                                <div className="h-[1px] bg-white/10" />
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Market Reach</p>
                                    <p className="text-3xl font-black heading">15 Districts</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100">
                             <h3 className="text-2xl font-black heading text-slate-900 mb-6">Active Rounds</h3>
                             <p className="text-slate-500 mb-8">Currently seeking seed funding for southern expansion.</p>
                             <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                                View Pitch Deck
                             </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <JoinedGroups 
                            joinedGroups={joinedGroups} 
                            handleGroupClick={handleGroupClick} 
                        />

                        <InvestmentPortfolio 
                            investments={investments} 
                            handleCompanyClick={handleCompanyClick} 
                        />
                    </>
                )}

               

            </div>
        </div>
    )
}
