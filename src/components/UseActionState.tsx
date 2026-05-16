import { useActionState } from "react";

const UseActionState = () => {
  async function increment(prevState: number, formData: FormData) {
    console.log(formData.get);
    return prevState + 1;
  }

  const [state, formAction] = useActionState(increment, 0);

  return (
    <form className=" flex flex-col p-8 m-4 border-2 rounded-2xl gap-2.5">
      <h1 className="text-3xl">Form with useActionState</h1>
      <h1 className="text-3xl self-center">{state}</h1>
      <button className="bg-teal-300 p-2" formAction={formAction}>
        Increment
      </button>
      <br />
      <input
        type="text"
        placeholder="Enter your name"
        className="border-2 p-2 rounded-xl"
        name="name"
      />
    </form>
  );
};

export default UseActionState;
// 1. The Context Rules (No Separate Component Needed!)
// Unlike useFormStatus which acts as a Context consumer and must be placed in a child component, useActionState manages local state inside the same component where your form lives.
// -> it exposes an isPending boolean as its third destructed value.
// -> This means that you can manage loading states, disable inputs, and display error states completely inline without splitting your buttons or inputs into separate files.

// ---

// 2. The Unpackable Signature (it returns 3 values)
// The initialization line can actually destructure three items instead of just two:
// const [state, formAction, isPending] = useActionState(increment, 0);

// -> state: The current, read-only snapshot of your state. On the first render, it is your initial value (0). On subsequent updates, it is whatever your aciton function returns.

// -> formAction: A react-wrapped action dispatch function. You hook this directly into your <form action={formAction}> or <button formAction={formAction}>.

// -> isPending (boolean): React handles this automatically. It flips to true the millisecond the action triggers, and returns to false the moment you async function resolves.

// ---

// 3. The Functional Argument Requirements
// The function passed into useActionState (the increment function) has a highly specific method signature required by React. It always receives these two parameters in this exact order:

// async function increment(prevState: number, formData: FormData) { ... }

// 1. prevState: The value your state right before this submission loop started. You use this to track histories, append arrays, or increment numbers.

// 2. formData: The standard native browser FormData object containing the input payloads from the DOM at the exact moment the button was clicked.

// ---

// 4. It only updates State on a Function Return
// The sate in useActionState is strictly controlled by whatever value you action function finishes executing with
// -> If you forgetr to return a value, or if you function returns undefined, you state variable will become undefined on the next render.

// -> Because of this, it forces a clean, predictable state machine loop:
// [Current State] + [Form Inputs] -> [Process Function] -> [New State Returned]

// ---

// 5. Why use formAction on the Button vs action on the Form?
// In the code example above, we bypassed the <form action={...}> entirely and attached the dispatch handler straight to the button:

// <button formAction={formAction}>Increment</button>

// This leverages native HTML5 form behavior supported directly by React 19:

// -> Form-level (action): Best practice when a form has one unified job (like an onboarding sign-up sheet).

// -> Button-level (formAction): Best practice when a single form has multiple distinct execution targets.
// For instance, an editing interface could use a <button formAction={saveDraft}> and a separate <button formAction={publishPost}> sharing the exact same inputElements.
