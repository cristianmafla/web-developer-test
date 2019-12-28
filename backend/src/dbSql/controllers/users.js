import db from '../models';

export const user = (req,res) => {
  try {
    res.status(200).send('USER');
  } catch (error) {
    res.status(500).send(error);
  }
}

export const users = async (req,res) => {
  try {
    const totalUsers = await db.Table.findAll({});
    res.status(200).send(totalUsers);
  } catch (error) {
    res.status(500).send(error);
  }
}