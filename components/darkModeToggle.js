import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [toggled, setToggled] = useState(false);

  const changeToggle = (value) => {
    setToggled(value);
  };

  useEffect(() => {
    setToggled(localStorage.theme === "dark");
  }, []);

  useEffect(() => {
    if (toggled) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    const htmlDomNode = document.querySelector("html");

    if (localStorage.theme === "dark") {
      htmlDomNode.classList.add("dark");
      htmlDomNode.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      htmlDomNode.classList.remove("dark");
      htmlDomNode.style.backgroundColor = "rgb(249, 250, 251)";
    }
  }, [toggled]);

  return (
    <div className="flex items-center justify-center w-full mb-4">
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="hidden"
            onChange={(e) => changeToggle(e.target.checked)}
            checked={toggled}
          />
          <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">Mode sombre</div>
      </label>

      <style jsx>{`
        .toggle__dot {
          top: -0.25rem;
          left: -0.25rem;
          transition: all 0.3s ease-in-out;
        }

        input:checked ~ .toggle__dot {
          transform: translateX(100%);
          background-color: rgba(109, 59, 246, 1);
        }
      `}</style>
    </div>
  );
}
