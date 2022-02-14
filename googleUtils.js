export const initAuth = (buttonEl, handleCredentialResponse) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  //   return window.gapi.auth2.init({
  //     client_id: CLIENT_ID,
  //     scope: "https://www.googleapis.com/auth/spreadsheets",
  //   });
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse,
    scope: "https://www.googleapis.com/auth/spreadsheets",
  });
  google.accounts.id.renderButton(
    /** @type{!HTMLElement} */
    document.getElementById("gsi-sign-in"),
    /** @type{!GsiButtonConfiguration} */ {
      type: "standard",
    }
  );
  google.accounts.id.prompt();
};

// export const checkSignedIn = () => {
//   return new Promise((resolve, reject) => {
//     initAuth();
//     //   .then(() => {
//     //     //const auth = window.gapi.auth2.getAuthInstance();
//     //     //resolve(auth.isSignedIn.get());
//     //   })
//     //   .catch((error) => {
//     //     reject(error);
//     //   });
//   });
// };

const onSuccess = (googleUser) => {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error) => {
  console.error(error);
};

export const renderButton = () => {
  window.gapi.auth2.render("signin-button", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
};

export const signOut = () => {
  window.gapi.auth2.getAuthInstance().signOut();
};
