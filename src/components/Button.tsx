interface ButtonProps {
  text: string;
  tooltip: string;
  callback: () => void | null;
}

function Button(p: ButtonProps) {
  return (
    <div className="btn-container">
      <button className="btn" onClick={p.callback}>
        {p.text}
      </button>
      <span className="tooltip">{p.tooltip}</span>
    </div>
  );
}

export default Button;
