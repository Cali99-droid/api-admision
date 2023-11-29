import axios from "axios";

const sendMessageFromSecretary = async (number, body,token) => {


  const data = { number, body };
  var options = {
    method: "POST",
    url: `https://api.solware-pyme.com/api/messages/send`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("mensaje enviado correctamente");
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default sendMessageFromSecretary;
