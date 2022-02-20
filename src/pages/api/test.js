export default function (req, res) {
  return res.json({
    url: req.url,
    message: 'this is a test!',
  });
}
