import GetNotes from "@/components/get-notes";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl h-full my-2">Shop</h2>
        <GetNotes />
      </main>
    </>
  );
}
