import MixerPagesFolders from "./_components/folders";
import MixerPages from "./_components/pages";

export default function MixerPagesContainer() {
    return (
        <div className="flex w-full h-full">
            <div className=" w-[500px] h-full p-2">
                <MixerPagesFolders />
            </div>
            <div className=" flex flex-grow h-full">
                <MixerPages />
            </div>
        </div>
    )
}