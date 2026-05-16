import { useState, useTransition } from "react";
import Home from "./Home";
import Posts from "./Posts";
import Contact from "./Contact";

const UseTransition = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "posts":
        return <Posts />;
      case "contact":
        return <Contact />;

      default:
        return <Home />;
    }
  };

  const handleTabChange = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div className="tabs flex flex-col m-4 p-4 border-2 rounded-2xl items-center ">
      <div className="self-center flex gap-3">
        <button
          className="border-2 p-4 hover:bg-amber-200 cursor-pointer"
          // onClick={() => setActiveTab("home")}
          onClick={() => handleTabChange("home")}
        >
          Home
        </button>
        <button
          className="border-2 p-4 hover:bg-amber-200 cursor-pointer"
          // onClick={() => setActiveTab("posts")}
          onClick={() => handleTabChange("posts")}
        >
          Posts
        </button>
        <button
          className="border-2 p-4 hover:bg-amber-200 cursor-pointer"
          // onClick={() => setActiveTab("contact")}
          onClick={() => handleTabChange("contact")}
        >
          Contact
        </button>
      </div>

      <div className="content self-center mt-4 bg-amber-500 p-8 min-w-full  text-center ">
        {isPending ? <p className="m-4">Loadinggg...</p> : renderContent()}
      </div>
    </div>
  );
};

export default UseTransition;

// As you can see, the browser will freeze or the UI will freeze when changing to the Posts tab and you wouldn't be able to switch tab mid-way after clicking the Posts if you used it without the useTransition

// 1. The Core Concept: Urgent vs Non-Urgent Updates
// By default, every single state change in React is treated as Urgent.
// React drops everything it's doing to calculate the new UI immediately.

// useTransition changes this by allowing you to split your state updates into two categories:

// -> Urgent Updates: Direct physical interactions like typing in an input, dragging a slider, or clicking a tab button to show active visual styling.
// -> Transition Updates (Non-Urgent): Heavy operations like fetching API data, filtering large datasets, or rendering 100,000 text elements

// ---

// 2. How startTransition Prevents UI Freezing
// When you wrap your state changeer like this:
// startTransition(() => {
//   setActiveTab(tab);
// });
// React flags this render pass as lower priority. Behind the scenes, React starts rendering the massive list of posts in an invisible, memory-bound "parallel lane" without touching the actual screen DOM yet.

// Because it's running in a lower-priority background lane, the main browser thread stays alive! If the user clicks "Posts", realizes it's taking too long, and instantly clicks "Contact", React notices the urgent interaction, abandons the heavy background render mid-flight, and jumps straight to rendering the Contact page. The app never stutters.

// ---

// 3. Understanding isPending
// The hook returns an array where the first destructured value is a boolean (isPending). React automatically manages this flag:
// -> It flips to true the exact moment startTransition begins working on the heavy background rendering.
// -> It remains true until the final DOM nodes are safely painted.
// -> This lets you conditionally render a loading fallback or an opacity layer gracefull right inside the component structure.

// ---

// 4. What React 19 Changed (Asynchronous Support)
// Historically, useTransition could only handle synchronous code block. React 19 fundamentally upgraded this hook to seamlessly accept asynchronoous functions inside the transtion scope.

// This allows you to tie async network data-fetching and massive client-side data mutations directions to your UI layout triggers:
// const handleTabChange = (tab: string) => {
// ? React 19 handles async actions out of the box!
//   startTransition(async () => {
//     await saveUserPreferences(tab); // ? Async API Call
//     setActiveTab(tab); //?  Local state transition
//   });
// };
