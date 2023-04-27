export const accountNavigations = [
  {
    name: "My Account",
    type: "dropDown",
    icon: "i-Administrator",
    sub: [
      {
        name: "Profile",
        path: "/account/profile",
        type: "link",
      },
      {
        name: "Addresses",
        path: "/account/addresses",
        type: "link",
      },
      {
        name: "Change Password",
        path: "/account/change-password",
        type: "link",
      },
    ],
  },
  {
    name: "My Bids",
    icon: "i-Newspaper",
    path: "/account/my-bids",
    type: "link",
  },
];

export default accountNavigations;
