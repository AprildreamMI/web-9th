const data = [
  {
    title: "web全栈"
  },
  {
    title: 'java架构师'
  }
]

export default {
   'get /api/goods': (req, res) => {
     setTimeout(() => {
       res.json({result: data})
     }, 1500)
   }
}