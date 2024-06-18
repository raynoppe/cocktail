import MixerNavBar from "./_components/navBar";

export default function MixerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=" h-[calc(100%-60px)]">
            <div>
                <MixerNavBar />
            </div>
            <div className=" h-full">{children}</div>
        </div>
    );
}