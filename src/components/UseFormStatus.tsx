import FormButton from "./FormButton";

const UseFormStatus = () => {
  const formAction = async (formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newPost = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    console.log(newPost);
  };

  return (
    <form
      action={formAction}
      className="p-8 flex flex-col border-2 m-4 rounded-2xl"
    >
      <h1 className="text-3xl">Form using the useFormStatus</h1>
      <br />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="border-2 border-black rounded"
        required
      />

      <br />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="border-2 border-black rounded"
        required
      />

      <br />
      <FormButton />
    </form>
  );
};

export default UseFormStatus;

// useFormStatus -> a little bit weird because whenever we have to use that function we need to create a separate component or use that hook
