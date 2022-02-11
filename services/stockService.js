const dev = process.env.NODE_ENV !== "production";

const server = dev
  ? "http://localhost:3000"
  : "https://gahapon-packer.netlify.app";

const baseUrl = server + "/api/";

class stockService {
  getAll() {
    return fetch(baseUrl + "inventory");
  }

  //   create(newReview) {
  //     return fetch(baseUrl, {
  //       method: "POST",
  //       body: JSON.stringify(newReview),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   }
}

export default new stockService();
