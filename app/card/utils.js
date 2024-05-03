export const fetchGenreData = async () => {
  try {
    const response = await fetch("https://htdrnl.cyclic.app/api/genre", {
      method: "POST",
      body: JSON.stringify({
        FLAG: "S",
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error getting data: ", error);
  }
};
