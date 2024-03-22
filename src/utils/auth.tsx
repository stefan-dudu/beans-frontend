export const LogoutFn = async () => {
  try {
    const response = await fetch(
      ` https://beans-be.vercel.app/api/v1/users/logout`,
      // `http://127.0.0.1:5001/api/v1/users/logout`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    if (data.status === "success") window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
