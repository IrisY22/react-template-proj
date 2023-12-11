const { useState } = React;

export function LongTxt({ txt }) {
  const [isLongTxtShown, setIsLongTxtShown] = useState(false);

  function onToggleLongTxt() {
    setIsLongTxtShown((prev) => !prev);
  }

  function getTxtToShow(isLongTxtShown, txt) {
    if (txt.length < 100) return txt;
    return isLongTxtShown ? txt : txt.substring(0, 100) + "...";
  }

  const txtToShow = getTxtToShow(isLongTxtShown, txt);
  return (
    <section className="longTxt">
      <p>{txtToShow}</p>
      {txt.length > 100 && (
        <button onClick={onToggleLongTxt}>
          {isLongTxtShown ? "Less..." : "More..."}
        </button>
      )}
    </section>
  );
}
