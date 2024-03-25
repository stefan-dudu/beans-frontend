export const LogoutFn = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}api/v1/users/logout`,
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
