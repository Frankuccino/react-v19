import { use } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Card = () => {
  // const context = useContext(ThemeContext);
  const context = use(ThemeContext);
  // You can see how we used the use() Hook instead of the useContext() Hook,

  if (!context) throw new Error("Card must be used within a ThemeProvider");
  const { theme, toggleTheme } = context;

  return (
    <div
      className={`w-[20rem] p-8 m-8 ${theme === "light" ? "bg-white" : "bg-teal-900"} rounded-2xl border-2 border-teal-400`}
    >
      <h1
        className={`text-teal-300 ${theme === "light" ? "text-black" : "text-cyan-200"}`}
      >
        Theme Card
      </h1>

      <p className={`${theme === "light" ? "text-black" : "text-white"}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nemo
        molestiae veritatis, maiores, dignissimos reiciendis, voluptate ut eum
        placeat in aut neque labore dicta! Culpa provident placeat est expedita.
        Tenetur, quas amet ex numquam impedit delectus quia accusantium aliquam
        vel!
      </p>

      <button
        className="bg-teal-300 p-2 rounded-full text-white mt-8"
        onClick={toggleTheme}
      >
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};

export default Card;
