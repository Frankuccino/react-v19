import { useFormStatus } from "react-dom";

const FormButton = () => {
  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <button
      type="submit"
      disabled={pending}
      className={`p-2 border-2 border-black rounded 
     text-white px-4 py-2 mt-3 
     ${pending ? "bg-blue-200" : "bg-blue-700"}
     `}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

export default FormButton;
// 1.  Context Rules of the useFormStatus (why it needs a separate component)
// The useFormStatus acts like exactly like a context consumer. It searches up the component tree to find the nearest parent <form> element that has a React 19 action or formAction attached to it.

// if you call useFormStatus inside the same component where the <form> tag was written, it returns pending: false because it cannot look "sideways" or "down" into its own JSX.

// By pulling FormButton out into a child component, it can look up, find the <form> in UseFormStatus, and intercept the status

// ----

// 2. It returns more than just pending
// While pending is used 90% of the time, the hook actually returns an object containing four properties that give you full visibility into what was submitted.
// const { pending, data, method, action } = useFormStatus();

// -> pending (boolean): true if the parent form is actively submitting an action; otherwise false.

// -> data (FormData | null): This is incredibly powerful. It contains the actual FormData object currently being processed. You can use this to build Optimistic UIs (e.g., showing the user's name immediately in a list before the server database has even finished updating)

// -> method (string): Either "get" or "post"

// -> action (function): A direct reference to the function passed to the parent form's action prop.

// ----

// 3. It works with HTML elements, NOT just custom buttons.
// You can use useFormStatus inside ANY CHILD COMPONENT under the <form>, not just buttons. For example, you can use it to disable input fields or change styleing across the entire form while submission is active
// (I tried it inside the parent component, it doesn't work so it's true, it should be used only to the child component as rule #1 says)

// ----
// 4. It only intercepts Asynchronous Actions
// The hook relies entirely on the lifecycle of the function passed to your form
// -> If your formAction is synchronous function, pending will flash so fast you won't even see it.

// -> It only stays true as long as an asynchronous operation(like await new Promise or a native fetch call) is unresolved.

// ---
// The React 19 Alternative: useActionState
// Because creating separate components just to get a loading state can feel tedious, React 19 introduced a companion hook called useActionState(previously called useFormState)

// If you don't want to split your button into a separate component, you can use useActionState directly in the parent component to get a isPending flag.

// ---

// Summary Checklist
// 1. Use useFormStatus when you have deep nested components (like a complex submit layout ) that need to know form states without prop drilling
// 2. Make sure the hook consumer is always a child element rendered inside the <form>
// 3. Leverage useActionState instead if you want to keep simple loading sates localized to a single component file.
