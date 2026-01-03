const cors = async (req, res) => {
  if (req.method === "GET") {
    const { url } = req.query
    try {
      const response = await fetch(url as string, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0 (compatible; website-cors/1.0)",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.text()

      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Methods", "GET")
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
      res.setHeader("Content-Type", "text/html")
      res.status(200).send(data)
    } catch (error) {
      console.error("CORS proxy error:", error)
      res.status(500).json({ error: "Failed to fetch content" })
    }
  } else {
    res.setHeader("Allow", "GET")
    res.status(405).send("Method not allowed")
  }
}

export default cors
