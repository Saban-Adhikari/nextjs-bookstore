export const RegisterApi = async (Name, Email, Password, Profile) => {
  try {
    const response = await fetch(
      `https://bookappserver-1749.onrender.com/api/appuser`,
      {
        method: "POST",
        body: JSON.stringify({
          FLAG: "I",
          Name: Name,
          Email: Email,
          Password: Password,
          Profile: Profile,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
