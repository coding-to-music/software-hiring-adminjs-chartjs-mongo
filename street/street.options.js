const { Street } = require("./street.model");
const { hiringMenu } = require("../common/navigation");

const StreetResourceOptions = {
  resource: Street,
  options: {
    navigation: hiringMenu,
    properties: {
      _id: {
        isVisible: false,
      },
    },
  },
};

// const StreetResourceOptions = {
//   resource: Street,
//   options: {
//     navigation: hiringMenu,
//     properties: {
//       _id: {
//         isVisible: {
//           list: false,
//           edit: false,
//           filter: false,
//           show: false,
//         },
//       },
//       name: {
//         isVisible: {
//           isTitle: true,
//           list: true,
//           edit: true,
//           filter: true,
//           show: true,
//         },
//       },
//       fromStreet: {
//         isVisible: {
//           list: true,
//           edit: true,
//           filter: true,
//           show: true,
//         },
//       },
//       to: {
//         isVisible: {
//           list: true,
//           edit: true,
//           filter: true,
//           show: true,
//         },
//       },
//       width: {
//         isVisible: {
//           list: true,
//           edit: true,
//           filter: true,
//           show: true,
//         },
//       },
//       streetLength: {
//         isVisible: {
//           list: true,
//           edit: true,
//           filter: true,
//           show: true,
//         },
//       },
//       area: {
//         isVisible: {
//           list: true,
//           edit: false,
//           filter: true,
//           show: true,
//         },
//       },
//       streetDate: {
//         isVisible: {
//           list: true,
//           edit: true,
//           filter: true,
//           show: true,
//         },
//       },
//       noncity: {
//         isVisible: {
//           list: true,
//           edit: true,
//           filter: true,
//           show: true,
//         },
//       },
//       unnacceptedlength: {
//         isVisible: {
//           list: true,
//           edit: true,
//           filter: true,
//           show: true,
//         },
//       },
//     },
//   },
// };

module.exports = {
  StreetResourceOptions,
};
