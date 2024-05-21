export function CallbackGoogle() {
  const params = new URLSearchParams(window.location.search);
  console.log(params.get('code'));

  return (
    <main className="grid place-items-center h-full">
      <h1 className="animate-pulse text-2xl">Loading...</h1>
    </main>
  );
}
