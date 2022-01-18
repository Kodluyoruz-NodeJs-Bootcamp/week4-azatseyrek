const form = document.querySelector("form");
const emailErrors = document.querySelector(".email.error");
const passwordErrors = document.querySelector(".password.error");
const nameErrors = document.querySelector(".name.error");
const surnameErrors = document.querySelector(".surname.error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //reset errors
  emailErrors.textContent = "";
  passwordErrors.textContent = "";

  // get the values
  const email = form.email.value;
  const password = form.password.value;
  const name = form.name.value;
  const surname = form.surname.value;

  try {
    const res = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        surname: surname,
      }),
      // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailErrors.textContent = data.errors.email;
      passwordErrors.textContent = data.errors.password;
    }
    if (data.user) {
      // The Location.assign method causes the window to load and display the document at the URL specified. After the navigation occurs, the user can navigate back to the page that called Location.assign by pressing the "back" button.
      location.assign("/programmers"); // redirect to programmers page
    }
  } catch (err) {
    console.log(err);
  }
});
