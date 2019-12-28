export const job = (req,res) => {
  try {
    res.status(200).send('JOB');
  } catch (error) {
    res.status(500).send(error);
  }
}

export const jobs = (req,res) => {
  try {
    res.status(200).send('JOBS');
  } catch (error) {
    res.status(500).send(error);
  }
}