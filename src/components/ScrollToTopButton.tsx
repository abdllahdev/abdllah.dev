export default function ScrollToTopButton() {
  function handleOnClick() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <button
      onClick={handleOnClick}
      className="text-xs font-bold uppercase no-underline hover:text-neutral-400 dark:hover:text-white"
    >
      Back to top
    </button>
  );
}
