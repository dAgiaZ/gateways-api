import app from "./app"

const PORT = 3000
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
})

module.exports = app //for testing