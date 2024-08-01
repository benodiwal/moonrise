import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { ChangeEvent, useState } from "react";
import { useToast } from "./ui/use-toast";
import AxiosClient from "@/state/http";
import { useNavigate } from "react-router-dom";

const FilePicker = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
                setError(null);
            } else {
                setSelectedFile(null);
                setPreviewUrl(null);
                setError('Please select a valid image file');
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) {
            toast({
                title: "Please choose a valid image"
            });
            return;
        }

        const formData = new FormData();
        formData.append('picture', selectedFile);

        try {
            const res = await AxiosClient.post('/user/upload', formData);
            if (res.status === 200) {
                navigate("/dashboard");
            }
        } catch (e: unknown) {
            console.error(e);
        }
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Upload Thumbnail</Label>
                    <Input id="picture" type="file" onChange={handleFileChange}/>
                </div>
                {error && (
                    <div className="mt-2 text-red-600">
                        {error}
                    </div>
                )}
                {previewUrl && (
                    <div className="mt-4">
                        <img src={previewUrl} alt="Selected thumbnail preview" className="w-full max-w-sm" />
                    </div>
                )}
                <Button type="submit" className="mt-4">Submit</Button>
            </form>
        </div>
    );
};

export default FilePicker;  
