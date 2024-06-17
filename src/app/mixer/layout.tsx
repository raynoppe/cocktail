import MixerNavBar from "./_components/navBar";

export default function MixerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div>
                <MixerNavBar />
            </div>
            <div>{children}</div>
        </div>
    );
}