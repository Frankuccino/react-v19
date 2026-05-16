// interface UserPayload {
//   name: string;
//   email: string;
//   password: string;
// }

const Form = () => {
  const formAction = (formData: FormData) => {
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // const userData = Object.fromEntries(formData) as unknown as UserPayload;

    console.log(userData);
  };

  return (
    <form
      action={formAction}
      className="p-8 flex flex-col border-2 m-4 rounded-2xl"
    >
      <h1 className="text-3xl">Form using the FormData</h1>
      <br />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="border-2 border-black rounded"
      />

      <br />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="border-2 border-black rounded"
      />

      <br />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="border-2 border-black rounded"
      />

      <br />
      <button
        type="submit"
        className="p-2 border-2 border-black rounded 
        bg-black text-white px-4 py-2 mt-3
      "
      >
        Submit
      </button>
    </form>
  );
};

export default Form;

// Forms -> forms are just an asynchronous functions which are going to attach forwardForm
