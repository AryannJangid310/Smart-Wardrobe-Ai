import UploadZone from "@/components/UploadZone";

export default function UploadPage() {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Add to Wardrobe</h1>
                <p className="text-neutral-400">Upload a photo and let AI extract the details.</p>
            </div>
            <UploadZone />
        </div>
    );
}
