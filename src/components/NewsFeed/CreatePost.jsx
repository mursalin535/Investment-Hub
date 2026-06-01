    import React, { useState, useRef } from 'react';
    import { useDispatch } from 'react-redux';
    import { Card, CardBody, Avatar, Button, Textarea, Divider } from "@heroui/react";
    import { Image as ImageIcon, Send, X, ChevronRight } from 'lucide-react';
    import { createPost } from '../../redux/slices/postSlice';

    const CreatePost = () => {
        const dispatch = useDispatch();
        const [caption, setCaption] = useState('');
        const [image, setImage] = useState(null);
        const [preview, setPreview] = useState(null);
        const fileInputRef = useRef(null);

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

            const formData = new FormData();
            formData.append('caption', caption);
            if (image) formData.append('photo', image); 
            formData.append('type', 'general');

            dispatch(createPost(formData));
            setCaption('');
            removeImage();
        };

        return (
            <Card className="rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white overflow-visible">
                <CardBody className="p-8 md:p-10 flex flex-col gap-6">
                    <div className="flex gap-6 items-start">
                        <Avatar 
                            src="/user_mehedi.webp" 
                            size="lg" 
                            isBordered 
                            className="flex-shrink-0 border-2 border-slate-100 p-0.5"
                        />
                        <Textarea
                            variant="flat"
                            placeholder="Share a market update or project update..."
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
                            isDisabled={!caption.trim() && !image}
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
