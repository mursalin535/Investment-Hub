import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Divider } from "@heroui/react";
import { ThumbsUp, MessageSquare, Share2, MoreVertical, Globe, Lock, Users } from 'lucide-react';
import { likePost } from '../../redux/slices/postSlice';
import { motion } from 'framer-motion';

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const [localLikes, setLocalLikes] = useState(post.likes || 0);
    const [hasLiked, setHasLiked] = useState(false);

    const handleLike = () => {
        if (!hasLiked) {
            setLocalLikes(prev => prev + 1);
            setHasLiked(true);
            dispatch(likePost(post.id));
        }
    };

    const content = post.caption || post.content || "Report details not available.";
    const photoUrl = post.photo_url || post.image;
    const image = photoUrl ? (String(photoUrl).startsWith('http') ? photoUrl : `http://localhost:5009/uploads/${photoUrl}`) : null;

    const avatar = post.author_photo || "/user_mehedi.webp";
    const authorAvatar = (typeof avatar === 'string' && (avatar.startsWith('http') || avatar.startsWith('/')))
        ? avatar
        : `http://localhost:5009/uploads/${avatar}`;

    const isPrivate = post.visibility === 'private';

    return (
        <Card className="rounded-[2.5rem] border border-slate-100 shadow-sm bg-white overflow-hidden group hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
            <CardHeader className="justify-between px-8 md:px-10 pt-10 pb-6">
                <div className="flex gap-4 items-center">
                    <div className="relative">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={authorAvatar}
                            className="border-2 border-slate-50 p-0.5 shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <h4 className="text-lg font-black text-slate-900 heading tracking-tight leading-none mb-1">
                            {post.author || "Global Partner"}
                        </h4>
                        <div className="flex items-center gap-2">
                            {isPrivate ? (
                                <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-blue-100 text-blue-700">
                                    <Lock size={9} /> Group Post
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-green-100 text-green-700">
                                    <Globe size={9} /> Public
                                </span>
                            )}
                            {isPrivate && post.group_name && (
                                <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-slate-100 text-slate-500">
                                    <Users size={9} /> {post.group_name}
                                </span>
                            )}
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                • Recently
                            </span>
                        </div>
                    </div>
                </div>
                <Button isIconOnly size="sm" variant="light" className="text-slate-300">
                    <MoreVertical size={20} />
                </Button>
            </CardHeader>

            <CardBody className="px-8 md:px-10 py-4">
                <p className="text-xl text-slate-600 font-light leading-relaxed pl-6 border-l-2 border-green-700/20 group-hover:border-green-700 transition-colors duration-500">
                    {content}
                </p>
                {image && (
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="rounded-[2rem] overflow-hidden border border-slate-100 mt-8 shadow-inner bg-slate-50"
                    >
                        <img src={image} alt="Post" className="w-full h-auto max-h-[500px] object-cover" />
                    </motion.div>
                )}
            </CardBody>

            <Divider className="opacity-30 mt-6" />

            <CardFooter className="px-8 md:px-10 py-6 justify-between items-center bg-slate-50/30">
                <div className="flex gap-4">
                    <Button
                        size="md"
                        variant={hasLiked ? "solid" : "light"}
                        radius="full"
                        onPress={handleLike}
                        className={`font-black uppercase tracking-[0.2em] text-[10px] h-12 px-6 ${hasLiked ? 'bg-green-700 text-white' : 'text-slate-500'}`}
                        startContent={<ThumbsUp size={18} className={hasLiked ? "fill-white" : ""} />}
                    >
                        {localLikes}
                    </Button>
                    <Button
                        size="md" variant="light" radius="full"
                        className="font-black uppercase tracking-[0.2em] text-[10px] h-12 px-6 text-slate-400"
                        startContent={<MessageSquare size={18} />}
                    >
                        Insights
                    </Button>
                </div>
                <Button
                    size="md" variant="light" radius="full" isIconOnly
                    className="text-slate-300 hover:text-slate-900 h-12 w-12"
                >
                    <Share2 size={20} />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PostCard;
