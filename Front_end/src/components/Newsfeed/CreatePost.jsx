import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Avatar, Button, Textarea, Divider } from "@heroui/react";
import { Image as ImageIcon, X, ChevronRight, Globe, Lock, Users } from 'lucide-react';
import { createPost } from '../../redux/slices/postSlice';
import { getUser } from '../../store/CookieSlice';
import { group_server_your_group } from '../../server/Group_server';

const CreatePost = ({ groupId = null, onPostCreated }) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [visibility, setVisibility] = useState(groupId ? 'private' : 'public');
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(groupId || '');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user.role === 'investor' && !groupId) {
            group_server_your_group(user.id)
                .then((data) => { if (data?.success) setGroups(data.data || []); })
                .catch(console.log);
        }
    }, [user.id, user.role, groupId]);

    useEffect(() => {
        if (groupId) {
            setVisibility('private');
            setSelectedGroup(groupId);
        }
    }, [groupId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async () => {
        if (!caption.trim() && !image) return;
        if (visibility === 'private' && !selectedGroup) return;

        const formData = new FormData();
        formData.append('caption', caption);
        if (image) formData.append('photo', image);
        formData.append('visibility', visibility);
        if (visibility === 'private' && selectedGroup) {
            formData.append('group_id', selectedGroup);
        }
        if (user.role === 'investor') formData.append('investor_id', user.id);
        if (user.role === 'businessman') formData.append('businessman_id', user.id);

        dispatch(createPost(formData));
        setCaption('');
        removeImage();
        if (onPostCreated) onPostCreated();
    };

    return (
        <Card className="rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white overflow-visible">
            <CardBody className="p-8 md:p-10 flex flex-col gap-6">
                <div className="flex gap-6 items-start">
                    <Avatar
                        src={user.photo_url ? `http://localhost:5009/uploads/${user.photo_url}` : "/user_mehedi.webp"}
                        size="lg"
                        isBordered
                        className="flex-shrink-0 border-2 border-slate-100 p-0.5"
                    />
                    <Textarea
                        variant="flat"
                        placeholder={visibility === 'private' ? 'Share something with your group...' : 'Share a market update or project update...'}
                        value={caption}
                        onValueChange={setCaption}
                        className="flex-1"
                        minRows={1}
                        classNames={{
                            input: "text-lg md:text-xl font-light text-slate-800 placeholder:text-slate-300 leading-relaxed",
                            inputWrapper: "bg-transparent hover:bg-transparent shadow-none p-0"
                        }}
                    />
                </div>

                {/* Visibility Toggle */}
                {!groupId && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => { setVisibility('public'); setSelectedGroup(''); }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2
                                ${visibility === 'public'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'}`}
                        >
                            <Globe size={14} /> Public
                        </button>
                        <button
                            onClick={() => setVisibility('private')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2
                                ${visibility === 'private'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'}`}
                        >
                            <Lock size={14} /> Group Only
                        </button>
                    </div>
                )}

                {/* Group Selector */}
                {visibility === 'private' && !groupId && (
                    <div className="flex items-center gap-3">
                        <Users size={16} className="text-blue-500 flex-shrink-0" />
                        <select
                            value={selectedGroup}
                            onChange={e => setSelectedGroup(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition-all"
                        >
                            <option value="">Select a group...</option>
                            {groups.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {groupId && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
                        <Lock size={12} className="text-blue-500" />
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Posting to group</span>
                    </div>
                )}

                {preview && (
                    <div className="relative rounded-[1.8rem] overflow-hidden border border-slate-100 shadow-xl mt-4">
                        <img src={preview} alt="Preview" className="w-full max-h-[400px] object-cover" />
                        <Button
                            isIconOnly size="sm" variant="solid" color="danger"
                            className="absolute top-4 right-4 rounded-full shadow-2xl bg-red-500"
                            onPress={removeImage}
                        >
                            <X size={18} />
                        </Button>
                    </div>
                )}

                <Divider className="opacity-50" />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <Button
                        size="md" variant="light"
                        radius="full"
                        startContent={<ImageIcon size={20} className="text-green-700" />}
                        onPress={() => fileInputRef.current?.click()}
                        className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400 hover:bg-slate-50 px-6 h-12"
                    >
                        Attach Asset
                    </Button>
                    <input
                        type="file" ref={fileInputRef}
                        onChange={handleImageChange} accept="image/*"
                        className="hidden"
                    />

                    <Button
                        size="lg"
                        color="success"
                        radius="full"
                        endContent={<ChevronRight size={20} />}
                        onPress={handleSubmit}
                        isDisabled={(!caption.trim() && !image) || (visibility === 'private' && !selectedGroup)}
                        className="w-full sm:w-auto font-black uppercase tracking-[0.2em] text-xs h-14 px-10 bg-slate-950 hover:bg-green-700 text-white shadow-xl transition-all"
                    >
                        Publish Update
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default CreatePost;
