const notFoundMIddleware = (req, res) => {
  res.status(404).json({ msg: "Can not find page" });
};

export default notFoundMIddleware;
