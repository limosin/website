import axios from "axios"

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const { url } = req.query
    const response = await axios.get(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    res.setHeader("Content-Type", "text/html")
    res.status(response.status).send(response.data)
  } else {
    res.setHeader("Allow", "GET")
    res.status(405).send("Method not allowed")
  }
}
