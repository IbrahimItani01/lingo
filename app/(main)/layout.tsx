type Props = {
    children: React.ReactNode;
}
const MainLayout = ({children}:Props)=>{
    return(
        <>
        <main className="pl-[256px] bg-red-500 h-full">
            {children}
        </main>
        </>
    );
}
export default MainLayout