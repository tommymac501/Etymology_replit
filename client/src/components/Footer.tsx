export default function Footer() {
  return (
    <footer className="mt-16 text-center text-dark-gray text-sm pb-8">
      <p>WordRoots — Explore the origins of words through engaging stories</p>
      <p className="mt-1">© {new Date().getFullYear()} WordRoots</p>
    </footer>
  );
}
